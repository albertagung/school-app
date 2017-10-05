'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students',[{
      first_name:'Albert',
      last_name:"Agung",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name:"Gunung",
      last_name:"Agung",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
