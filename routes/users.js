var express = require('express');
var router = express.Router();
const user = require('../app/controllers/user.controller');

router.get('/',(req,res)=>{
    res.render('index',{title:'users',page:'user/index'});
})
router.get('/signup',(req,res)=>{
    res.render('index',{title:'signup',page:'user/signup'});
})
router.get('/signin',(req,res)=>{
    res.render('index',{title:'signin',page:'user/signin'});
})
router.get('/otp',(req,res)=>{
    res.render('index',{title:'otp',page:'user/otpForm'});
});
router.get('/forgotPassword',(req,res)=>{
    res.render('index',{title:'forgot password',page:'user/forgot',email:true});
});
router.post('/forgotPassword',user.forgotPassword);
router.get('/profile',user.profile);
router.get('/signout',user.signout);
router.post('/signin', user.signin);
router.post('/otpVerify',user.otpVerify);
router.post('/signup', user.signup);
router.post('/updateProfile', user.update);


/* api routers */
router.get('/api',user.getAll);
router.get('/api/get/:id',user.getAll);
router.get('/api/getAddress/:user_id',user.getAddress);
router.post('/api/signin', user.signin);
router.get('/api/signout', user.signout);
router.post('/api/signup', user.signup);
router.post('/api/addAddress', user.addAddress);
router.put('/api/:id', user.update);
router.delete('/api/:id', user.delete);

module.exports = router;
