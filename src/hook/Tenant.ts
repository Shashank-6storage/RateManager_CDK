import { Tenant } from "../schema/entities/User";
import { v4 as uuid4 } from "uuid";

export const tenantCreate = async (data : any) => {
    const {
        UserId,
        ClientId,
        SSN,
        FirstName,
        LastName,
        PhotoPath,
        Email,
        PhoneNumber,
        AddressLineTwo,
        AddressLineOne,
        City,
        State,
        ZipCode,
        Country,
        BusinessUser,
        AccessCode
    } = JSON.parse(JSON.stringify(data));
    const tenantData = await Tenant.query("SELECT COUNT(`id`) AS affectCount FROM `tenant` WHERE `userId` = '"+UserId+"' Limit 1");
    if(tenantData[0].affectCount <= 0){
        Tenant.query("INSERT INTO `tenant`(`id`, `userId`, `clientId`, `ssn`, `firstName`, `lastName`, `photoPath`, `email`, `phoneNumber`, `addressLineTwo`, `addressLineOne`, `city`, `state`, `zipCode`, `country`, `businessUser`, `accessCode`) VALUES ('"+uuid4()+"','"+UserId+"','"+ClientId+"','"+SSN+"','"+FirstName+"','"+LastName+"','"+PhotoPath+"','"+Email+"','"+PhoneNumber+"','"+AddressLineTwo+"','"+AddressLineOne+"','"+City+"','"+State+"','"+ZipCode+"','"+Country+"','"+BusinessUser+"','"+AccessCode+"')");
    }
}

export const tenantUpdate = (data : any) => {
    const {
        UserId,
        SSN,
        FirstName,
        LastName,
        PhotoPath,
        Email,
        PhoneNumber,
        AddressLineTwo,
        AddressLineOne,
        City,
        State,
        ZipCode,
        Country,
        BusinessUser,
        AccessCode
    } = JSON.parse(JSON.stringify(data));
    Tenant.query("UPDATE `tenant` SET `ssn`='"+SSN+"',`firstName`='"+FirstName+"',`lastName`='"+LastName+"',`photoPath`='"+PhotoPath+"',`email`='"+Email+"',`phoneNumber`='"+PhoneNumber+"',`addressLineTwo`='"+AddressLineTwo+"',`addressLineOne`='"+AddressLineOne+"',`city`='"+City+"',`state`='"+State+"',`zipCode`='"+ZipCode+"',`country`='"+Country+"',`businessUser`='"+BusinessUser+"',`accessCode`='"+AccessCode+"' WHERE `userId` = '"+UserId+"'");
}