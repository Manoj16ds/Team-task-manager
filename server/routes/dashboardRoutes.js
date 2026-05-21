const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {

    try {

        const totalTasks = await Task.countDocuments();

        const todoTasks = await Task.countDocuments({
            status: "To Do"
        });

        const inProgressTasks = await Task.countDocuments({
            status: "In Progress"
        });

        const doneTasks = await Task.countDocuments({
            status: "Done"
        });

        const overdueTasks = await Task.countDocuments({
            dueDate: { $lt: new Date() },
            status: { $ne: "Done" }
        });

        const userTasks = await Task.aggregate([
            {
                $group: {
                    _id: "$assignedTo",
                    total: { $sum: 1 }
                }
            }
        ]);

        res.json({

            totalTasks,

            tasksByStatus: {
                todo: todoTasks,
                inProgress: inProgressTasks,
                done: doneTasks
            },

            overdueTasks,

            tasksPerUser: userTasks
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;