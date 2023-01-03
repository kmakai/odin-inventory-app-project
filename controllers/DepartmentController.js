const Product = require("../models/Product");
const Department = require("../models/Department");

const { body, validationResult } = require("express-validator");

const async = require("async");

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
  async.parallel(
    {
      department(callback) {
        Department.findById(req.params.id).exec(callback);
      },
      departmentItems(callback) {
        Product.find({ department: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);

      if (results.department == null) {
        const err = new Error("Department not found");
        err.status = 404;
        return next(err);
      }

      res.render("departmentDetail", {
        title: results.department.name,
        department: results.department,
        items: results.departmentItems,
      });
    }
  );
};

// create department GET
exports.departmentCreateGet = (req, res, next) => {
  res.render("departmentForm", {
    title: "Create Department",
  });
};

// create department POST
exports.departmentCreatePost = [
  body("name", "A name is required for to create a department")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const department = new Department({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render({
        title: "Create Department",
        department,
        errors: errors.array(),
      });

      return;
    } else {
      Department.findOne({ name: req.body.name }).exec(
        (err, existingDepartment) => {
          if (err) return next(err);

          if (existingDepartment) {
            res.redirect(existingDepartment.url);
          } else {
            department.save((err) => {
              if (err) return next(err);

              res.redirect(department.url);
            });
          }
        }
      );
    }
  },
];

// update department GET
exports.departmentUpdateGet = (req, res, next) => {
  Department.findById(req.params.id, (err, department) => {
    if (err) return next(err);

    if (department == null) {
      const err = new Error("Department not found");
      err.status = 404;
      return next(err);
    }

    res.render("departmentForm", {
      title: "Update Department",
      department,
    });
  });
};

// update department POST
exports.departmentUpdatePost = [
  body("name", "A name is required for to create a department")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const department = new Department({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("departmentForm", {
        title: "Update Department",
        department,
        errors: errors.array(),
      });

      return;
    } else {
      Department.findByIdAndUpdate(
        req.params.id,
        department,
        {},
        (err, newdepartment) => {
          if (err) return next(err);

          res.redirect(newdepartment.url);
        }
      );
    }
  },
];

// delete department GET
exports.departmentDeleteGet = (req, res, next) => {
  async.parallel(
    {
      department(callback) {
        Department.findById(req.params.id).exec(callback);
      },
      departmentItems(callback) {
        Product.find({ department: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);

      if (results.department == null) res.redirect("/inventory/departments");

      res.render("departmentDelete", {
        title: "Delete Department",
        department: results.department,
        items: results.departmentItems,
      });
    }
  );
};

// delete department POST
exports.departmentDeletePost = (req, res, next) => {
  async.parallel(
    {
      department(callback) {
        Department.findById(req.params.id).exec(callback);
      },
      departmentItems(callback) {
        Product.find({ department: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);

      if (results.departmentItems.length > 0) {
        res.render("departmentDelete", {
          title: "Delete Department",
          department: results.department,
          items: results.departmentItems,
        });
        return;
      } else {
        Department.findByIdAndRemove(req.body.id, (err) => {
          if (err) return next(err);
          res.redirect("/inventory/departments");
        });
      }
    }
  );
};
