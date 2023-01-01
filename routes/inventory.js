const express = require("express");
const router = express.Router();

// import controllers
const productController = require("../controllers/productController");
const departmentController = require("../controllers/departmentController");

// get full inventory/home page
router.get("/", productController.index);

// product routes //

// GET product create form
router.get("/product/create", productController.productCreateGet);

// POST product create form
router.post("/product/create", productController.productCreatePost);

// GET product delete form
router.get("/product/:id/delete", productController.productDeleteGet);

// POST product delete form
router.post("/product/:id/delete", productController.productDeletePost);

// GET product update form
router.get("/product/:id/update", productController.productUpdateGet);

// POST product update form
router.post("/product/:id/update", productController.productUpdatePost);

// GET product detail page
router.get("/product/:id", productController.productDetail);

// GET products list
router.get("/products", productController.productsList);

// department routes //

// GET department create form
router.get("/department/create", departmentController.departmentCreateGet);

// POST department create form
router.post("/department/create", departmentController.departmentCreatePost);

// GET department delete form
router.get("/department/:id/delete", departmentController.departmentDeleteGet);

// POST department delete form
router.post(
  "/department/:id/delete",
  departmentController.departmentDeletePost
);

// GET department update form
router.get("/department/:id/update", departmentController.departmentUpdateGet);

// POST department update form
router.post(
  "/department/:id/update",
  departmentController.departmentUpdatePost
);

// GET department detail page
router.get("/department/:id", departmentController.departmentDetail);

// GET departments list
router.get("/departments", departmentController.departmentsList);
