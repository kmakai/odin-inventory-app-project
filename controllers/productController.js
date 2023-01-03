const Product = require("../models/Product");
const Department = require("../models/Department");

const { body, validationResult } = require("express-validator");

const async = require("async");
const { collection } = require("../models/Product");

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
exports.productCreatePost = [
  // validate and sanitize form fields
  body("name", "Product name is required").trim().isLength({ min: 1 }).escape(),
  body("productdescription", "Product description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body(
    "productprice",
    "Product price is required and must be a number"
  ).isFloat(),
  body(
    "productcount",
    "Product count is required and must be a number"
  ).isInt(),
  body("department").trim().isLength({ min: 1 }).escape(),

  // Process request after validation
  (req, res, next) => {
    console.log(req.body);
    // get errors from validator
    const errors = validationResult(req);

    // set up new product
    const product = new Product({
      name: req.body.name,
      description: req.body.productdescription,
      price: req.body.productprice,
      instock_count: req.body.productcount,
      department: req.body.department,
      image: "",
    });

    if (!errors.isEmpty()) {
      Department.find({}, "name")
        .sort({ name: 1 })
        .exec(function (err, departments) {
          if (err) return next(err);

          res.render("productForm", {
            title: "Add New Product",
            product,
            departments: departments,
            errors: errors.array(),
          });
        });
      return;
    } else {
      product.save((err) => {
        if (err) return next(err);

        res.redirect(product.url);
      });
    }
  },
];

// update product GET
exports.productUpdateGet = (req, res, next) => {
  async.parallel(
    {
      product(callback) {
        Product.findById(req.params.id).populate("department").exec(callback);
      },
      departments(callback) {
        Department.find({}, "name").sort({ name: 1 }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);

      if (results.product == null) {
        const err = new Error("No such product");
        err.status = 404;
        return next(err);
      }

      res.render("productForm", {
        title: "Update Product",
        departments: results.departments,
        product: results.product,
      });
    }
  );
};

// update product POST
exports.productUpdatePost = [
  // validate and sanitize form fields
  body("name", "Product name is required").trim().isLength({ min: 1 }).escape(),
  body("productdescription", "Product description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body(
    "productprice",
    "Product price is required and must be a number"
  ).isFloat(),
  body(
    "productcount",
    "Product count is required and must be a number"
  ).isInt(),
  body("department").trim().isLength({ min: 1 }).escape(),

  // Process request after validation
  (req, res, next) => {
    console.log(req.body);
    // get errors from validator
    const errors = validationResult(req);

    // set up new product
    const product = new Product({
      name: req.body.name,
      description: req.body.productdescription,
      price: req.body.productprice,
      instock_count: req.body.productcount,
      department: req.body.department,
      image: "",
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      Department.find({}, "name")
        .sort({ name: 1 })
        .exec(function (err, departments) {
          if (err) return next(err);

          res.render("productForm", {
            title: "Update Product",
            product,
            departments: departments,
            errors: errors.array(),
          });
        });
      return;
    } else {
      Product.findByIdAndUpdate(req.params.id, product, (err, theproduct) => {
        if (err) return next(err);

        res.redirect(theproduct.url);
      });
    }
  },
];

// delete product GET
exports.productDeleteGet = (req, res, next) => {
  res.send("Not yet implemented");
};

// delete product POST
exports.productDeletePost = (req, res, next) => {
  res.send("Not yet implemented");
};
