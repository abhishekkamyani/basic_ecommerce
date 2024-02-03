const model = require("../models/product");
const Product = model.Product;

exports.getAll = async (req, res) => {

  try {
    const products = await Product.find();
    res.json(products);
    
  } catch (error) {
    res.status(404).json(error.message);
  }

};

exports.get = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

exports.create = (req, res) => {
  const product = Product(req.body);

  product
    .save()
    .then((doc) => res.send(doc))
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.replace = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedproduct = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.json(updatedproduct);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

exports.update = (req, res) => {
  const id = req.params.id;

  Product.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((doc) => res.json(doc))
    .catch((err) => res.json(err.message));
};

exports.deleteIt = (req, res) => {
  const id = req.params.id;

  Product.findOneAndDelete({ _id: id })
    .then((doc) => res.json(doc))
    .catch((err) => res.json(err.message));
};

//you can use either
// 1. Async/await + try and catch
// 2. Promise -> then and catch
