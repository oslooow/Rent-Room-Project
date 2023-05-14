"use strict";
const accoms = require("../data/accomodations.json");

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
    let toIns = accoms.map((ele) => {
      ele.updatedAt = ele.createdAt = new Date();
      return ele;
    });
    await queryInterface.bulkInsert("Accomodations", toIns);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Accomodations");
  },
};
