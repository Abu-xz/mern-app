import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userRouter from './routes/userRoute.js';

dotenv.config(); // configuration for env variables

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json()) // middleware to parse json
app.use('/api/users', userRouter)




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