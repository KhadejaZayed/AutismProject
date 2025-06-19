const Diary    = require('../Models/diaryModel');
const mongoose = require("mongoose");

exports.createDiaryEntry = async (req, res) => {
    try {
        const parentId = parseInt(req.user.id); // assuming JWT middleware adds user to request
        
        // Count how many diary entries the parent has
        const count = await Diary.countDocuments({ parent: parentId });
        
        const newEntry = new Diary({
            parent: parentId,
            content: req.body.content,
            day: count + 1
        });
        //console.log(newEntry);
        await newEntry.save();
        
        res.status(201).json({
            message: "Diary entry created successfully",
            diary: newEntry
        });

    } catch (err) {
        res.status(500).json({
            message: 'Failed to create diary entry',
            error: err.message,
        });
    }
};

// Get one diary with id
exports.getADiary = async (req, res) => {
    try{
        const diaryId = req.params.id;
        const parentId = parseInt(req.user.id);

        const diary = await Diary.findOne({ _id: diaryId, parent: parentId });

        if (!diary) {
            return res.status(404).json({ message: "Diary entry not found or not yours" });
        }

        res.status(200).json({
            message: "Diary entry fetched successfully",
            diary
        });

    }catch(err){
        res.status(500).json({
            message: "Failed to fetch diary entry",
            error: err.message
        });
    }
};


//get all diares
exports.getAllDiaries = async (req, res) => {
    try{
        const parentId = parseInt(req.user.id);
        
        const diaries = await Diary.find({ parent: parentId }).sort({ day: 1 });

        res.status(200).json({
            message: "Diary entries fetched successfully",
            diaries
        });
    }catch(err){
        res.status(500).json({
            message: 'Failed to fetch diary entries',
            error: err.message,
        });
    }
};


exports.updateDiaryEntry = async (req, res) => {
    try {
        const diaryId = req.params.id;
        const parentId = parseInt(req.user.id); // from JWT

        // Find the diary entry and make sure it belongs to this user
        const diary = await Diary.findOne({ _id: diaryId, parent: parentId });
        if (!diary) {
            return res.status(404).json({ message: "Diary entry not found or not authorized" });
        }

        //Update content
        diary.content = req.body.content || diary.content;

        await diary.save();

        res.status(200).json({
            message: "Diary entry has been updated Successfully",
            diary
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update diary entry",
            error: err.message
        });
    }
};


//Delete one diaru with its id
exports.deleteADiary = async (req, res) => {
    try{
        const diaryId = req.params.id;
        const parentId = parseInt(req.user.id);
        
        const deleted = await Diary.findOneAndDelete({ _id: diaryId, parent: parentId });

        if (!deleted) {
            return res.status(404).json({ message: "Diary entry not found or not yours" });
        }
        
        res.status(200).json({
            message: "Diary entry deleted successfully",
            diary: deleted
        });

    }catch(err){
        res.status(500).json({
            message: 'Failed to delete diary entry',
            error: err.message,
        });
    }
};


// Delete all diaries for a parent
exports.deleteAllDiaries = async (req, res) => {
    try {
        const parentId = parseInt(req.user.id);

        const result = await Diary.deleteMany({ parent: parentId });

        res.status(200).json({
            message: "All diary entries deleted",
            deletedCount: result.deletedCount
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to delete all diaries",
            error: err.message
        });
    }
};