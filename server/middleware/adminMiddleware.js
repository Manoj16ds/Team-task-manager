const Project = require("../models/Project");

const adminMiddleware = async (req, res, next) => {

    try {

        const project = await Project.findById(req.params.projectId);

        if(!project){
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if(project.admin.toString() !== req.user.id){

            return res.status(403).json({
                message: "Access denied. Admin only."
            });
        }

        next();

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = adminMiddleware;