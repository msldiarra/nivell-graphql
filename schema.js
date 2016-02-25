import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema
} from 'graphql';

import db from './db';
import sha256 from 'js-sha256';

const User = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        return {
            id: { type: GraphQLInt, resolve(user) { return user.id } },
            credentials: { type: Login, resolve(user) { return user.login } },
            contact: { type: Contact, resolve(user) { return user.login } },
            info: { type: ContactInfo, resolve(user) { return user.login } },
            company: { type: Customer, resolve(user) { return user.company } }
        }
    }
});

const Customer = new GraphQLObjectType({
    name: 'Customer',
    fields: () => {
        return {
            id: { type: GraphQLInt, resolve(customer) { return customer.id } },
            name: { type: GraphQLString, resolve(customer) { return customer.name } },
            contacts: { type: new GraphQLList(Contact), resolve(customer) { return customer.getContacts() } }
        }
    }
});

const Contact = new GraphQLObjectType({
    name: 'Contact',
    fields: () => {
        return {
            id: { type: GraphQLInt, resolve(contact) { return contact.id } },
            firstName: { type: GraphQLString, resolve(contact) { return contact.firstname } },
            lastName: { type: GraphQLString, resolve(contact) { return contact.lastname } },
            credentials: { type: new GraphQLList(Login), resolve(contact) { return contact.getLogins() } }
        }
    }
});

const Login = new GraphQLObjectType({
    name: 'Login',
    fields: () => {
        return {
            id: { type: GraphQLInt, resolve(login) { return login.id } },
            login: { type: GraphQLString, resolve(login) { return login.login } },
            password: { type: GraphQLString, resolve(login) { return login.password } },
            enabled: { type: GraphQLBoolean, resolve(login) { return login.enabled } }
        }
    }
});

const ContactInfo = new GraphQLObjectType({
    name: 'ContactInfo',
    fields: () => {
        return {
            id: { type: GraphQLInt, resolve(contactInfo) { return contactInfo.id } },
            email: { type: GraphQLString, resolve(contactInfo) { return contactInfo.email } }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        customer: {
            type: Customer,
            args: { id: { type: GraphQLInt } },
            resolve: function (_, args) {  return  db.models.customer.findOne({where: args}) }
        },
        contacts: {
            type: new GraphQLList(Contact),
            args: { id: { type: GraphQLInt } },
            resolve: function (_, args) {  return  db.models.contact.findAll({where: args}) }
        },
        login: {
            type: Login,
            args: { id: { type: GraphQLInt } },
            resolve: function (_, args) {  return  db.models.login.findOne({where: args}) }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
        return {
            addCustomer: {
                type: Customer,
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: (_, args) =>
                    db.models.customer.create({
                        name: args.name
                    })
            }
        }
    }

});

var Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;