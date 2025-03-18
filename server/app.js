import express from 'express';
import dotenv from 'dotenv'

dotenv.config(); // configuration for env variables

const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})