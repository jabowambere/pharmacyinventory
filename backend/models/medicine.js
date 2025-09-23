const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    }
}, {timestamps: true});
module.exports = mongoose.model("Medicine", medicineSchema);