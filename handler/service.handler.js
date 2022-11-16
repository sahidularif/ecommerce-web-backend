const { Order } = require("../models/Order");

const serviceHandler = {}
serviceHandler.getAllOrder = async (req, res, next) => {

    try {
        const orders = await Order.find();
        res.status(200).send(orders);
      } catch (err) {
        res.status(500).json(err);
      }

}
module.exports = serviceHandler