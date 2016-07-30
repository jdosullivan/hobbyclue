import Sequelize from 'sequelize';
import Model from '../sequelize';

const User = Model.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },

  email: {
    type: Sequelize.STRING(255),
    validate: { isEmail: true }
  },

  emailConfirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {

  indexes: [
    { fields: ['email'] }
  ]
});
 
export default User;
