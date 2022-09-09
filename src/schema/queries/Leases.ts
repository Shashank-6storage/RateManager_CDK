import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { resolve } from "path";
import { storageIdentity } from "../entities/StorageUnit";
import { Users } from "../entities/User";
import { leaseFilter, leaseResult, result } from "../typedefs/Lease";

export const lease_reacord = {
    type: new GraphQLList(leaseResult),
    args: {
        clientId    : { type: GraphQLString },
        min         : { type: GraphQLInt},
        max         : { type: GraphQLInt},
        listId      : { type: GraphQLInt},
        storageType : { type: GraphQLString},
        location    : { type: GraphQLString},
        building    : { type: GraphQLString},
        unitType    : { type: GraphQLString},
        pricemin    : { type: GraphQLInt},
        pricemax    : { type: GraphQLInt},
        dayslimit   : { type: GraphQLInt},
        daterange   : { type: GraphQLString}
    },
    async resolve(parent: any, args: any) {
        const { clientId, min, max, listId, storageType, location, building, unitType, pricemin, pricemax, dayslimit, daterange} = args;
        var masterlistlease = '';
        if(listId === 2){ masterlistlease = 'AND UC.ruleId IS NOT NULL' }else if(listId === 3){ masterlistlease = 'AND UC.ruleId IS NULL'}
        var listlease = '';
        if(listId === 2){ listlease = 'AND UCC.ruleId IS NOT NULL' }else if(listId === 3){ listlease = 'AND UCC.ruleId IS NULL'}

        var daylimit_a, daylimit_b;
        var dateranges = JSON.parse(daterange);

        var _storagetype    = (storageType !== undefined && storageType !== '') ? "AND SI.storageType = '"+storageType+"'" : "";
        var _location       = (location !== undefined && location !== '') ? "AND SI.location = '"+location+"'" : "";
        var _building       = (building !== undefined && building !== '') ? "AND SI.building = '"+building+"'" : "";
        var _unitType       = (unitType !== undefined && unitType !== '') ? "AND SI.unitType = '"+unitType+"'" : "";
        var _price          = (pricemax > 0) ? "AND SU.netAmount BETWEEN "+pricemin+" and "+pricemax+"" : "";
        var _dayslimit      = (dayslimit > 0) ? "AND SL.moveInDate between '"+daylimit_a+"' and '"+daylimit_b+"'" : "";
        var _daterange      = (dateranges.from !== null) ? "AND SL.moveInDate between '"+dateranges.from+"' and '"+dateranges.to+"'" : "";

        var c_storagetype    = (storageType !== undefined && storageType !== '') ? "AND SIC.storageType = '"+storageType+"'" : "";
        var c_location       = (location !== undefined && location !== '') ? "AND SIC.location = '"+location+"'" : "";
        var c_building       = (building !== undefined && building !== '') ? "AND SIC.building = '"+building+"'" : "";
        var c_unitType       = (unitType !== undefined && unitType !== '') ? "AND SIC.unitType = '"+unitType+"'" : "";
        var c_price          = (pricemax > 0) ? "AND SUC.netAmount BETWEEN "+pricemin+" and "+pricemax+"" : "";
        var c_dayslimit      = (dayslimit > 0) ? "AND SLC.moveInDate between '"+daylimit_a+"' and '"+daylimit_b+"'" : "";
        var c_daterange      = (dateranges.from !== null) ? "AND SLC.moveInDate between '"+dateranges.from+"' and '"+dateranges.to+"'" : "";




        const leaseDetail = await Users.query("SELECT UC.id, UC.ruleId, R.name AS ruleName, UC.contractNo, T.firstName, T.lastName, T.email, SU.measurementType, SU.unitMeasurement, SU.unitPrice, SU.taxAmount, SU.netAmount, SU.grossAmount, SI.unitTypeId, SI.unitType, SI.locationId, SI.location, SI.buildingId, SI.building, SL.moveInDate, SL.moveOutDate, SL.invoicePeriodId, SL.invoiceRecurringTypeId, SL.invoicePeriod, SL.invoiceRecurringType, (SELECT COUNT(UCC.id) FROM `user_contract` AS UCC LEFT JOIN `storage_lease` AS SLC ON SLC.contractNo = UCC.contractNo LEFT JOIN `storage_unit` AS SUC ON SUC.contractNo = UCC.contractNo LEFT JOIN `tenant` AS TC ON TC.userId = UCC.tenantId LEFT JOIN `storage_identity` AS SIC on SIC.contractNo = UCC.contractNo WHERE UCC.clientId = '" + clientId + "' "+masterlistlease+" "+c_storagetype+" "+c_location+" "+c_building+" "+c_unitType+" "+c_price+" "+c_dayslimit+" "+c_daterange+") AS `totalpage` FROM `user_contract` AS UC LEFT JOIN `storage_lease` AS SL ON SL.contractNo = UC.contractNo LEFT JOIN `storage_unit` AS SU ON SU.contractNo = UC.contractNo LEFT JOIN `tenant` AS T ON T.userId = UC.tenantId LEFT JOIN `storage_identity` AS SI on SI.contractNo = UC.contractNo LEFT JOIN `rules` AS R ON R.id = UC.ruleId WHERE UC.clientId = '" + clientId + "' "+masterlistlease+" "+_storagetype+" "+_location+" "+_building+" "+_unitType+" "+_price+" "+_dayslimit+" "+_daterange +" ORDER BY SL.moveInDate ASC LIMIT "+min+", "+max+"");
        if (leaseDetail.length) {            
            return leaseDetail;
        } else {
            return [{ result: { successful: false, message: "Please Re-Check your Client ID" } }];
        }
    }
}

