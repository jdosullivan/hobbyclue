import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as LocalStrategy} from 'passport-local';
import {User, UserClaim, comparePassword} from './database/models';
import jwt from 'jsonwebtoken';
import util from 'util';

const configure = (app, config) => {

  function addJWT(user){
    const token = jwt.sign({ email: user.email }, config.auth.jwt.secret, {
      expiresIn: 60000
    });
    return Object.assign({}, user.toJSON(), {token});
  }

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login/facebook', passport.authenticate('facebook'));

  app.get('/login/facebook/return',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('http://localhost:3000');
    }
  );

  // Authentication
  passport.use(new FacebookStrategy({
      clientID: config.auth.facebook.id,
      clientSecret: config.auth.facebook.secret,
      callbackURL: '/api/login/facebook/return',
      passReqToCallback: true,
      profileFields: ['id', 'emails', 'name', 'displayName', 'gender']
    },
    function (req, accessToken, refreshToken, profile, done) {
      const claimType = 'urn:facebook:access_token';

      const findOrCreateFBUser = async() => {
        if (profile) {
          // Look up user by profile id
          let user = await User.findOne({
            where: {profileType: profile.provider, profileId: profile.id}
          });

          // Create a new user in the user table if not found
          if (!user) {
            var newUser = {
              name: profile.displayName,
              email: profile.emails[0],
              profileId: profile.id,
              profileType: profile.provider,
              gender: profile.gender,
              picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
              claims: [
                {type: claimType, value: profile.id}
              ]
            };
            console.log(`New user based on FB profile is ${util.inspect(newUser)}`);
            user = await User.create(newUser, {
              include: [
                {model: UserClaim, as: 'claims'}
              ]
            });
          }

          // Return the user
          const userWithToken = addJWT(user);
          done(null, userWithToken);
        }
      };

      findOrCreateFBUser().catch(done);
    }
  ));

  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    function (username, password, done) {
      const findUser = async() => {
        // Look up user by email
        let user = await User.findOne({
          where: {email: username}
        });

        if (!user) return done(new Error('Authentication failed. User not found.'));

        if (comparePassword(password, user.passwordHash)) {
          done(null, addJWT(user));
        }
        else {
          done(new Error(`passwords do not match for user ${username}.`));
        }
      };

      findUser().catch(done);
    }
  ));

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};

export default configure;