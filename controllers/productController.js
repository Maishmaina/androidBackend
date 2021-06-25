import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// @desc  Fetch all products
// @route GET /api/products
// @access  Public

const getProducts = async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const getProduct = await Product.find(filter).populate("category");
    res.status(200).json(getProduct);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

// @desc  Create a product
// @route POST /api/products
// @access  Private/Admin

const createdProduct = async (req, res) => {
  const findCategory = await Category.findById(req.body.category);
  if (!findCategory) {
    return res.status(400).send("Invalid Category");
  }

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  const resultProduct = await product.save();
  if (!resultProduct) {
    res.status(500).send("Something went wrong");
  }
  res.status(201).send(resultProduct);
};

// @desc  GET product by Id
// @route GET /api/v1/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(500).json({ success: false, message: "Product Not Found" });
    }
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
  }
};
// @desc Update a product
// @route PUT /api/v1/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Product Details");
  }
  const findCategory = await Category.findById(req.body.category);
  if (!findCategory) {
    return res.status(400).send("Invalid Category");
  }

  const {
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.richDescription = richDescription;
    product.image = image;
    product.brand = brand;
    product.price = price;
    product.category = category;
    product.countInStock = countInStock;
    product.rating = rating;
    product.numReviews = numReviews;
    product.isFeatured = isFeatured;

    const updated = await product.save();
    res.status(201).json(updated);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc  DELETE product
// @route DELETE /api/v1/products/:id
// @access  Private

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (Product) {
    await product.remove();
    res.status(200).json({ success: true, message: "Product Deleted" });
  } else {
    res.status(404).json({ success: false, message: "Product Not Found" });
  }
};
// @desc Count Number product
// @route GET /api/v1/products/get/countProducts
// @access  Private
const countProduct = async (req, res) => {
  try {
    const productCount = await Product.countDocuments((count) => count);
    if (!productCount) {
      res.status(500).json({ success: false, message: "Product Not Found" });
    }
    res.status(200).send({ productCount: productCount });
  } catch (err) {
    console.log(err);
  }
};

// @desc Get Featured product
// @route GET /api/v1/products/get/featured
// @access  Private
const featuredProduct = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const product = await Product.find({ isFeatured: true }).limit(+count);
    if (!product) {
      res.status(500).json({ success: false, message: "Product Not Found" });
    }
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
  }
};

export {
  getProducts,
  createdProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  countProduct,
  featuredProduct,
};
