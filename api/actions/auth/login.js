import {User} from '../../database/models';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../../../config';

export default function login( req, res, next ) {
  return new Promise((resolve, reject) => {
    passport.authenticate( 'local', function authenticate(err, user, info){
      if(err)    return reject(err);
      if(!user) return reject(info);

      req.logIn(user, err => {
        if(err) { reject( err ); }
        else {
          const token = jwt.sign({ id: user.id }, config.auth.jwt.secret, {
            expiresIn: 60000
          });
          const userWithToken = Object.assign({}, user, {token});
          resolve(user);
        }
      })

    })(req, res, next);
  });
}
