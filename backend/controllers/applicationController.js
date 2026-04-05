import Application from "../models/Application.js";
import Project from "../models/Project.js";

export const applyToProject = async (req, res) => {
    try {
        const { projectId , proposal } = req.body

        const existingApplication = await Application.findOne({
            projectId, 
            freelancerId: req.user
        })

        if(existingApplication){
            return res.status(400).json({
                message: "you have already applied to this project"
            })
        }

        const application = await Application.create({
            projectId,
            freelancerId: req.user,
            proposal
        })

        res.status(201).json(application)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const getApplicationsForProject = async (req, res) => {
    try {
        const applications = await Application.find({ projectId: req.params.id }).populate("freelancerId", "name email skills")
        res.json(applications)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getMyApplications = async (req, res) => {
    try {
        const myApplications = await Application.find({
            freelancerId: req.user
        }).populate("projectId", "title budget deadline description")

        res.json(myApplications)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const targetApplication = await Application.findById(req.params.id)

        if(!targetApplication){
            return res.status(404).json({
                message: "Application not found"
            })
        }

        Object.assign(targetApplication, req.body)

        await targetApplication.save()

        if(req.body.status === "accepted"){
            const project = await Project.findById(targetApplication.projectId)

            if(!project){
                return res.status(404).json({
                    message: "Project not found"
                })
            }

            project.assignedFreelancer = targetApplication.freelancerId
            project.status = "in-progress"

            await project.save()
        }

        res.status(200).json({
            success: true,
            application: targetApplication
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}