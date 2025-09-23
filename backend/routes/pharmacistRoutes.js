const express = require("express");
const Pharmacist = require("../models/pharmacist");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/", async(req, res) =>{
    try{
        const {username, email, password, createdBy} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newPharmacist = new Pharmacist({username, email, password: hashedPassword, createdBy});
        const savedPharmacist = await newPharmacist.save();
        res.status(201).json(savedPharmacist);
    } catch(err){
        res.status(400).json({error:err.message});
    }
});

router.get("/", async(req, res) => {
    try{
        const pharmacists = await Pharmacist.find().select("-password").populate("createdBy", "username email");
        res.json(pharmacists);
    } catch (err){
        res.status(500).json({error:err.message});
    }
});

router.put("/:id", async (req, res) => {
      try{
        const {username, email, password} = req.body;
        let updateData = {username, email};

        if(password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedPharmacist = await Pharmacist.findByIdAndUpdate(req.params.id, updateData,{new: true});
        res.json(updatedPharmacist);
      } catch(err){
        res.status(400).json({error:err.message});
      }
});

router.delete("/:id", async(req, res) => {
    try{
        await Pharmacist.findByIdAndDelete(req.params.id);
        res.json({message:"Pharmacist deleted"});
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

module.exports = router;