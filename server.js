const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        })
    })
    .catch(err => console.error(err))