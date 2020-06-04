const express = require('express');
const app = express();

const productsRoute = require('./api/Rotes/products')
const ordersRoute = require('./api/Rotes/orders')

app.use("/products" , productsRoute);
app.use("/orders" , ordersRoute);


module.exports = app