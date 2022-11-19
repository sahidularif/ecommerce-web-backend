const Article = require("../models/Article");
const { Order } = require("../models/Order");
const Product = require("../models/Product");

const serviceHandler = {}
serviceHandler.getAllOrder = async (req, res, next) => {

    try {
        const orders = await Order.find();
        res.status(200).send(orders);
      } catch (err) {
        res.status(500).json(err);
      }

}

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
        const product = req.body
        const newProduct = new Product(product)
        await newProduct.save()
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