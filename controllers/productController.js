const Product = require("../models/Product");
const Department = require("../models/Department");

const { body, validationResult } = require("express-validator");

const async = require("async");

// products index
exports.index = (req, res, next) => {
  async.parallel(
    {
      productCount(callback) {
        Product.countDocuments({}, callback);
      },
      departmentCount(callback) {
        Department.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Product Inventory",
        error: err,
        data: results,
      });
    }
  );
};

// get products list
exports.productsList = (req, res, next) => {
  Product.find({}, "name department")
    .sort({ name: 1 })
    .populate("department")
    .exec(function (err, result) {
      if (err) return next(err);

      res.render("productList", { title: "Products list", products: result });
    });
};

// get product detail
exports.productDetail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate("department")
    .exec(function (err, result) {
      if (err) return next(err);

      res.render("productDetail", {
        title: result.name,
        product: result,
      });
    });
};

// create product GET
exports.productCreateGet = (req, res, next) => {
  Department.find({}, "name")
    .sort({ name: 1 })
    .exec(function (err, departments) {
      if (err) return next(err);

      res.render("productForm", {
        title: "Add New Product",
        departments: departments,
      });
    });
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
