const sequelize = require('../config/db');
const Sequelize = require('sequelize');
// Define the 'User' model
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false, // Null is not allowed for 'username'
        unique: true, // 'username' must be unique
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false, // Null is not allowed for 'password'
    },
});

// Sync the models with the database
sequelize.sync();

module.exports = {
    sequelize,
    User,
};
