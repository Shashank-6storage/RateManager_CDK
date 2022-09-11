import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from './schema/index';
const bodyParser = require('body-parser');
const {
    routes: gqlroutes
} = require('./routes');

 const app = express();
    app.use(cors());
    app.use(bodyParser.json());

app.use("/", gqlroutes);

module.exports = app;