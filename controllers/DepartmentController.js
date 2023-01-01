const Product = require("../models/Product");
const Department = require("../models/Department");

// get departments list
exports.departmentsList = (req, res, next) => {
  Department.find({})
    .sort({ name: 1 })
    .exec(function (err, result) {
      if (err) return next(err);

      res.render("departmentList", {
        title: "Departments List",
        departments: result,
      });
    });
};

// get department detail
exports.departmentDetail = (req, res, next) => {
  res.send("Not yet implemented");
};

// create department GET
exports.departmentCreateGet = (req, res, next) => {
  res.send("Not yet implemented");
};

// create department POST
exports.departmentCreatePost = (req, res, next) => {
  res.send("Not yet implemented");
};

// update department GET
exports.departmentUpdateGet = (req, res, next) => {
  res.send("Not yet implemented");
};

// update department POST
exports.departmentUpdatePost = (req, res, next) => {
  res.send("Not yet implemented");
};

// delete department GET
exports.departmentDeleteGet = (req, res, next) => {
  res.send("Not yet implemented");
};

// delete department POST
exports.departmentDeletePost = (req, res, next) => {
  res.send("Not yet implemented");
};
