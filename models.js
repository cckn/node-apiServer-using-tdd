const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false,
});

const User = sequelize.define('User', {
    name: Sequelize.STRING, //varchar 255
});

module.exports = { Sequelize, sequelize, User };
