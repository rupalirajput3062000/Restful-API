const express = require("express");
const routes = express.Router();

routes.get("/",(req,res,next)=>{
    res.status(200).send({
        message:"Orders with get method"
    });
});
routes.post("/",(req,res,next)=>{
    res.status(200).send({
        message:"Orders with post method"
    });
});
routes.get("/:id",(req,res,next)=>{
    const id = req.params.id;
    res.status(200).send({
        message:"Orders with id method",
        id:id
    });
});
routes.delete("/",(req,res,next)=>{
    res.status(200).send({
        message:"Orders with delete method"
    });
});
routes.patch("/",(req,res,next)=>{
    res.status(200).send({
        message:"Orders with patch method"
    });
});

module.exports = routes;