export const lease_filter_record = {
    type: new GraphQLList(leaseFilter),
    args: {
        clientId : { type: GraphQLString }
    },
    async resolve(parent : any, args : any){
        const storageTypeData = await storageIdentity.query("SELECT DISTINCT(SI.storageType) AS value FROM `user_contract` AS UC LEFT JOIN `storage_identity` AS SI ON SI.contractNo = UC.contractNo WHERE UC.clientId = '"+args.clientId+"'");
        const locationData = await storageIdentity.query("SELECT DISTINCT(SI.location) AS value FROM `user_contract` AS UC LEFT JOIN `storage_identity` AS SI ON SI.contractNo = UC.contractNo WHERE UC.clientId = '"+args.clientId+"'");
        const buildingData = await storageIdentity.query("SELECT DISTINCT(SI.building) AS value FROM `user_contract` AS UC LEFT JOIN `storage_identity` AS SI ON SI.contractNo = UC.contractNo WHERE UC.clientId = '"+args.clientId+"'");
        const unitTypeData = await storageIdentity.query("SELECT DISTINCT(SI.unitType) AS value FROM `user_contract` AS UC LEFT JOIN `storage_identity` AS SI ON SI.contractNo = UC.contractNo WHERE UC.clientId = '"+args.clientId+"'");
        const minPriceData = await storageIdentity.query("SELECT SU.netAmount AS value  FROM `user_contract` AS UC LEFT JOIN `storage_unit` AS SU ON SU.contractNo = UC.contractNo WHERE UC.clientId = '"+args.clientId+"' ORDER BY SU.netAmount ASC LIMIT 1");
        const maxPriceData = await storageIdentity.query("SELECT SU.netAmount AS value  FROM `user_contract` AS UC LEFT JOIN `storage_unit` AS SU ON SU.contractNo = UC.contractNo WHERE UC.clientId = '"+args.clientId+"' ORDER BY SU.netAmount DESC LIMIT 1");

        return [{ 
            storageType : storageTypeData, 
            location    : locationData,
            building    : buildingData ,
            unitType    : unitTypeData,
            minPrice    : minPriceData[0].value,
            maxPrice    : maxPriceData[0].value,
            amenity     : "",
            
        }]        
    }
}

export const lease_impact = {
    type: new GraphQLList(leaseResult),
    args: {
        clientId    : { type: GraphQLString },
        min         : { type: GraphQLInt},
        max         : { type: GraphQLInt},
        ruleId      : { type: GraphQLString}
    },
    async resolve(parent: any, args: any) {
        const { clientId, min, max, ruleId } = args;

        const leaseDetail = await Users.query("SELECT UC.id, UC.ruleId, UC.contractNo, T.firstName, T.lastName, T.email, SU.measurementType, SU.unitMeasurement, SU.unitPrice, SU.taxAmount, SU.netAmount, SU.grossAmount, SI.unitTypeId, SI.unitType, SI.locationId, SI.location, SI.buildingId, SI.building, SL.moveInDate, SL.moveOutDate, SL.invoicePeriodId, SL.invoiceRecurringTypeId, SL.invoicePeriod, SL.invoiceRecurringType, (SELECT COUNT(SLC.id) FROM `storage_lease` AS SLC LEFT JOIN `user_contract` AS UCC ON SLC.contractNo = UCC.contractNo WHERE UCC.clientId = UC.clientId AND UCC.ruleId = '"+ruleId+"') AS `totalpage` FROM `user_contract` AS UC LEFT JOIN `storage_lease` AS SL ON SL.contractNo = UC.contractNo LEFT JOIN `storage_unit` AS SU ON SU.contractNo = UC.contractNo LEFT JOIN `tenant` AS T ON T.userId = UC.tenantId LEFT JOIN `storage_identity` AS SI on SI.contractNo = UC.contractNo WHERE UC.clientId = '" + clientId + "' AND UC.ruleId = '"+ruleId+"' ORDER BY SL.moveInDate ASC LIMIT "+min+", "+max+"");
        if (leaseDetail.length) {            
            return leaseDetail;
        } else {
            return [{ result: { successful: false, message: "Please Re-Check your Client ID" } }];
        }
    }
}


