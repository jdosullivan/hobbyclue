import {User} from '../../database/models';

export default function register(req) {
  return new Promise((resolve) => {
    const newUser = {
      name: 'Jahmai OSullivan',
      password: req.body.password,
      email: req.body.email
    };
    User.create(newUser).then(() => {
      console.log('user registered');
      resolve(newUser)
    });
  });
}
