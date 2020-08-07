const mongoose = require('mongoose');
const StatusSchema = new mongoose.Schema({
    courier_id: {type:mongoose.Schema.Types.ObjectId,
        ref: 'Couriers',
        required: true
    },
    status: [
        {
        cancled:{type: Date},
        orderd: {type: Date},
        pickuped: {type: Date},
        outfordelivery: {type: Date},
        deliverd: {type: Date}
        }
    ],
    messages:{type: mongoose.Schema.Types.Mixed},
},{timestamps:true})

module.exports = mongoose.model("Status",StatusSchema);