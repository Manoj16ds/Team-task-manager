const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

    try {

        const task = await Task.create(req.body);

        res.status(201).json(task);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});


// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "name");

        res.json(tasks);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});


// GET TASKS BY PROJECT
router.get("/project/:projectId", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find({
            project: req.params.projectId
        })
        .populate("assignedTo", "name email")
        .populate("project", "name");

        res.json(tasks);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task deleted successfully"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;