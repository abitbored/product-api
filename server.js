const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        })
    })
    .catch(err => console.error(err));