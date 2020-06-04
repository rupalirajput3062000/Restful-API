const express = require("express");
const routes = express.Router();


routes.get("/",(req,res,next)=>{
    res.status(200).send({
        message:"Products with get method"
    });
});
routes.post("/",(req,res,next)=>{
    const name = req.body.name;
    const course = req.body.course;

    res.status(200).send({
        message:"Products with post method",
        name:name,
        course:course
    });
});
routes.get("/:id",(req,res,next)=>{
    const id = req.params.id;
    res.status(200).send({
        message:"Products with id method",
        id:id
    });
});
routes.delete("/",(req,res,next)=>{
    res.status(200).send({
        message:"Products with delete method"
    });
});

module.exports = routes;