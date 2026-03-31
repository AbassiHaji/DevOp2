const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config.json');

// determine environment
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// initialize sequelize
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

// define user_detail table model
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

// migration runner
async function migrate() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        await UserDetail.sync({ alter: true });
        console.log('UserDetail table migration completed.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

// Only run migration if invoked directly
if (require.main === module) {
    migrate();
}

module.exports = {
    sequelize,
    UserDetail
};