const path = require('path');
const uuid = require('uuid');
const Product = require('../models/product.model');

exports.create = async (req, res) => {
  const { title, description, price } = req.body;
  const { image } = req.files;

  if (!title || !price || !description || !image) {
    return res.status(400).json({ message: 'Data Required' });
  }

  const fileName = uuid.v4() + '.jpg';
  image.mv(path.resolve(__dirname, '..', 'static', fileName));

  const newProduct = await new Product({
    title,
    description,
    price,
    image: fileName,
  }).save();

  res.json(newProduct);
};

exports.getAll = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.deleteOne = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete({
    _id: id,
  });

  res.json(deletedProduct);
};
