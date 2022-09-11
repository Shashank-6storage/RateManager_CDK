//import { ApolloServer, gql } from 'apollo-server-lambda';
import * as awsserverlessexpress from 'aws-serverless-express';
import { createConnection, getConnectionManager } from "typeorm";
import { Rules, RulesAmplify, RulesCompound, RulesEvalution } from "../schema/entities/Rules";
import { storageIdentity, Unit } from "../schema/entities/StorageUnit";
import { Lease } from "../schema/entities/StorageLease";
import { Tenant, Users } from "../schema/entities/User";
const app = require('../index');

const server =  awsserverlessexpress.createServer(app);

exports.handler = async (event: any, context: any) => {
  try{
    
    //await createDbConnection();
    awsserverlessexpress.proxy(server, event, context);
    //await terminateDbConnection();
  }
  catch(error){
    console.error()
  }
};

async function createDbConnection() {

  try {
    await createConnection({
      type: "mysql",
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: (process.env.DB_PORT) ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      logging: true,
      synchronize: false,
      entities: [Rules, RulesEvalution, Unit, Lease, storageIdentity, Users, Tenant]
    });

    console.log('DB connection created');
  }
  catch (error) {
    console.error(`Failed to connect to database with the exception: ${error}`);
  }
}

async function terminateDbConnection() {

  const conn = await getConnectionManager().get();
  if (conn.isConnected) {
    conn
      .close()
      .then(() => {
        console.log('DB connection closed');
      })
      .catch((err: any) => {
        console.error('Error closing conn to DB, ', err);
      });
  } else {
    console.log('DB conn already closed.');
  }
}
