import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User, UserClaim } from './database/models';



const configureAuth = (app, config) => {

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
};

export default configureAuth;