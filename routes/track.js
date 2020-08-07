var express = require('express');
var router = express.Router();
const geolocation = require('geolocation');

router.get('/',(req,res)=>{
  res.render('index',{title:'track',page:'courier/track'});
})


/* api routers */
router.get('/api/', function(req, res) {
navigator.geolocation.getCurrentPosition((err,pos)=>{
  res.send(pos);
  });
});

module.exports = router;
