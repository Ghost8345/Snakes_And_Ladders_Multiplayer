'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('games', [
      { roomId: 'room1', boardId: 1, createdBy: 1, status: 'Pending', lastTurn: null, numberOfPlayers: 2, createdAt: new Date(), updatedAt: new Date() },
      { roomId: 'room2', boardId: 2, createdBy: 2, status: 'Pending', lastTurn: 1, numberOfPlayers: 3, createdAt: new Date(), updatedAt: new Date() },
      // Add more game data here
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('games', null, {});
  }
};
