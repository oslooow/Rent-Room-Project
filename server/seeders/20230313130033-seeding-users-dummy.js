'use strict';
const users = require('../data/users.json');
const {hashedPw} = require('../helpers/hashing');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let toIns = []
   for (let i = 0; i < users.length; i++) {
    const user = users[i];
    user.password = await hashedPw(user.password)
    user.updatedAt = user.createdAt = new Date()
    toIns.push(user)
   }
  //  let toIns =  users.map(ele => {
  //   ele.password = await hashedPw(ele.password)
  //   ele.updatedAt = ele.createdAt = new Date()
  //   return ele
  //  })
    await queryInterface.bulkInsert('Users', toIns);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users');
  }
};
