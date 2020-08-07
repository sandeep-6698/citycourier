var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index',{title:'homepage',page:'homepage'});
});
/* api routers */
router.get('/api/', function(req, res) {
  res.send("Homepage");
});

module.exports = router;
