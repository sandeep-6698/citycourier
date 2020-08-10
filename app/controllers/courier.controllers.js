const mongoose = require('mongoose');
const Courier = require('../model/Courier');
const Status = require('../model/Status');
const helper  = require('../helper');
const script = require('./script')
const ObjectId = mongoose.Types.ObjectId;
const stripe = require('stripe')('sk_test_51HBZOxDIoJphelYv9NFkRgwDKko4wyjtfBnIU0VkheZOLRPFt35HlzTYfJOxn3T1uCu1CdSv1N6q1D4XvgbZh3sP00ZiGzkIKR') 
exports.getAll = (req,res)=>{
    Courier.find({user_id: req.params.user_id})
    .exec((err,data)=>{
        res.json(data);
    })
    }
exports.getStatus = (req,res)=>{
    Status.find(req.params.id?{_id: req.params.id}:{},(err,data)=>{
        res.json(data);
    })
}
exports.add = (req,res)=>{
    let data = {
    _id: new mongoose.Types.ObjectId(),
    user_id: req.body.user_id,
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    weight: req.body.weight,
    itemHeight:req.body.itemHeight,
    itemWidth: req.body.itemWidth,
    from: req.body.from,
    to: {
      name: req.body.toName,
      mobile:req.body.toMobile,
      address:req.body.toAddress,
        }
    }
    new Courier(data).save((err,data)=>{
        if(req.url === '/add')
        {
            //console.log(data._id);
            var status = new Status({
                courier_id: data._id,
                status:{
                    orderd: Date.now()
                }
              
            })
            status.save((err,data)=>{
                console.log(data);
                if(!err)
                res.redirect('/track');
            })
        } 
        else
        res.json(data);
    })
}
exports.cancle = (req,res) => {
Status.findByIdAndUpdate({_id:req.params.id},{cancled: true},(err,data)=>{
    res.json(true);
});
}
exports.addStatus = (req,res)=>{
    console.log(req.body.status[0])
    let data = {
    courier_id: req.body.courier_id,
       status:{
           orderd:req.body.status[0]
       },
        messages: req.body.messages
    }
    let status = new Status(data);
    status.save((err,data)=>{
        res.json(data);
    })
}
exports.updateStatus = (req,res) => {

    let data = {
        $push:{
            status:{
                orderd:Date()
            }
        }
    }
    Status.findByIdAndUpdate({_id:req.params.id},{data},(err,data)=>{
        res.json(data);
    });

    }
    exports.payment = (req,res)=>{
        stripe.customers.create({ 
            email: req.body.stripeEmail, 
            source: req.body.stripeToken, 
            name: 'Sandeep', 
            address: { 
                line1: '240', 
                postal_code: '335523', 
                city: 'Nohar', 
                state: 'Rajasthan', 
                country: 'India', 
            } 
        }) 
        .then((customer) => { 
      
            return stripe.charges.create({ 
                amount: 100, 
                description: 'Testing', 
                currency: 'INR', 
                customer: customer.id 
            }); 
        }) 
        .then((charge) => { 
            res.send("Success")  // If no error occurs 
        }) 
        .catch((err) => { 
            res.send(err)       // If some error occurs 
        }); 
    }
    exports.summery = (req,res)=>{
    //     Status.find({})
    //     .populate('courier_id','','Courier')
    //     .then((data)=>{
    //         //var user_id = data.map(data => data.courier_id.user_id)
    //         //data = data.filter( (data,index,user_id) => user_id[index] === req.session.user.user_id)
    //         //    orderd =  data.map(data => data.status.map(status => helper.getDate(status.orderd)))
    //        console.log(data);
    //        //res.render('index',{title:'summery',page:'courier/summery',data:data, script: script})
    //    })
    //    .catch((err)=>{
    //     console.log(err)
    //    })
    Status.aggregate([{
        $lookup:{
            from:'couriers',
            as: 'courier',
            localField: 'courier_id',
            foreignField : '_id'            
        }
    },
    {$unwind: "$courier"},
    { $match: { "courier.user_id": ObjectId(req.session.user._id) } }
]).exec((err,data)=>{
    res.render('index',{title:'summery',page:'courier/summery',data:data, script: script})
    })

    }