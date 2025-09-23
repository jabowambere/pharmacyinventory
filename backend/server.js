const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const medicineRoutes = require("./routes/medicineRoutes");
const adminRoutes = require("./routes/adminRoutes");
const pharmacistRoutes = require("./routes/pharmacistRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use('/medicines', medicineRoutes);
app.use("/admins", adminRoutes);
app.use("/pharmacists", pharmacistRoutes);
app.get("/", (req, res) =>{
    res.send("Hello Pharmacy");
});

mongoose.connect("mongodb://127.0.0.1:27017/pharmacy",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB connection:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});