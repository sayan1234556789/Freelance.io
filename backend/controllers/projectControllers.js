import Application from "../models/Application.js";
import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const {title, description, budget, skillsRequired, deadline } = req.body

        const project = await Project.create({
            title,
            description,
            budget,
            skillsRequired,
            deadline,
            clientId: req.user
        })

        res.json(project)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


export const getprojects = async (req, res) => {
    try {
        const { search, skills, minBudget, maxBudget, page = 1, limit = 5 } = req.query

        const query = {}

        if(search){
            query.$or = [
                {title: { $regex: search, $options: "i" }},
                {description: { $regex: search, $options: "i" }}
            ];
        }

        if(skills){
            const skillsArray = skills
                .split(",")
                .map((e) => e.trim())
                .filter(e => e.length > 0)

            query.skillsRequired = { $in: skillsArray }
        }

        if(minBudget || maxBudget){
            query.budget = {}
            if(minBudget){
                query.budget.$gte = Number(minBudget);
            }
            if(maxBudget){
                query.budget.$lte = Number(maxBudget);
            }
        }

        const skip = (page - 1) * limit

        const projects = await Project.find(query)
            .populate("clientId", "name email")
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 })
        
        const totalCount = await Project.countDocuments(query)

        res.json({
            totalCount,
            page: Number(page),
            totalPages: Math.ceil(totalCount/limit),
            projects
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        .populate("clientId", "name email")

        if(!project){
            res.status(404).json({
                message: "project not found"
            })
        }
        res.json(project)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if(!project){
            return res.status(404).json({
                message: "project not found"
            })
        }
        
        if(project.clientId.toString() !== req.user){
            res.status(403).json({
                message: "not authorized!"
            })
        }

        Object.assign(project, req.body)

        const updatedProject = await project.save();

        res.json(updatedProject)
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)

        if(!project){
            return res.status(404).json({
                message: "project not found"
            })
        }

        await project.deleteOne()

        res.json({
            message: "project deleted"
        })

    } catch (error) {
        console.log(error.message)
    }
}

export const getMyProjects = async ( req, res ) => {
    try {
        const userId = req.user

        const projects = await Project.find({clientId: userId})
            .sort({ createdAt: -1 })

        const projectIds = projects.map((e) => e._id)

        const applications = await Application.find({
            projectId: {$in: projectIds}
        }).populate("freelancerId", "name email")

        const projectsWithApplications = projects.map((project) => {
            const projectApplications = applications.filter((app) => (
                app.projectId.toString() === project._id.toString()
            ))

            return {
                ...project.toObject(),
                applications: projectApplications
            }
        })
        
        res.status(200).json({
            success: true,
            count: projectsWithApplications.length,
            projects: projectsWithApplications
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}