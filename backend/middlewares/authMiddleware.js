import jwt from "jsonwebtoken"

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message: "user is not authorized"
            })
        }

        let token;

        if(authHeader.startsWith("Bearer ")){
            token = authHeader.split(" ")[1];
        }
        else{
            token = authHeader
        }
        // console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(process.env.JWT_SECRET)
        
        req.user = decoded.id;

        next()
    } catch (error) {
        console.log("jwt error: ", error.message)
        res.status(401).json({
            message: "token invalid"
        })
    }
}

export default protect