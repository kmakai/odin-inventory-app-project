const Product = require("../models/Product");

const { body, validationResult } = require("express-validator");

const async = require("async");

// products index
exports.index = (req, res, next) => {
  res.send("Home not implemented");
};

// get products list
exports.productsList = (req, res, next) => {
  res.send("Not yet implemented");
};

// get product detail
exports.productDetail = (req, res, next) => {
  res.send("Not yet implemented");
};

// create product GET
exports.productCreateGet = (req, res, next) => {
  res.send("Not yet implemented");
};

// create product POST
exports.productCreatePost = (req, res, next) => {
  res.send("Not yet implemented");
};

// update product GET
exports.productUpdateGet = (req, res, next) => {
  res.send("Not yet implemented");
};

// update product POST
exports.productUpdatePost = (req, res, next) => {
  res.send("Not yet implemented");
};

// delete product GET
exports.productDeleteGet = (req, res, next) => {
  res.send("Not yet implemented");
};

// delete product POST
exports.productDeletePost = (req, res, next) => {
  res.send("Not yet implemented");
};
