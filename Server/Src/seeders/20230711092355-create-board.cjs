'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('boards', [
      { imagePath: 'board1.jpg', createdAt: new Date(), updatedAt: new Date() },
      { imagePath: 'board2.jpg', createdAt: new Date(), updatedAt: new Date() },
      // Add more board data here
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('boards', null, {});
  }
};
