const User = require("../model/User");
const Address = require("../model/Address");
const helper = require('../helper');

exports.profile = (req, res) => {
  Address.findOne({ user_id: req.session._id }).exec((err, data) => {
    res.render('index', { title: "profile", page: 'user/profile', data: data});
  });
};
exports.signout = (req, res) => {
  if (req.url === "/signout") res.locals.user = null;
  req.session.user = null;
  res.redirect("/");
};
exports.signup = (req, res) => {
  var data = {
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    password: req.body.password,
  };
  req.session.signup = data;
  User.findOne({email:req.body.email},)
  .exec((err,data)=>{
    if (req.url === "/signup") {
      if (data) {
        req.flash("message", "Email or Mobile no is alrady registered!");
        req.flash("type", "error");
        res.redirect("/user/signup");
      } else {
        req.session.otp  =  helper.otp();
        let toMail = req.session.signup.email;
        let subject = 'CityCourier OTP- '+req.session.otp;
        let message = `Your OTP is ${req.session.otp} and its valid for upto 5 minutes.`
        helper.sendMail(toMail, subject, message)
        res.redirect("/user/otp");
      }
    } else res.json(data);
  });
};
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password }).exec(
    (err, data) => {
      if (req.url === "/signin") {
        if (data !== null) {
          req.session.user = data;
          res.locals.user = req.session.user;
          req.flash("message", ` welcome ${req.session.user.name}`);
          req.flash("type", "success");
          res.redirect("/");
        } else {
          req.flash("message", "username and password not matched!");
          req.flash("type", "error");
          res.redirect("/user/signin");
        }
      } else res.json(data);
    }
  );
};
exports.delete = (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
    res.json(data);
  });
};
exports.update = (req, res) => {
  var data = new Object();
  if (req.body.name) data.name = req.body.name;
  if (req.body.password) data.password = req.body.password;
  if (req.body.email) data.email = req.body.email;
  if (req.body.mobile) data.mobile = req.body.mobile;
  User.findByIdAndUpdate({ _id: req.params.id }, data, (err, data) => {
    res.json(data);
  });
};
exports.getAll = (req, res) => {
  User.find(req.params.id ? { _id: req.params.id } : {}, (err, data) => {
    res.json(data);
  });
};
exports.addAddress = (req, res) => {
  let data = {
    user_id: req.body.user_id,
    houseno: req.body.houseno,
    district: req.body.district,
    area: req.body.area,
    city: req.body.city,
    zip: req.body.zip,
    landmark: req.body.landmark,
    state: req.body.state,
  };
  var address = new Address(data);
  address.save((err, data) => {
    res.json(data);
  });
};

exports.getAddress = (req, res) => {
  Address.findOne({ user_id: req.params.user_id }).exec((err, data) => {
    res.json(data);
  });
};
exports.otpVerify = (req,res)=>{
   if(req.body.otp === req.session.otp)
   {
     let user = new User(req.session.signup);
     user.save((err,data)=>{
       req.session.signup = null;
       req.session.otp = null;
       if(data)
       {
         req.flash('message','New User created successfully');
         req.flash('type','success');
         res.redirect('/user/signin');
       }
     })
   }
   else
   {
    req.flash('message','OTP not matched!');
    req.flash('type','error');
    res.redirect('back');
   }

}
exports.forgotPassword = (req,res)=>{
  if(req.body.email)
  {
    User.findOne({email:req.body.email})
    .exec((err,data)=>{
      if(!data)
      {
        req.flash('message',"this email is invalid or not register!")
        req.flash('type','error');
        res.redirect('back');
      }
      else{
        req.session.email = req.body.email;
    req.session.otp  =  helper.otp();
    let toMail = req.session.email;
    let subject = 'CityCourier OTP- '+req.session.otp;
    let message = `Your OTP is ${req.session.otp} and its valid for upto 5 minutes.`
    helper.sendMail(toMail, subject, message)
  res.render('index',{title:'forgot password',page:'user/forgot',email:false});
      }
    })
  }
  else
  {
    if((req.session.otp === req.body.otp))
    {
      if(req.body.password === req.body.confirmPassword)
      {
      User.findOneAndUpdate({email: req.session.email},{password:req.body.password})
      .exec((err,data)=>{
        req.flash('message',"Password changed please login with new password")
        req.flash('type','success');
        res.redirect('/user/signin');
      })
      }
      else{
      req.flash('message',"Password not matched!")
      req.flash('type','error');
      res.render('index',{title:'forgot password',page:'user/forgot',email:false});
    }
  }
    else{
      req.flash('message',"OTP not matched!")
        req.flash('type','error');
        res.render('index',{title:'forgot password',page:'user/forgot',email:false});   
    }
  }
}