import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc   fetch all product
// @route  GET / api/products
// @access public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc   fetch all product
// @route  GET / api/products/:id
// @access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(`product not found`);
  }
});
// @desc   delete Product By ID
// @route  DELETE / api/products/:id
// @access private/admin

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: `product ${req.params.id} deleted!` });
  } else {
    res.status(404);
    throw new Error(`product not found`);
  }
});

// @desc   create Product with default value
// @route  POST / api/products
// @access private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "sample name",
    image: "/images/sample.jpg",
    desc: "description",
    brand: "sample brand",
    category: "sample category",
    price: 0,
    countStock: 0,
    rating: 0,
    numReviews: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc   update Product By Id
// @route  PUT / api/products/:id
// @access private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    desc,
    image,
    brand,
    category,
    price,
    countStock,
    numReviews,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.user = req.user._id;
    product.brand = brand;
    product.price = price;
    product.category = category;
    product.image = image;
    product.desc = desc;
    product.countStock = countStock;
    product.numReviews = numReviews;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found!");
  }
});

export {
  getProductById,
  getProducts,
  deleteProductById,
  createProduct,
  updateProduct,
};
