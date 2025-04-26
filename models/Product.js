const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId, ref:'User',
        }
    }
);

module.exports = mongoose.model('Product', ProductSchema)