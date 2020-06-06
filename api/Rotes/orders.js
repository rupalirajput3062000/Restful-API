const express = require("express");
const routes = express.Router();
const Orders = require("../Models/orders")
const Products = require("../Models/product")



routes.get("/",(req,res,next)=>{
    Orders.find()
    .select("productId id quantity")
    .populate('product','name price')
    .then(docs => res.status(200).json(docs))
    .catch(err => res.status(404).json(err))
});
routes.post("/",(req,res,next)=>{
    Products.findById(req.body.productId)
    .then(product => {
        if(!product)
        {
            return(
                res.status(400).json({
                    message:"Product not found"
                })
            )
        }

        const NewOrder = new Orders({
            product:req.body.productId,
            quantity:req.body.quantity
        })
        NewOrder.save()
        .then(result => res.status(201).send("Successfully save to Orders database") )
        .catch(err => console.log(err))
        
    })
    .catch(error => res.status(500).json(error))

    
});
routes.get("/:id",(req,res,next)=>{
    const id = req.params.id;
    Orders.findById(id)
    .select("productId id quantity")
    .populate('product','name price')
    .then(result => {
        if(result===null){
           res.status(404).json({
               message:{
                   status:"Not found",
                type:"GET",
                url:"http://localhost:3000/orders"
            }
           })
        }
        res.status(200).json({
        order:result,
        message:{
            type:"GET",
            url:"http://localhost:3000/orders"
        }
    })})
    .catch(err => res.status(404).json({
        message:"Not found"
    }))
    
});
routes.delete("/:id",(req,res,next)=>{
    const id = req.params.id;
    Orders.findByIdAndRemove(id)
    .then(result => {
        if(result===null){
           res.status(404).json({
               message:{
                   status:"Not found",
                type:"POST",
                url:"http://localhost:3000/orders",
                body:{
                    productId : "id",
                    quantity:"Number"
                }
            }
           })
        }
        res.status(200).json({
        message:{
            status:"Successfully deleted",
            type:"POST",
            url:"http://localhost:3000/orders",
            body:{
                productId : "id",
                quantity:"Number"
            }
        }
    })})
    .catch(err => res.status(404).json({
        message:"Not found"
    }))
});


module.exports = routes;