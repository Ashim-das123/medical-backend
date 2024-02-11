import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import Connection from './database/db.js';
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js';
import doctorRoute from './routes/doctor.js'
import reviewRoute from './routes/review.js'
import bookingRoute from './routes/booking.js'

dotenv.config() // to access the .env file
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())


const port = process.env.PORT || 8000

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/doctor', doctorRoute)
app.use('/api/reviews', reviewRoute)
app.use('/api/bookings', bookingRoute)

// db connection

const USER = process.env.USER_NAME;

const PASSWORD = process.env.DB_PASSWORD

Connection(USER, PASSWORD);





app.listen(port, () => {
    console.log(`server is running on port  ${port}`)
})