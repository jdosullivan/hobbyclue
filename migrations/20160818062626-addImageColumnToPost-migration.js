'use strict';

const tableName = 'posts';
const columnName = 'images';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      tableName,
      columnName,
      Sequelize.STRING
    );
  },

  down: function (queryInterface) {
    queryInterface.removeColumn(tableName, columnName);
  }
};
