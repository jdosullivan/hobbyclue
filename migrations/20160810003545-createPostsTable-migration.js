'use strict';

const tableName = 'posts';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      tableName,
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        title: Sequelize.STRING,
        body: Sequelize.STRING,
        createdAt: { type: Sequelize.DATE },
        updatedAt: { type: Sequelize.DATE }
      }
    )
  },

  down: function (queryInterface) {
    queryInterface.dropTable(tableName);
  }
};
