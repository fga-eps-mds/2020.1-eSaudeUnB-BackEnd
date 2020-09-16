module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Patient', {
            id: Sequelize.DataTypes.STRING,
            name: Sequelize.DataTypes.STRING,
            lastName: Sequelize.DataTypes.STRING,
            email: Sequelize.DataTypes.STRING,
            phone: Sequelize.DataTypes.STRING,
            password: Sequelize.DataTypes.STRING,
            unbRegistration: Sequelize.DataTypes.STRING,
            gender: Sequelize.DataTypes.STRING,
            bond: Sequelize.DataTypes.STRING,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Patient');
    },
};
