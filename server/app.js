import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config(); // configuration for env variables

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

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