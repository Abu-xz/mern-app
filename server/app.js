import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

// User Route
import userRoutes from './routes/user/userRoute.js';
import authRoutes from './routes/user/authRoute.js';

// Admin Route
import adminRoutes from './routes/admin/authRoute.js'

dotenv.config(); // configuration for env variables

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.LOCAL_MONGO_URI;


app.use(cookieParser()); // parse cookie
// Allow requests from frontend
app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,
  }));

app.use(express.json()) // middleware to parse json

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/admin', adminRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        success: false,
        message,
    })

})



mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDb');
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})