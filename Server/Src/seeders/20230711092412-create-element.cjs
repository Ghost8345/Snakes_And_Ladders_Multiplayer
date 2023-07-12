'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('elements', [
      { goFrom: 1, goTo: 38, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 4, goTo: 14, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      // Add more element data here for ladders and snakes
      { goFrom: 17, goTo: 7, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 9, goTo: 31, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 62, goTo: 19, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 21, goTo: 42, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 87, goTo: 24, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 28, goTo: 84, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 54, goTo: 34, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 51, goTo: 67, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 64, goTo: 60, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 71, goTo: 91, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 93, goTo: 73, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 95, goTo: 75, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 98, goTo: 79, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { goFrom: 80, goTo: 100, boardId: 1, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('elements', null, {});
  }
};
