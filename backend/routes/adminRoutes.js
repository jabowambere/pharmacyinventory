const express = require("express");
const Admin = require("../models/admin");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/", async(req, res) => {
    try{
        const{username, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({username, email, password: hashedPassword});
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (err) {
        res.status(400).json({error:err.message});
    }
});

router.get("/", async (req, res) => {
    try{
        const admins = await Admin.find().select("-password");
        res.json(admins);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

router.put("/:id", async(req, res) => {
    try{
        const{username, email, password} = req.body;
        let updateData = {username, email};

    if (password){
        updateData.password = await bcrypt.hash(password, 10);
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, {new:true});
    res.json(updatedAdmin);
    } catch(err){
        res.status(400).json({error: err.message});
    }
});

router.delete("/:id", async (req, res) =>{
    try{
        await Admin.findByIdAndDelete(req.params.id);
    } catch (err){
        res.status(500).json({error:err.message});
    }
});
module.exports = router;