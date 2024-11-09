const router = require('express').Router();
const Product = require('../models/Product'); 
const {verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('./verifyToken');

// upload product
router.post('/',verifyTokenAndAdmin, async(req,res)=>{
    const newProduct = new Product(req.body);
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json({error: err})
    }
})
// update the existing product
router.put('/:id',verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new:true}
        );
        res.status(200).json(udaptedProduct);
    }catch(err){
        res.status(500).json({error: err});
    }
});

// delete the existing product
router.delete('/:id',verifyTokenAndAdmin, async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Product has been deleted Successfully!"});
    } catch (err) {
        res.status(500).json({error: err});
    }
});
// find product by id
router.get("find/:id",async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({error: err})
    }
});
// get all products
router.get("")
module.exports = router;