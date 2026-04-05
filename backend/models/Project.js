import mongoose from "mongoose";

const projectSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    skillsRequired: {
        type: [String],
        default: []
    },
    deadline: {
        type: Date
    },
    clientId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    status: {
        type: String,
        default: "open"
    },
    assignedFreelancer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

projectSchema.index({ title: "text", description: "text" })

const Project = mongoose.model("Project", projectSchema)
export default Project
