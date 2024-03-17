'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'geos',
          'description',
          {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('geos', 'description', {
          transaction: t,
        }),
      ]);
    });
  },
};
