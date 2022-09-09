import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";
import { Rules, RulesEvalution } from "../entities/Rules";
import { messageType, rulesType } from "../typedefs/Message";
import { rulesExist, rulesMessageType } from "../typedefs/Rules";



export const new_rules = {
    type : rulesMessageType,
    args : {
        name        : { type : GraphQLString },
        compound    : { type: GraphQLString },
        datas       : { type: GraphQLString },
        clientId    : { type: GraphQLString }
    },
    async resolve(parent:any, args:any){
        const {
            name, 
            compound,
            datas,
            clientId
        } = args;
        const uid = uuidv4();

        const ruleData = JSON.parse(datas);

        const ruleName = await Rules.query("SELECT Count(`name`) AS count FROM `rules` WHERE `name` = '"+name+"' AND `client_id` = '"+clientId+"' LIMIT 1");

        if(ruleName[0].count <= 0){
            const rulesAdded = await Rules.query("INSERT INTO `rules`(`id`, `client_id`, `name`, `compound_id`) VALUES ('"+uid+"', '"+clientId+"', '"+name+"','"+compound+"')");
            
            ruleData.map((data: any) => {
                RulesEvalution.query("INSERT INTO `rules_evalution`(`accumulate_id`, `price`, `evaluate_days`, `id`, `rule_id`) VALUES ('"+data.accelerate+"','"+data.price+"','"+data.days+"','"+uuidv4()+"','"+uid+"')");
                // console.log(data.accelerate);
            });
            
            if(rulesAdded.affectedRows){
                return {successful:true, message: "Rules Created Successfully", ruleId: uid};
            }else{
                return {successful:false, message: "Failed!"};
            }
        }else{
            return {successful:false, message: "Rules Name Already Exist!"};
        }
    }
}

export const update_rules = {
    type : messageType,
    args : {
        id          : { type : GraphQLID },
        name        : { type : GraphQLString },
        description : { type : GraphQLString } 
    },
    async resolve(parent : any, args : any){
        const { id, name, description } = args;
        const updated_rule = await Rules.query("UPDATE `rules` SET `name` = '"+name+"', `description` = '"+description+"' WHERE `rules`.`id` = "+id+"");

        if(updated_rule.affectedRows){
            return {successful:true, message: "Rules has updated Successfully"};
        }else{
            return {successful:false, message: "Rules updation Failed!"};
        }
    }
}

export const edit_rule = {
    type : messageType,
    args : {
        ruleId      : { type: GraphQLString},
        evaluteId   : { type: GraphQLString},
        datas       : { type: GraphQLString},
        name        : { type: GraphQLString},
        compound    : { type: GraphQLString}
    },
    async resolve(parent : any, args : any){
        const { ruleId, evaluteId, datas, name, compound } = args;

        const ruleDatas     = JSON.parse(datas);
        const evaluteDelete = JSON.parse(evaluteId);

        const rulesUpdate = await Rules.query("UPDATE `rules` SET `name`='"+name+"',`compound_id`='"+compound+"' WHERE `id` = '"+ruleId+"'");

        if(rulesUpdate.affectedRows){
            ruleDatas.map((rd : any) => {
                RulesEvalution.query("UPDATE `rules_evalution` SET `accumulate_id`='"+rd.accelerate+"',`price`='"+rd.price+"',`evaluate_days`='"+rd.days+"' WHERE `id` = '"+rd.ruleId+"'");
            });
            evaluteDelete.map((ed : any) => {
                RulesEvalution.query("DELETE FROM `rules_evalution` WHERE `id` = '"+ed.ruleIds+"'");
            });

            return {successful:true, message: "Rules has updated Successfully"};
            
        }else{
            return {successful:false, message: "Rules updation Failed!"};
        }
    }
}

export const delete_rule = {
    type: messageType,
    args: {
        ruleId : { type: GraphQLString},
    },
    async resolve(parent : any, args : any){
        const { ruleId } = args;
        const ruleRemove = await Rules.query("DELETE FROM `rules` WHERE `id` = '"+ruleId+"'");
        await RulesEvalution.query("DELETE FROM `rules_evalution` WHERE `rule_id` = '"+ruleId+"'")
        await Rules.query("UPDATE `user_contract` SET `ruleId`= NULL WHERE `ruleId` = '"+ruleId+"'");

        if(ruleRemove.affectedRows > 0){
            return {successful:true, message: "Rules deleted Successfully"};
        }else{
            return {successful:false, message: "Rules delete Failed!"};
        }
    }
}
