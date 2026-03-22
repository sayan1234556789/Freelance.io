import express from 'express'
import { loginUser, registerUser, verifyEmail } from '../controllers/authControllers.js'
import passport from '../config/passport.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/verify/:token", verifyEmail)

router.get("/google",
    passport.authenticate("google",{scope: ["profile", "email"]})
)

router.get("/google/callback",
    passport.authenticate("google", {session: false}),
    async (req, res) => {
        const token = jwt.sign(
            {id: req.user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.cookie("token", token , {
            httpOnly: true,
            secure: false,
        })
        
        res.redirect(process.env.CLIENT_URL)
    }
)

export default router