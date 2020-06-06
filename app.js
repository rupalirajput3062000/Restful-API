const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/RestDB", { useNewUrlParser: true ,useUnifiedTopology: 
true  })
.then(res => console.log("Successfully Connected"))
.catch(err=> console.log("Error in Connecting"));


app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use('/uploads',express.static('uploads'));

const productsRoute = require('./api/Rotes/products')
const ordersRoute = require('./api/Rotes/orders')
const UsersRoute = require("./api/Rotes/user")

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods",'PUT,POST,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
})
app.use("/products" , productsRoute);
app.use("/orders" , ordersRoute);
app.use("/users" , UsersRoute);

//Error Handling
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