import DataType from 'sequelize';
import Model from '../sequelize';

const UserClaim = Model.define('UserClaim', {

  type: {
    type: DataType.STRING
  },

  value: {
    type: DataType.INTEGER
  }
});
export default UserClaim;
