const express = require("express");
const Medicine = require("../models/medicine");

const router = express.Router();

router.post("/", async(req, res) => {
    try{
        const newMed = new Medicine(req.body);
        const saveMed = await newMed.save();
        res.status(201).json(saveMed);
    } catch (err) {
        res.status(400).json({error: err.message});

    }
});

router.get("/", async (req, res) => {
    try {
        const meds = await Medicine.find();
        res.json(meds);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

router.put("/:id", async (req, res) =>{
    try{
        const updateMed = await Medicine.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updateMed);
    } catch (err){
        res.status(400).json({error: err.message});
    }
});

router.delete("/:id", async (req, res) =>{
    try{
        await Medicine.findByIdAndDelete(req.params.id);
        res.json({message:"Medicine deleted"});
    } catch (err){
        res.status(500).json({error:err.message});
    }
});

module.exports = router;
