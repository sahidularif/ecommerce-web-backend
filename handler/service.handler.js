const Article = require("../models/Article");
const { Order } = require("../models/Order");
const Product = require("../models/Product");
const { unlink } = require('fs')
const path = require('path');
const Category = require("../models/Category");
const serviceHandler = {};
serviceHandler.basedir = path.join(__dirname, '../uploads/');
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
    // console.log(products);
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json(err);
  }

}

serviceHandler.getAllCategory = async (req, res, next) => {

  try {
    const category = await Category.find();
    // console.log(products);
    res.status(200).send(category);
  } catch (err) {
    res.status(500).json(err);
  }

}

serviceHandler.addProduct = async (req, res, next) => {

  try {
    // console.log(req.body)
    const product = new Product(req.body)
    await product.save()
    res.status(200).send("Product successfully added");
  } catch (err) {
    res.status(500).json(err);
  }

}

// serviceHandler.addCategory = async (req, res, next) => {

//   try {
//     const category = await Category.findOne({ categoryType: req.body.categoryType })
//     if (!category) {
//       const url = req.protocol + '://' + req.get('host');
//       const image = url + '/uploads/' + req.file.filename
//       const category = { ...req.body, image }
//       const newCategory = new Category(category)
//       await newCategory.save()
//       res.status(200).send("Category successfully added!")
//     } else {
//       res.status(201).send("Category type already exist, try another one!")
//     }

//   } catch (err) {
//     console.log(err)
//     res.status(500).send(err.message)
//   }

// }
serviceHandler.addCategory = async (req, res, next) => {

  try {
    Category.findOne({ categoryType: req.body.categoryType })
    const url = req.protocol + '://' + req.get('host');
    const image = url + '/uploads/' + req.file.filename
    const category = { ...req.body, image }
    const newCategory = new Category(category)
    await newCategory.save()
    res.status(200).send("Product successfully received");
  } catch (err) {
    res.status(500).json("err");
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
serviceHandler.getSingleCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

serviceHandler.updateCategory = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const image = url + '/uploads/' + req.file.filename
  const category = { ...req.body, image }
  Category.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      throw err
    } else {
      const url = doc.image.replace('http://localhost:5000/uploads/', '')
      unlink(`${serviceHandler.basedir}/${url}`, (err) => {
        if (err) {
          throw err;
        } else {
          Category.findByIdAndUpdate({ _id: req.params.id }, category,
            (err, docs) => {
              if (err) {
                res.status(500).send(`There was a problem while updating your doc`)
                throw err
              } else {
                res.status(200).send('Category successfully updated!')
              }
            });
        }
      });
    }
  });
};
serviceHandler.deleteCategory = (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
    .then(function () {
      res.status(200).send("Data successfully deleted")
    }).catch(function (err) {
      console.log(err);
      res.status(500).send("There was a server side error!")
    });
};


module.exports = serviceHandler