'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        name: "Phyo Thiha",
        age: 21,
        email: "phyothiha@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Phyo Thiha Kyaw",
        age: 21,
        email: "phyothiha0805@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
