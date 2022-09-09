import { GraphQLID, GraphQLList } from "graphql";
import { Rules } from "../entities/Rules";
import { Users } from "../entities/User";
import { userType } from "../typedefs/User";


export const get_all_user = {
    type    : new GraphQLList(userType),
    resolve(){
        return Users.find()
    }
}

