const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config.json');

// determine current environment
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// initialize sequelize instance
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        port: dbConfig.port
    },
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

// define user_detail model
const UserDetail = sequelize.define('user_detail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'user_detail'
});

module.exports = {
    sequelize,
    UserDetail
};