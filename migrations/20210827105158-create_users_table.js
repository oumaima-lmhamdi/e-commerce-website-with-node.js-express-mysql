'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     return queryInterface.createTable('users', {
      googleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(100)
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(50)
      }
     });

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     return queryInterface.dropTable('users');
  }
};
