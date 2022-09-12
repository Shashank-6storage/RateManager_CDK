import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from '../schema/index';
import { createConnection } from "typeorm";
import { storageIdentity, Unit } from "../schema/entities/StorageUnit";
import { Lease } from "../schema/entities/StorageLease";
import { Tenant, Users } from "../schema/entities/User";
import { Hook } from "../hook/Hook";
const serverless = require('serverless-http');

import { Rules, RulesAmplify, RulesCompound, RulesEvalution } from "../schema/entities/Rules";

const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", graphqlHTTP({
  schema: schema,
  graphiql: true
}));


app.use("/rm", graphqlHTTP({
  schema: schema,
  graphiql: true
}));

if (process.env.SERVER_ENV == 'lambda') {
  try {
    createConnection({
      type: "mysql",
      database: "RateManager",
      host: "ratemanager.ckjoribouy2a.ap-south-1.rds.amazonaws.com",
      port: 3306,
      username: "admin",
      password: "8832!2#Zd6pB",
      logging: true,
      synchronize: false,
      entities: [Rules, RulesEvalution, Unit, Lease, storageIdentity, Users, Tenant]
    });

    module.exports.handler = serverless(app);
  }
  catch (err) {
    console.error(`Error occured with the connection: ${err}`);
  }
}
else {
  createConnection({
    type: "mysql",
    database: "RateManager",
    host: "ratemanager.ckjoribouy2a.ap-south-1.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "8832!2#Zd6pB",
    logging: true,
    synchronize: false,
    entities: [Rules, RulesEvalution, Unit, Lease, storageIdentity, Users, Tenant]
  });

  app.listen(4000, () => {
    console.log(`connected on port: 4000`);
  });

}