import Sequelize from 'sequelize';

const DBConnection = new Sequelize(
    'signals',
    'postgres',
    '1234',
    {
        dialect: 'postgres',
        host: 'localhost'
    }
)


DBConnection.define('user', {
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    enabled: Sequelize.BOOLEAN,
    company: Sequelize.STRING
    } , {timestamps: false, tableName: 'users', freezeTableName: true,}
);

DBConnection.sync({force: false});


export default DBConnection;