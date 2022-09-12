import { storageIdentity, Unit } from "../schema/entities/StorageUnit";
import { Lease } from "../schema/entities/StorageLease";
import { Tenant, Users } from "../schema/entities/User";
import { Rules, RulesAmplify, RulesCompound, RulesEvalution } from "../schema/entities/Rules";
import { createConnection } from "typeorm";

export const createDBConnection = () => {
    try{
        createConnection({
            type: "mysql",
            database: (process.env.DB_NAME) ? process.env.DB_NAME : "RateManager",
            host: (process.env.DB_HOST) ? process.env.DB_HOST : "ratemanager.ckjoribouy2a.ap-south-1.rds.amazonaws.com",
            port: (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) :3306,
            username: (process.env.DB_USERNAME) ? (process.env.DB_USERNAME) :"admin",
            password: (process.env.DB_PASSWORD) ? Buffer.from(process.env.DB_PASSWORD, 'base64').toString('utf8') : '',
            logging: true,
            synchronize: false,
            entities: [Rules, RulesEvalution, Unit, Lease, storageIdentity, Users, Tenant]
          });
    }
    catch(err){
        console.error(`Error while establishing a database connection: ${err}`);
    }
}