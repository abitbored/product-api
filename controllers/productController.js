const Product = require('../models/Product');

const getAll = async (req, res) => {
    const products = await Product.find({ owner: req.user.id });
    res.status(200).json(products);
};

const create = async (req, res) => {
    const { title, description, price } = req.body;
    const product = new Product({ title, description, price, owner: req.user.id });
    await product.save();
    res.status(201).json(product);
}

const getOne = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id, owner: req.user.id });
    if (!product) {
        return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(product)
}

const update = async (req, res) => {
    const product = await Product.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.id },
        req.body,
        { new: true }
    );
    if (!product) {
        return res.status(404).json({ message: 'Not found' });
    }
}

const remove = async (req, res) => {
    const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!product) {
        return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'Product deleted' })
}

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove
}