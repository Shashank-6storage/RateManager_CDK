import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { resolve } from "path";
import { Users } from "../entities/User";
import { result } from "../typedefs/Lease";

export const lease_addrule = {
    type : result,
    args: {
        rule_id : { type: GraphQLString },
        ids : { type: GraphQLString },
    },
    async resolve(parent: any, args: any){
        const { rule_id, ids } = args;
        const contNo = JSON.parse(ids);
        var addRule;
        contNo.map((contnum : any) => {
            addRule = Users.query("UPDATE `user_contract` SET `ruleId`='"+rule_id+"' WHERE `id` = '"+contnum.userContract+"'");
        });

        return {successful:true, message: "Rule is Maped to Lease Successfully"}
    }

}

export const remove_lease = {
    type : new GraphQLList(result),
    args : {
        ruleId : {type: GraphQLString},
    },
    async resolve(parent : any, args : any){
        const ruleIds  = JSON.parse(args.ruleId);
        ruleIds.map(async (rulemap : any) => {
            await Users.query("UPDATE `user_contract` SET `ruleId`= NULL WHERE `id` = '"+rulemap.ruleId+"'");
        })
        return [{ successful: true, message: "Lease is removed from Rule Succesfully" }];
    }
}