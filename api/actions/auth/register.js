import {User} from '../../database/models';

export default function register(req) {
  return new Promise((resolve) => {
    const newUser = {
      name: 'J Sullivan',
      password: req.body.password,
      email: req.body.email
    };
    User.create(newUser).then(() => {
      console.log(`user ${newUser.email} registered successfully`);
      resolve(newUser)
    });
  });
}
