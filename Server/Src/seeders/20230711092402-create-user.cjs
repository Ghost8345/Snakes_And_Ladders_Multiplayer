'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      { userName: 'user1', password: 'password1', createdAt: new Date(), updatedAt: new Date()},
      { userName: 'user2', password: 'password2', createdAt: new Date(), updatedAt: new Date() },
      // Add more user data here
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
