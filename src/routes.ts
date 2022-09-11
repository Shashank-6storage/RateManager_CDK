import express from "express";

const routes = express.Router({
    mergeParams: true
});

routes.post('/', (req, res) => {
    console.log(`....................................................................`);
    res.status(200).json({
        "message": "success"
    })
});

module.exports = {
    routes
}