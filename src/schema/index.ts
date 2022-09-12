import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { lease_addrule, remove_lease } from "./mutations/Leases";
import { delete_rule, edit_rule, new_rules, update_rules } from "./mutations/Rules";
import { create_user, delete_user, update_user } from "./mutations/User";
import { lease_filter_record, lease_impact, lease_reacord, test_gfun } from "./queries/Leases";
import { get_all_rules, get_rules_id, get_rules_name, show_condition, show_rule } from "./queries/Rules";
import { unit_rule } from "./queries/UnitRules";
import { get_all_user } from "./queries/User";


const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields : {
        // getAllUser  : get_all_user,
        getAllRules         : get_all_rules,
        getRulesID          : get_rules_id,
        getRulesName        : get_rules_name,
        unitRule            : unit_rule,
        leaseRecord         : lease_reacord,
        filterRecord        : lease_filter_record,
        conditionDetails    : show_condition,
        ruleDisplay         : show_rule,
        leaseImpact         : lease_impact,
        test_gql            : test_gfun
    }
})

const rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    fields : {
        createUser  : create_user,
        // deleleUser  : delete_user,
        // updateUser  : update_user,
        newRules        : new_rules,
        updateRules     : update_rules,
        editRule        : edit_rule,
        leaseAddrule    : lease_addrule,
        removeLease     : remove_lease,
        ruleDelete      : delete_rule,
    }
})

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});