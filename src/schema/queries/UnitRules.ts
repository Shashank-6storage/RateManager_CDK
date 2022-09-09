import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { Rules } from "../entities/Rules";
import { Lease } from "../entities/StorageLease";
import { messageType } from "../typedefs/Message";
import { rulesType, unitRuleType } from "../typedefs/Rules";

export const unit_rule = {
    type : new GraphQLList(unitRuleType),
    args : {
        contract_id : { type : GraphQLString}
    },
    async resolve(parent : any, args : any){
        const { min, max } = args;
        const unitRuleData = await Lease.query("SELECT sl.lease_Id, sl.contractNo, sl.moveInDate, uc.clientId, uc.tenantId FROM `storage_lease` AS `sl` LEFT JOIN `user_contract` AS `uc` ON sl.contractNo = uc.contractNo WHERE sl.contractNo = 'LID001728'");
        if(!unitRuleData){
            return unitRuleData;
        }else{
             
        }
    }
}