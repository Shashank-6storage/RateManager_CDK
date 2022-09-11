import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from './schema/index';

 const app = express();
    app.use(cors())
    app.use(express.json())
    app.post("/", graphqlHTTP({
        schema,
        graphiql: true
    }));

module.exports = app;