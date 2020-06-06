const express = require("express");
const routes = express.Router();
const Products = require("../Models/product");
const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req, file , cb) =>{
        cb(null , 'uploads');
    },
    filename : (req, file , cb) =>{
        cb(null, new Date().getTime() + file.originalname)
    }
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload = multer({storage ,limits:{
    fileSize:1024*1024*5
},
   fileFilter:fileFilter

})
routes.get("/",(req,res,next)=>{
    Products.find()
    .select('name price id productImage')
    .exec()
    .then(docs => {
        const response = {
            count:docs.length,
            products:docs.map(doc=>{
                return{
                    name:doc.name,
                    price:doc.price,
                    id:doc.id,
                    productImage:doc.productImage,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/products/"+doc.id
                    } 
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
});
});
routes.post("/",upload.single('productImage'),(req,res,next)=>{

    const product = new Products ({
        name : req.body.name,
        price : (Number) (req.body.price),
        productImage:req.file.path
    });
    product.save((err,result)=>{
        if(!err){
        console.log("Successfully save to databste  " )
        res.status(200).json(product);}
        else{
            console.log("Error occured :::: " + err);
            res.status(500).json(err);
        }
    })


});
routes.patch("/:id",(req,res,next)=>{
    const id = req.params.id;
    const updatedProduct = {};
    for(const ops of req.body){
        updatedProduct[ops.propName] = ops.value
    }
    Products.findByIdAndUpdate(id ,{$set: updatedProduct})
    .exec()
    .then(result => res.send("Successfully Updated data at id : "+id))
    .catch(error => res.send("Error in Updating data at id : "+id))
});
routes.get("/:id",(req,res,next)=>{
    const id = req.params.id;
    Products.findById(id)
    .select('name price id productImage')
    .exec()
    .then(result => res.json(result))
    .catch(error => res.json(error))
});
routes.delete("/:id",(req,res,next)=>{
    const id = req.params.id;
    Products.findByIdAndRemove(id)
    .exec()
    .then(result => res.send("Successfully Deleted data at id : "+id))
    .catch(error => res.send("Error in Deleting data at id : "+id))
});

module.exports = routes;