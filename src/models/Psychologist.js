module.exports = (sequelize, DataTypes) => sequelize.define('Psychologist', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bond: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bibliography: {
        type: DataTypes.TEXT,
    },
    specialization: {
        type: DataTypes.STRING,
    },

});
