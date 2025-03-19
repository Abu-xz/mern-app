import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';

dotenv.config(); // configuration for env variables

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.LOCAL_MONGO_URI;

app.use(express.json()) // middleware to parse json

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        success: false,
        errorMessage,
        statusCode,
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