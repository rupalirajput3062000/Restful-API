const express = require('express');
const app = express();

const productsRoute = require('./api/Rotes/products')
const ordersRoute = require('./api/Rotes/orders')

app.use("/products" , productsRoute);
app.use("/orders" , ordersRoute);

app.use((req,res,next)=>{
    const error = new Error("Not found")
    res.status(404)
    next(error)
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })

});



module.exports = app