import {GraphQLObjectType, GraphQLID, GraphQLString} from 'graphql';

export const userType = new GraphQLObjectType({
    name: "users",
    fields: () => ({
        id          : {type: GraphQLID},
        name        : {type: GraphQLString},
        username    : {type: GraphQLString},
        password    : {type: GraphQLString}
    })
});

export const userAuths = new GraphQLObjectType({
    name : "userAuth",
    fields : () => ({
        username : {type: GraphQLString},
        token : {type: GraphQLString}
    })
})