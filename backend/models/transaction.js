const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    medicine:{type:mongoose.Schema.Types.ObjectId, ref:"Medicine", required:true},
    pharmacist:{type:mongoose.Schema.Types.ObjectId, ref:"Pharmacist"},
    userName:{type:String, required:true},
    userEmail:{type:String, required:true},
    userContact:{type:String},
    quantity:{type:Number, required:true},
    date:{type:Date, default:Date.now}
});
module.exports = mongoose.model("Transaction", transactionSchema);