const Product = require('../models/Product');

const getAll = async (req, res) => {
    try {
        const products = await Product.find({ owner: req.user.id });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error getting all products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const create = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const product = new Product({ title, description, price, owner: req.user.id });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getOne = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, owner: req.user.id });
        if (!product) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const update = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            req.body,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json(product); // Added missing response
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const remove = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        if (!product) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove
}