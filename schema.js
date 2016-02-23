import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLSchema
} from 'graphql';

import db from './db';

var data = require('./data.json');

const User = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(user) { return user.id }
            },
            firstName: {
                type: GraphQLString,
                resolve(user) { return user.firstname }
            },
            lastName: {
                type: GraphQLString,
                resolve(user) { return user.lastname }
            },
            login: {
                type: GraphQLString,
                resolve(user) { return user.login }
            },
            password: {
                type: GraphQLString,
                resolve(user) { return user.password }
            },
            email: {
                type: GraphQLString,
                resolve(user) { return user.email }
            },
            enabled: {
                type: GraphQLBoolean,
                resolve(user) { return user.enabled }
            },
            company: {
                type: GraphQLString,
                resolve(user) { return user.company }
            }
        }
    }
});

// Define our schema, with one top level field, named `user`, that
// takes an `id` argument and returns the User with that ID.
var Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: User,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: function (_, args) {
                    return db.models.user.findOne({where: args});
                }
            }
        }
    })
});

export default Schema;