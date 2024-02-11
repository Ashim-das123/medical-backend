import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    const { name, email, password, role, photo, gender } = req.body;
    try {



        let user = null;

        if (role === 'patient') {
            user = await User.findOne({ email: email })

        }
        else if (role === 'doctor') {
            user = await Doctor.findOne({ email: email })

        }

        // check whether user exist or not

        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }

        //if not exist 
        const hashedPassword = await bcrypt.hash(password, 12);


        if (role === 'patient') {
            user = new User({ name, email, password: hashedPassword, role, photo, gender })
        }
        if (role === 'doctor') {
            user = new Doctor({ name, email, password: hashedPassword, role, photo, gender })
        }

        await user.save();
        res.status(200).json({ message: "Registered successfully" })




    } catch (err) {

        res.status(500).json(err.message);

    }
};

export const login = async (req, res) => {

    const { email } = req.body;

    try {

        let user = null;

        let patient = await User.findOne({ email })
        let doctor = await Doctor.findOne({ email })

        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }


        //     // if user not exist

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const match = bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        //     // give token 
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        }
        );

        const { password, role, appointments, ...rest } = user._doc;

        res.status(200).json({
            message: "Successfully loggedin",
            token,
            data: { ...rest },
            role,
        });



    } catch (err) {

        res.status(500).json({ message: "failed to login" })
    }
}

