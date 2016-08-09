import DataType from 'sequelize';
import Model from '../sequelize';

const Fields = {
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataType.STRING,
  state: DataType.STRING
};
const City = Model.define('City', Fields);

export {City as default, Fields};
