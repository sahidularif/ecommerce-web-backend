const Product = require("../models/Product");
const { unlink } = require('fs')
const path = require('path');

const serviceHandler = {};
serviceHandler.basedir = path.join(__dirname, '../uploads/');


serviceHandler.getAllProduct = async (req, res, next) => {

  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json(err);
  }

}


serviceHandler.addProduct = async (req, res, next) => {

  try {
    const product = new Product(req.body)
    await product.save()
    res.status(200).send("Product successfully added");
  } catch (err) {
    res.status(500).json(err);
  }

}


serviceHandler.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById({ _id: req.params._id });
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
}


module.exports = serviceHandler