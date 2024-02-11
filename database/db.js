import mongoose from "mongoose";


// mongoose.set('strictQuery', false)
const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.wieexsu.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL)
        console.log("Database is connected successfully");
    }
    catch (err) {
        console.log("Error while connecting database", err.message);
    }
}


export default Connection;

