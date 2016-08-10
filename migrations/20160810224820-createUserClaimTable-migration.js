'use strict';
const tableName = 'userClaims';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      tableName,
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        userid: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        type: {type: Sequelize.STRING( 255 )},
        value: Sequelize.BIGINT,
        createdAt: {type: Sequelize.DATE},
        updatedAt: {type: Sequelize.DATE}
      }
    );
  },

  down: function (queryInterface) {
    queryInterface.dropTable( tableName );
  }
};
