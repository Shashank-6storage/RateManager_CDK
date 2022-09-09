import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";


export const messageType = new GraphQLObjectType({
    name : "Message",
    fields : () => ({
        successful  : { type : GraphQLBoolean },
        message     : { type : GraphQLString }
    })
})

export const rulesType = new GraphQLObjectType({
    name : "Result",
    fields : () => ({
        successful  : { type : GraphQLBoolean },
        message     : { type : GraphQLString },
        id          : { type : GraphQLString }
    })
})