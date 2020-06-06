const mongoose = require('mongoose');


const OrdersSchema = mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
});

const Orders = mongoose.model('orders',OrdersSchema);

module.exports = Orders;