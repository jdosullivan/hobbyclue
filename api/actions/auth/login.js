import {User, comparePassword} from '../../database/models';
import jwt from 'jsonwebtoken';
import config from '../../../config';

export default function login(req) {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      if (!user) return reject({_error: 'Authentication failed. User not found.'});

      if (comparePassword(req.body.password, user.passwordHash)) {
        const token = jwt.sign({ email: user.email, password: user.password }, config.auth.jwt.secret, {
          expiresIn: 60000
        });
        const userLogged = Object.assign(user, {token});
        req.session.user = userLogged;
        resolve(userLogged);
      }
      else {
        reject({_error: `passwords do not match for user ${req.body.email}.`});
      }
    });
  });
}
