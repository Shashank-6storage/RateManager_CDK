import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLSchema, GraphQLInt} from 'graphql';
import GraphQLJSON ,{ GraphQLJSONObject } from 'graphql-type-json';

export const result = new GraphQLObjectType({
    name: "result",
    fields: () => ({
        successful          : { type : GraphQLBoolean},
        message             : { type : GraphQLString}
    })
});
export const leaseResult = new GraphQLObjectType({
    name: "leaseResult",
    fields: () => ({
        id                      : { type: GraphQLString },
        ruleId                  : { type: GraphQLString },
        ruleName                : { type: GraphQLString },
        contractNo              : { type: GraphQLString },
        firstName               : { type: GraphQLString },
        lastName                : { type: GraphQLString },
        email                   : { type: GraphQLString },
        unitType                : { type: GraphQLString },
        measurementType         : { type: GraphQLString },
        unitMeasurement         : { type: GraphQLString },
        unitPrice               : { type: GraphQLString },
        taxAmount               : { type: GraphQLString },
        netAmount               : { type: GraphQLString },
        grossAmount             : { type: GraphQLString },
        location                : { type: GraphQLString },
        building                : { type: GraphQLString },
        moveInDate              : { type: GraphQLString },
        moveOutDate             : { type: GraphQLString },
        invoicePeriod           : { type: GraphQLString },
        invoiceRecurringType    : { type: GraphQLString },
        locationId              : { type: GraphQLString },
        buildingId              : { type: GraphQLString },
        moveInDateId            : { type: GraphQLString },
        invoicePeriodId         : { type: GraphQLString },
        invoiceRecurringTypeId  : { type: GraphQLString },
        totalpage               : { type: GraphQLInt},
        result                  : { type: result}
    })
});

export const leaseFilter = new GraphQLObjectType({
    name : 'leaseFilter',
    fields : () => ({
        storageType             : { type: GraphQLJSON },
        location                : { type: GraphQLJSON },
        building                : { type: GraphQLJSON },
        unitType                : { type: GraphQLJSON },
        minPrice                : { type: GraphQLString },
        maxPrice                : { type: GraphQLString },
        amenity                 : { type: GraphQLJSON },
        result                  : { type: result}
    })
});

