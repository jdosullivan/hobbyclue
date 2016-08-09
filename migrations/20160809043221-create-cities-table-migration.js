'use strict';

const citiesTableName = 'cities';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      citiesTableName,
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        name: Sequelize.STRING,
        state: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable(citiesTableName);
  }
};
