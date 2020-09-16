module.exports = (sequelize, DataTypes) => sequelize.define('Patient', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    unbRegistration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bond: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
