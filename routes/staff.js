var express = require('express');
var router = express.Router();
const staff = require('../app/controllers/staff.controllers');


/* api routers */
router.get('/api/',staff.getAll);
router.get('/api/get/:id',staff.getAll);
router.get('/api/signin', staff.signin);
router.post('/api/signup', staff.signup);
router.post('/api/verify', staff.verify);
router.put('/api/:id', staff.update);
router.delete('/api/:id', staff.delete);

module.exports = router;
