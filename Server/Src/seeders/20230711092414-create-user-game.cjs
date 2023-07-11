'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usergames', [
      { userId: 1, gameId: 1, position: 0, status: 'Active', color: 'red', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, gameId: 1, position: 0, status: 'Active', color: 'blue', createdAt: new Date(), updatedAt: new Date() },
      // Add more user game data here
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usergames', null, {});
  }
};
