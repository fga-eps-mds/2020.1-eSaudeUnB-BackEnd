const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => sequelize.define('Psychologist', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bibliography : {
        type: DataTypes.STRING,
    },
    specialization:{
        type: DataTypes.STRING,
    },
    
});