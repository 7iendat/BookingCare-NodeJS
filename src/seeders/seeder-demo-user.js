'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      passWord:'123456',
      firstName: 'Dark',
      lastName: 'Hunter',
      address:'HCM City',
      gender:'M',
      phoneNumber:'0703457681',
      positionId:'P0',
      image:'',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
