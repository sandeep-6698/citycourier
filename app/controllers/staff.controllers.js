const Staff = require('../model/Staff');

exports.signup = (req,res)=>{
	var data = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        type: req.body.type
    }
    var staff =   new Staff(data);
    let result = user.save((err,data)=>{
    	 res.json(data);
    });   
}
exports.signin = (req,res)=>{
	 Staff.find({email: req.body.email},(err,data)=>{
	 	if(data[0].password === req.body.password)
		res.json(data);
		else
			res.json([]);
		})
}
exports.delete = (req,res)=>{
	Staff.findByIdAndDelete({_id:req.params.id},(err,data)=>{
		res.json(data)
	})
}
exports.update = (req,res)=>{

	var data = new Object();
		if(req.body.name)
			data.name = req.body.name;
		if(req.body.password)
			data.password = req.body.password;
		if(req.body.email)
			data.email = req.body.email;
		if(req.body.mobile)
            data.mobile = req.body.mobile;
        	data.email = req.body.email;
		if(req.body.type)
			data.mobile = req.body.type
            Staff.findByIdAndUpdate({_id: req.params.id},data,(err,data)=>{
	res.json(data);	
  })
}
exports.getAll = (req,res)=>{
    Staff.find(req.params.id?{_id: req.params.id}:{},(err,data)=>{
	res.json(data);		
})
exports.verify = (req,res)=>{
	res.json("Pending");
}

}