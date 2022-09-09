import { Lease } from "../schema/entities/StorageLease";
import { storageIdentity, Unit } from "../schema/entities/StorageUnit";
import { Users } from "../schema/entities/User";
import { v4 as uuid4 } from "uuid";
import { format } from "date-fns";

export const LeaseInfo = async (data : any) => {
    const {
        Id,
        ContractNo,
        MoveInDate,
        MoveOutDate,
        NextBillingDate,
        PaidThrough,
        LeaseStatus
    } = JSON.parse(JSON.stringify(data.LeaseInfo));
    const invoiceData = {
        InvoicePeriod : (data.LeaseInfo.InvoicePeriod.Name).replace(/^["'](.+(?=["']$))["']$/, '$1'),
        InvoiceRecurringType : (data.LeaseInfo.InvoiceRecurringType.Name).replace(/^["'](.+(?=["']$))["']$/, '$1'),
        InvoicePeriodId : data.LeaseInfo.InvoicePeriod.InvoicePeriodId,
        InvoiceRecurringTypeId : data.LeaseInfo.InvoiceRecurringType.InvoiceRecurringId,
    }
    // const movein = new Date(MoveInDate);    
    const movein = format(new Date(MoveInDate), 'yyyy-MM-dd HH:MM:SS');
    const moveout = format(new Date(MoveOutDate), 'yyyy-MM-dd HH:SS:MM');

    const userContractLease = await Users.query("SELECT `id` FROM `user_contract` WHERE `contractNo` = '"+ContractNo+"'");
    if(userContractLease.length <= 0){
        const queryExe = await Lease.query("INSERT INTO `storage_lease`(`id`,`lease_Id`, `contractNo`, `leaseStatus`, `moveInDate`, `moveOutDate`, `nextBillingDate`, `paidThrough`, `invoicePeriodId`, `invoiceRecurringTypeId`, `invoicePeriod`, `invoiceRecurringType`) VALUES ('"+uuid4()+"','"+Id+"','"+ContractNo+"','"+LeaseStatus+"','"+movein+"','"+moveout+"','"+NextBillingDate+"','"+PaidThrough+"','"+invoiceData.InvoicePeriodId+"','"+invoiceData.InvoiceRecurringTypeId+"','"+invoiceData.InvoicePeriod+"','"+invoiceData.InvoiceRecurringType+"')");
    }
}

export const UnitInfo = async (data : any) => {
    const { 
        Id, 
        UnitNumber, 
        Description, 
        UnitMeasurement, 
        MeasurementType, 
        MeasurementFormat, 
        UnitPrice, 
        TaxPercentage, 
        TaxAmount,
        NetAmount,
        GrossAmount,
        AmenityInfoList,
        IsMovable,
        UnitVisibility
    } = JSON.parse(JSON.stringify(data.UnitInfo));
    const  { ContractNo }  =  JSON.parse(JSON.stringify(data.LeaseInfo));

    const userContractLease = await Users.query("SELECT `id` FROM `user_contract` WHERE `contractNo` = '"+ContractNo+"'");
    if(userContractLease.length <= 0){
        const queryExe = await Unit.query("INSERT INTO `storage_unit`(`id`,`unitNumber`, `Description`, `unitMeasurement`, `measurementType`, `measurementFormat`, `contractNo`, `storage_unit_id`, `unitPrice`, `taxPercentage`, `taxAmount`, `netAmount`, `grossAmount`, `isMovable`, `unitVisibility`) VALUES ('"+uuid4()+"','"+UnitNumber+"','"+Description+"','"+UnitMeasurement+"','"+MeasurementType+"','"+MeasurementFormat+"','"+ContractNo+"','"+Id+"','"+UnitPrice+"','"+TaxPercentage+"','"+TaxAmount+"','"+NetAmount+"','"+GrossAmount+"','"+IsMovable+"','"+UnitVisibility+"')");
    }
};

export const unitIdentity = async (data : any) => {
       
    const unitPoint = {
        Id : data.UnitInfo.Id,
        StorageTypeId       : data.UnitInfo.StorageType.Id,
        StorageType         : data.UnitInfo.StorageType.Name,
        LocationId          : data.UnitInfo.Location.Id,
        Location            : data.UnitInfo.Location.Name,
        BuildingId          : data.UnitInfo.Building.Id,
        Building            : data.UnitInfo.Building.Name,
        UnitTypeId          : data.UnitInfo.UnitType.Id,
        UnitType            : data.UnitInfo.UnitType.Name,
        UnitStatusId        : (data.UnitInfo.UnitAvailablity !== null) ? (data.UnitInfo.UnitAvailablity.Id) : null,
        UnitStatus          : (data.UnitInfo.UnitAvailablity !== null) ? (data.UnitInfo.UnitAvailablity.Name) : null,
        UnitAvailablity     : (data.UnitInfo.UnitAvailablity !== null) ? (data.UnitInfo.UnitAvailablity.Name) : null
    }
    const  { ContractNo }  =  JSON.parse(JSON.stringify(data.LeaseInfo));
    const userContractLease = await Users.query("SELECT `id` FROM `user_contract` WHERE `contractNo` = '"+ContractNo+"'");
    if(userContractLease.length <= 0){
        const queryExe = await storageIdentity.query("INSERT INTO `storage_identity`(`id`, `contractNo`, `storageTypeId`, `locationId`, `buildingId`, `unitTypeId`, `UnitStatusId`, `storageType`, `location`, `building`, `unitType`, `UnitStatus`, `unitAvailablity`) VALUES ('"+uuid4()+"','"+ContractNo+"','"+unitPoint.StorageTypeId+"','"+unitPoint.LocationId+"','"+unitPoint.BuildingId+"','"+unitPoint.UnitTypeId+"','"+unitPoint.UnitStatusId+"','"+unitPoint.StorageType+"','"+unitPoint.Location+"','"+unitPoint.Building+"','"+unitPoint.UnitType+"','"+unitPoint.UnitStatus+"','"+unitPoint.UnitAvailablity+"')");
    }
}

export const userContract = async (data : any) => {
    const { ClientId, UserId } = JSON.parse(JSON.stringify(data.EventData[0].Tenant));
    const  { ContractNo }  =  JSON.parse(JSON.stringify(data.EventData[0].LeaseInfo));
    const userContractLease = await Users.query("SELECT `id` FROM `user_contract` WHERE `contractNo` = '"+ContractNo+"'");
    if(userContractLease.length <= 0){
        const queryExe = await Users.query("INSERT INTO `user_contract`(`id`,`clientId`, `tenantId`, `contractNo`) VALUES ('"+uuid4()+"','"+ClientId+"','"+UserId+"','"+ContractNo+"')");
    }
}