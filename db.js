import Sequelize from 'sequelize';

const db = new Sequelize(
    'signals',
    'postgres',
    '1234',
    {
        dialect: 'postgres',
        host: 'localhost'
    }
)

/***
 * User info as needed for mutation
 */
const Customer = db.define('customer', {
    name: Sequelize.STRING
    } , {timestamps: false, freezeTableName: true,}
);

const Contact =  db.define('contact', {
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    } , {timestamps: false, freezeTableName: true,}
);

const Login = db.define('login', {
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    enabled: Sequelize.BOOLEAN
    } , {timestamps: false, freezeTableName: true,}
);

const ContactInfo = db.define('contactInfo', {
    email: Sequelize.STRING
    } , {timestamps: false, freezeTableName: true,}
);

const CustomerContact = db.define('customercontact', {
    customerid: Sequelize.INTEGER,
    contactid: Sequelize.INTEGER
    } , {timestamps: false, freezeTableName: true,}
);

const ContactLogin = db.define('contactlogin', {
    contactid: Sequelize.INTEGER,
    loginid: Sequelize.INTEGER
    } , {timestamps: false, freezeTableName: true,}
);

Customer.belongsToMany(Contact, { through: CustomerContact, foreignKey: 'customerid' });
Contact.belongsToMany(Customer, { through: CustomerContact, foreignKey: 'contactid' });

Contact.belongsToMany(Login, { through: ContactLogin, foreignKey: 'contactid' });
Login.belongsToMany(Contact, { through: ContactLogin, foreignKey: 'loginid' });
/*
* User view for UI display need
* */
db.define('user', {
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    enabled: Sequelize.BOOLEAN,
    company: Sequelize.STRING
    } , {timestamps: false, tableName: 'users', freezeTableName: true,}
);

db.sync({force: false});


export default db;