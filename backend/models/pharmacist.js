const mongoose = require("mongoose");

const pharmacistSchema = new mongoose.Schema({
    username:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    email:{type:String, required:true, unique:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"Admin"}
});
module.exports = mongoose.model("Pharmacist", pharmacistSchema);