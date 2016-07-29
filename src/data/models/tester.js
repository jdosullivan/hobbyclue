import sequelize from '../sequelize';
import User from './User';


function sync(...args) {
 return sequelize.sync(...args);
}

export default { sync };

export { User }; //, UserLogin, UserClaim, UserProfile };