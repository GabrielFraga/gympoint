module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('help_orders', 'student_name', {
      type: Sequelize.STRING,
      before: 'question',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('help_orders', 'student_name');
  },
};
