const router = require('express').Router();
const Cart = require('../models/Cart');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin}= require('./verifyToken');
router.post("/",verifyTokenAndAuthorization,async(req,res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch(err){
        res.status(500).json({error: err})
    }

})


router.put('/:id',verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,{
                $set: req.body
            },
            {new:true}
        );
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json({error: err})
    }
})

router.delete('/:id',verifyTokenAndAuthorization, async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Order removed from cart successfully!"});
    } catch (err) {
        res.status(500).json({error: err});
    }
})

router.get('/find/:userid',verifyTokenAndAuthorization,async (req,res)=>{
    try {
        const cart = await Card.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    try {
       const cartItems = await Cart.find();
       res.status(200).json(cartItems) ;
    } catch (err) {
        res.status(500).json({error: err});
    }
})
module.exports = router;