//import { ApolloServer, gql } from 'apollo-server-lambda';
import * as awsserverlessexpress from 'aws-serverless-express';
import { Any, createConnection, getConnectionManager } from "typeorm";
import { Rules, RulesAmplify, RulesCompound, RulesEvalution } from "../schema/entities/Rules";
import { storageIdentity, Unit } from "../schema/entities/StorageUnit";
import { Lease } from "../schema/entities/StorageLease";
import { Tenant, Users } from "../schema/entities/User";
import { graphqlHTTP } from "express-graphql";
import { schema } from '../schema/index';
const app = require('../index');
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const serverless = require('serverless-http');

//const server =  awsserverlessexpress.createServer(app);

// exports.handler = async (event: any, context: any) => {
//   try{
    
//     await createDbConnection();
//     app.post("/rm", graphqlHTTP({
//       schema,
//       graphiql: true
//   }));
//     awsserverlessexpress.proxy(server, event, context);
//     await terminateDbConnection();
//   }
//   catch(error){
//     console.error()
//   }
// };

module.exports.handler = async (event: any, context: any, callback: any) =>  graphql(schema, event.queryStringParameters.query).then(
  callback(null, {statusCode: 200, body: JSON.stringify('success')}),
    //err => callback(err)
)

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
