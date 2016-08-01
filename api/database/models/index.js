import sequelize from '../sequelize';
import User, { comparePassword } from './User';
import UserClaim from './UserClaim';

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserClaim, comparePassword };