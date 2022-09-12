import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from './schema/index';
const bodyParser = require('body-parser');

 const app = express();
    app.use(cors());
    app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        "message": "hello"
    })
});

app.get("/rm", (req, res) => {
    res.json({
        "message": "hello"
    })
});

module.exports = app;