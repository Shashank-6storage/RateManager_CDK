import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql';

export const rulesType = new GraphQLObjectType({
    name: "rules_id",
    fields: () => ({
        id              : {type: GraphQLID},
        ruleName        : {type: GraphQLString},
        compound_id     : {type: GraphQLString},
        accumulate_id   : {type: GraphQLString},
        price           : {type: GraphQLString},
        evaluate_days   : {type: GraphQLString},
        created_date    : {type: GraphQLString},        
        datas           : {type: GraphQLString}
    })
});

export const rulesList = new GraphQLObjectType({
    name: "rulesList",
    fields: () => ({
        id              : {type: GraphQLID},
        ruleName        : {type: GraphQLString},
        firstname        : {type: GraphQLString},
        lastname        : {type: GraphQLString},
        email        : {type: GraphQLString}, 
        price        : {type: GraphQLString}, 
        days        : {type: GraphQLString}, 
        subrule        : {type: GraphQLString},
        impact        : {type: GraphQLString}, 
        rulecount        : {type: GraphQLString},        
        created_date    : {type: GraphQLString},   
    })
});

export const rulesName = new GraphQLObjectType({
    name: "rulesName",
    fields : () => ({
        key             : {type : GraphQLString},
        value           : {type: GraphQLString},
        text            : {type: GraphQLString}
    })
})

export const unitRuleType = new GraphQLObjectType({
    name: "unitRules",
    fields: () => ({
        lease_Id            : {type: GraphQLString},
        contractNo     : {type: GraphQLString},
        tenantId    : {type: GraphQLString}
    })
});

export const rulesMessageType = new GraphQLObjectType({
    name : "rulesMessage",
    fields : () => ({
        successful  : { type : GraphQLBoolean },
        message     : { type : GraphQLString },
        ruleId      : { type : GraphQLString}
    })
});

export const rulesExist = new GraphQLObjectType({
    name: "rulesExist",
    fields: () => ({
        id              : {type: GraphQLID},
        ruleId          : {type: GraphQLString},
        ruleName        : {type: GraphQLString},
        compound_id     : {type: GraphQLString},
        accumulate_id   : {type: GraphQLString},
        price           : {type: GraphQLString},
        evaluate_days   : {type: GraphQLString},
        created_date    : {type: GraphQLString},
    })
});

export const conditionDisplay = new GraphQLObjectType({
    name: "conditionDisplay",
    fields: () => ({
        name            : { type : GraphQLString},
        compound_id     : { type : GraphQLString},
        accumulate_id   : { type : GraphQLString},
        price           : { type : GraphQLString},
        evaluate_days   : { type : GraphQLString}
    })
})


export const ruleDisplay = new GraphQLObjectType({
    name: "ruleDisplay",
    fields: () => ({
        name            : { type : GraphQLString},
        compound_id     : { type : GraphQLString},
        accumulate_id   : { type : GraphQLString},
        price           : { type : GraphQLString},
        evaluate_days   : { type : GraphQLString}
    })
})