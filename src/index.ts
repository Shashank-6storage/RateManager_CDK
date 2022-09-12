import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from './schema/index';
const bodyParser = require('body-parser');

 const app = express();
    app.use(cors());
    app.use(bodyParser.json());

app.post("/", graphqlHTTP({
    schema,
    graphiql: true
}));


app.post("/rm", graphqlHTTP({
    schema,
    graphiql: true
}));


module.exports = app;