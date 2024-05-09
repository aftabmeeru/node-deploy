const model = require("../models/product");
const Product = model.Product;
const ejs = require("ejs");
const path = require("path");

// below data is taken for mvc example before using mongoose and Schema
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const products = data.products;

// Server side rendering
exports.getAllProductsSSR = async (req, res) => {
  const products = await Product.find();
  ejs.renderFile(
    path.resolve(__dirname, "../views/index.ejs"),
    { products: products },
    function (err, str) {
      res.send(str);
    }
  );
}; 
// access this function in routing and use . 


// REST API's

exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then(() => {
      res.status(201).send(req.body);
    })
    .catch((error) => {
      res.status(400).send(error);
    });

  // products.push(req.body); // this code is the example before using mongoose and Schema
  // res.status(201).json(req.body); // this code is the example before using mongoose and Schema
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  // const products = await Product.find({ price: {$gt: 500} }); // products greater than 500
  res.json(products);

  // res.json(products); // this code is the example before using mongoose and Schema
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(201).json(product);

  // the below code is the example before using mongoose and Schema
  // const id = +req.params.id;
  // const product = products.find((prod) => prod.id === id);
  // res.json(product);
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

  // the below code is the example before using mongoose and Schema
  // const id = req.params.id;
  // const productIndex = products.findIndex((prod) => prod.id === id);
  // products.splice(productIndex, 1, { ...req.body, id });
  // res.status(201).json({ product: "updated" });
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

  // the below code is the example before using mongoose and Schema
  // const id = req.params.id;
  // const productIndex = products.findIndex((prod) => prod.id === id);
  // const product = products[productIndex];
  // products.splice(productIndex, 1, { ...product, ...req.body });
  // res.status(201).json({ product: "updated" });
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    req.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status().json(err);
  }

  // the below code is the example before using mongoose and Schema
  // const id = req.params.id;
  // const productIndex = products.findIndex((prod) => prod.id === id);
  // const product = products[productIndex];
  // products.splice(productIndex, 1);
  // res.status(201).json(product);
};
