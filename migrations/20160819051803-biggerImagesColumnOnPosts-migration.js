'use strict';

const tableName = 'posts';
const columnName = 'images';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      tableName,
      columnName,
      {
        type: Sequelize.TEXT
      }
    )
  },

  down: function (queryInterface) {
    queryInterface.changeColumn(
      tableName,
      columnName,
      {
        type: Sequelize.STRING
      }
    );
  }
};
