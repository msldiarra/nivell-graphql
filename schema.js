import {fromCallback} from 'bluebird';
import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql'


const User = new GraphQLObjectType({
    name: 'User',
    description: 'Customer with access to Nivell UI',
    fields: () => ({
        id: {type: GraphQLID},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString},
        login: {type: GraphQLString},
        password: {type: GraphQLString},
        enabled: {type: GraphQLBoolean},
        company: {type: GraphQLString}
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        user: {
            type: User,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: (_, {id}, { rootValue: { client } }) =>  {
                return fromCallback((callback) => client.query(`SELECT * FROM Users WHERE id = $1`, id, callback))
                    .then((result) => { return result.rows[0]; });
            }
        }
    })
});


const Schema = new GraphQLSchema({
    query: Query
});

export default Schema