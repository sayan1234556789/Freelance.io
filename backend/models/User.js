import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["freelancer", "client"],
        default: "freelancer"
    },
    bio: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    }
}, {timeStamps : true})

const User = mongoose.model("User", userSchema)
export default User