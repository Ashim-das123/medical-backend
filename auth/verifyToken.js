import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js"
import User from "../models/UserSchema.js"


export const authenticate = (req, res, next) => {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: "No token found" });
    }

    const token = authToken.replace("Bearer ", "");  // getting the actual token by removing bearer

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedToken.id
        req.role = decodedToken.role

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {

            res.status(401).json({ message: "Token is expired" });
        }

        res.status(401).json({ message: "Invalid token" });

    }
}


export const restrict = (roles) => async (req, res, next) => {

    const userId = req.userId;
    let user;

    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if (patient) {
        user = patient;
    }
    if (doctor) {
        user = doctor
    }

    if (!roles.includes(user.role)) {
        return res.status(401).json({ message: "you are not authorized" })
    }

    next();

}