import Sequelize from 'sequelize';
import Model from '../sequelize';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;
function hashPassword(password) {
  var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  var hash = bcrypt.hashSync(password || '', salt);
  return hash;
}


function comparePassword(password, hash) {
  console.log(`comparing ${password} to ${hash}`);
  return bcrypt.compareSync(password, hash); // true
}

const User = Model.define('users', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING(255),
    validate: {isEmail: true}
  },
  emailConfirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  picture: {
    type: Sequelize.STRING(255)
  },

  gender: {
    type: Sequelize.STRING(50)
  },

  location: {
    type: Sequelize.STRING(100)
  },

  profileId: {
    type: Sequelize.STRING(100)
  },
  profileType: {
    type: Sequelize.STRING(100)
  },
  website: {
    type: Sequelize.STRING(255)
  },
  passwordHash: Sequelize.STRING,
  password: {
    type: Sequelize.VIRTUAL,
    set: function (val) {
      this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
      const hash = hashPassword(val);
      this.setDataValue('passwordHash', hash);
    },
    validate: {
      /* isLongEnough: function (val) {
       if (val.length < 7) {
       throw new Error("Please choose a longer password")
       }
       }*/
    }
  }
}, {

  indexes: [
    {fields: ['email']}
  ]
}, {tableName: 'users'} );

export { comparePassword };
export default User;
