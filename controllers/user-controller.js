import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js"
export const updateUser = async (req, res) => {

    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({ message: "Successfully updated", data: updatedUser })
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update" })
    }
}

export const deleteUser = async (req, res) => {

    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({ message: "Successfully deleted" })
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete" })
    }
}


export const getSingleUser = async (req, res) => {

    const id = req.params.id;

    try {
        const user = await User.findById(id)
        res.status(200).json({ message: "User found", data: user })
    }
    catch (err) {
        res.status(404).json({ message: "No user found" })
    }
}
export const getAllUser = async (req, res) => {

    try {
        const users = await User.find({}).select("-password")
        res.status(200).json({ message: "Users found", data: users })
    }
    catch (err) {
        res.status(404).json({ message: "Not found" })
        console.log(err);
    }
}

export const getUserProfile = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const { password, ...rest } = user._doc

        res.status(200).json({ message: "Profile info is getting", data: { ...rest } })

    }
    catch (err) {
        res.status(500).json({ message: "Something went wrongn cant get" })
    }
}


export const getMyAppointments = async (req, res) => {
    try {
        // retrieve appointments from booking for the specific user
        const bookings = await Booking.find({ user: req.userId })

        // extract doctor ids from appointment bookings
        const doctorIds = bookings.map(ele => ele.doctor.id)

        //extract doctors using doctor ids
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password')   //$in - matches any value in a specified array
        res.status(200).json({ message: "appointment are getting", data: doctors })
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrongn cant get" })
    }
}