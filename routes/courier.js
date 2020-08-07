var express = require('express');
var router = express.Router();
const courier = require('../app/controllers/courier.controllers');

router.get('/',(req,res)=>{
    res.render('index',{title:'add courier',page:'courier/add'});
})
router.get('/payment',(req,res)=>{
    res.render('index',{title:'payment',page:'payment/index', key:'pk_test_51HBZOxDIoJphelYvBdwO3XYdbNq5znnMKURir6a6dnaskMSuPrqkCRAaItVPtLgyTLeQkPeVFCTGYUzXSFQzT2kv00eAljrMhK'});
})
router.get('/payment',courier.payment)
router.get('/summery',courier.summery)
router.post('/add',courier.add);

/* api routers */
router.get('/api/',courier.getAll);
router.get('/api/get/:user_id',courier.getAll);
router.get('/api/getStatus/:id?',courier.getStatus);
router.post('/api/add',courier.add);
router.post('/api/addStatus',courier.addStatus);
router.patch('/api/cancle/:id',courier.cancle);
router.patch('/api/updateStatus/:id',courier.updateStatus);

module.exports = router;
