import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import sequelizeTables from './database/models';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User, UserClaim } from './database/models';

const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const io = new SocketIo(server);

io.path('/ws');

app.use(session({
  secret: config.auth.jwt.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}));
app.use(bodyParser.json());

// Authentication
passport.use(new FacebookStrategy({
    clientID: config.auth.facebook.id,
    clientSecret: config.auth.facebook.secret,
    callbackURL: 'http://localhost:3000/api/login/facebook/return',
    passReqToCallback : true,
    profileFields: ['id', 'emails', 'name', 'displayName', 'gender']
  },
  function(req, accessToken, refreshToken, profile, done) {
    const loginName = 'facebook';
    const claimType = 'urn:facebook:access_token';

    const findOrCreateFBUser = async () => {
      if (profile) {

        // Look up user by profile id
        let user = await User.findOne({
          where: { profileType: loginName, profileId: profile.id }
        });

        // Create a new user in the user table if not found
        if (!user) {
            user = await User.create({
            name: profile.displayName,
            email: profile._json.email,
            profileId: profile.id,
            profileType: loginName,
            gender: profile._json.gender,
            picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
            claims: [
              { type: claimType, value: profile.id }
            ]
          }, {
            include: [
              { model: UserClaim, as: 'claims' }
            ]
          });
        }

        // Return the user
        done(null, user);
      }
    };

    findOrCreateFBUser().catch(done);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(`fb success with user ${JSON.stringify(req.user)}`);
    res.redirect('http://localhost:3000');
  }
);


app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  sequelizeTables.sync({force: false}).catch(err => console.error(err.stack)).then(() => {
    const runnable = app.listen(config.apiPort, (err) => {
      if (err) {
        console.error(err);
      }
      console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
      console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
    });

    io.on('connection', (socket) => {
      socket.emit('news', {msg: `'Hello World!' from server`});

      socket.on('history', () => {
        for (let index = 0; index < bufferSize; index++) {
          const msgNo = (messageIndex + index) % bufferSize;
          const msg = messageBuffer[msgNo];
          if (msg) {
            socket.emit('msg', msg);
          }
        }
      });

      socket.on('msg', (data) => {
        data.id = messageIndex;
        messageBuffer[messageIndex % bufferSize] = data;
        messageIndex++;
        io.emit('msg', data);
      });
    });
    io.listen(runnable);
  });

} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
