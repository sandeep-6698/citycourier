const mongoose = require('mongoose');
const StaffDocsSchema = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: "Staffs", require:true},
    photo :{ type: String, required: true },
    id_type:{ type: String, required: true },
    id_file:{ type: String, required: true },
})
module.exports = mongoose.Model('StaffDoc',StaffDocsSchema)