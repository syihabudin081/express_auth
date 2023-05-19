const Sequelize = require('sequelize');

// Initialize Sequelize with your PostgreSQL connection details
const sequelize = new Sequelize('nusalingo', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
});

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
