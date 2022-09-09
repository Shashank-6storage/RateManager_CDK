import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { resolve } from "path";
import { Rules } from "../entities/Rules";
import { messageType } from "../typedefs/Message";
import { conditionDisplay, ruleDisplay, rulesExist, rulesList, rulesName } from "../typedefs/Rules";

export const get_all_rules = {
    type : new GraphQLList(rulesList),
    args : {
        searchKeyword    : { type: GraphQLString},
        clientId    : { type: GraphQLString},
        min         : { type : GraphQLInt},
        max         : { type : GraphQLInt}
    },
    async resolve(parent : any, args : any){
        const { min, max, clientId, searchKeyword } = args;
        const rulesData = await Rules.query("SELECT R.id, R.name AS ruleName, R.created_date, C.firstname, C.lastname, C.email, (SELECT `price` FROM `rules_evalution` WHERE `rule_id` = R.id ORDER BY evaluate_days ASC LIMIT 1) AS price, (SELECT `evaluate_days` FROM `rules_evalution` WHERE `rule_id` = R.id ORDER BY evaluate_days ASC LIMIT 1) AS days,  (SELECT COUNT(`id`) FROM `rules_evalution` WHERE `rule_id` = R.id ORDER BY evaluate_days ASC LIMIT 1) AS subrule, (SELECT COUNT(`id`) FROM `user_contract` WHERE `ruleId` = R.id LIMIT 1) AS impact, ( SELECT COUNT(`id`) FROM `rules` WHERE `client_id` = R.client_id AND name LIKE '%"+searchKeyword+"%' ) AS rulecount FROM `rules` AS R LEFT JOIN `client` AS C ON C.client_id = R.client_id WHERE R.client_id = '"+clientId+"' AND R.flag = '1' AND R.name LIKE '%"+searchKeyword+"%' LIMIT "+min+", "+max+"");
        if(rulesData){
            return rulesData;
        }else{
            
        }
    }
}

export const get_rules_id = {
    type : new GraphQLList(rulesExist),
    args : {
        rule_id : { type : GraphQLString},
        client_id : { type : GraphQLString}
    },
    async resolve(parent : any, args : any){
        const { rule_id, client_id } = args;
        return await Rules.query("SELECT R.id, R.name AS ruleName, R.compound_id, RE.id AS ruleId, RE.accumulate_id, RE.price, RE.evaluate_days, R.created_date FROM `rules` AS R LEFT JOIN `rules_evalution` AS RE ON RE.rule_id = R.id WHERE R.id = '"+rule_id+"' AND R.client_id = '"+client_id+"' AND  R.flag = 1 ORDER BY RE.created_date ASC");
    }
}

export const get_rules_name = {
    type : new GraphQLList(rulesName),
    args : {
        client_id : { type : GraphQLString }
    },
    async resolve(parent: any, args: any){
        return await Rules.query("SELECT `id` AS `key`, `id` as `value`, `name` as text FROM `rules` WHERE `client_id` = '"+args.client_id+"' AND flag = '1' ORDER BY `created_date` desc")
    }
}

export const show_condition = {
    type : new GraphQLList(conditionDisplay),
    args : {
        ruleId : {type : GraphQLString}
    },
    async resolve(parent : any, args : any){
        const { ruleId } = args;
        return await Rules.query("SELECT R.name, R.compound_id, RE.accumulate_id, RE.price, RE.evaluate_days FROM `rules` AS R LEFT JOIN `rules_evalution` AS RE ON RE.rule_id = R.id WHERE R.id = '"+ruleId+"'")
    }
}

export const show_rule = {
    type : new GraphQLList(ruleDisplay),
    args : {
        ruleId : {type: GraphQLString}
    },
    async resolve(parent: any, args : any){
        const { ruleId } = args;
        return await Rules.query("SELECT R.name, R.compound_id, RE.accumulate_id, RE.price, RE.evaluate_days FROM `rules` AS R LEFT JOIN `rules_evalution` AS RE ON RE.rule_id = R.id WHERE R.id = '"+ruleId+"'")
    }
}