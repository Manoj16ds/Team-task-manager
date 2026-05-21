const express = require("express");

const Project = require("../models/Project");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const User = require("../models/User");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { name, description } = req.body;

        const project = await Project.create({

            name,
            description,

            admin: req.user.id,

            members: [req.user.id]
        });

        res.status(201).json(project);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/", authMiddleware, async (req, res) => {

    try {

        const projects = await Project.find({
            members: req.user.id
        })
        .populate("admin", "name email")
        .populate("members", "name email");

        res.json(projects);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});


router.put(
    "/:projectId/add-member",
    authMiddleware,
    adminMiddleware,

    async (req, res) => {

        try {

            const { email } = req.body;

            const user = await User.findOne({ email });

            if(!user){

                return res.status(404).json({
                    message: "User not found"
                });
            }

            const project = await Project.findById(req.params.projectId);

            if(project.members.includes(user._id)){

                return res.status(400).json({
                    message: "User already a member"
                });
            }

            project.members.push(user._id);

            await project.save();

            res.json({
                message: "Member added successfully",
                project
            });

        } catch(error){

            res.status(500).json({
                message: error.message
            });
        }
});

module.exports = router;