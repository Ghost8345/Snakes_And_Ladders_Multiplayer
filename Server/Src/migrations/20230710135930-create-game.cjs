'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('games', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roomId: {
        type: Sequelize.INTEGER,
      },
      boardId: {
        type: Sequelize.INTEGER,
        references: { model: 'boards', key: 'id' }
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      color: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending"
      },
      lastTurn: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references:{model:'users',key:'id'}
      },
      numberOfPlayers: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('games');
  },
};