const mongoose = require('mongoose');


const ProductsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    }
});

const Products = mongoose.model('product',ProductsSchema);

module.exports = Products;