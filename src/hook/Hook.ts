import { LeaseInfo, unitIdentity, UnitInfo, userContract } from "./Movein";
import { tenantCreate, tenantUpdate } from "./Tenant";


export const Hook = (data: any) => {

    if(data.EventCode === "MOVEIN"){
        LeaseInfo(data.EventData[0]);
        UnitInfo(data.EventData[0]);        
        unitIdentity(data.EventData[0]);
        userContract(data);
        tenantCreate(data.EventData[0].Tenant);
    }

    if(data.EventCode === "USER_CREATED"){
        // tenantCreate(data.EventData);
    }

    if(data.EventCode === "USER_UPDATED"){
        // tenantUpdate(data.EventData);
    }
    
}
