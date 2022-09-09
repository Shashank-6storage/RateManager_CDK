const { sign, verify } = require("jsonwebtoken");
const cookiePraser = require("cookie-parser");
require("dotenv").config();



export const createToken = (username : any) => {
    const token = sign(
        {username: username},
        process.env.ACCESS_TOKEN_SECRET
    );
    return token;
}


