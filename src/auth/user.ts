import { GraphQLID, GraphQLString } from "graphql";
import { resolve } from "path";
import { userAuths } from "../schema/typedefs/User";
import { createToken } from './jwt';

export const user_auth = {
    type : userAuths,
    args : {
        username : { type : GraphQLString }
    },
    async resolve(parent:any, args:any){
        const { username } = args;        
        return createToken(username);
    }
}