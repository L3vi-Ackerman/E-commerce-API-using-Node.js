const router = require('express').Router();
const {verifyToken,verifyTokenAndAuthorization} = require('./verifyToken');
router.put('/:id', verifyTokenAndAuthorization,(req,res)=>{
    
})


module.exports = router;