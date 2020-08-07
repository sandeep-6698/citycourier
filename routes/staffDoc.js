var express = require('express');
var router = express.Router();

/* api routers */
router.get('/api/',(req,res)=>{
    res.send("Homepage");
})

module.exports = router;
