const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: { type: String, required: true },
});

departmentSchema.virtual("url").get(function () {
  return `/inventory/department/${this._id}`;
});

module.exports = mongoose.model("Department", departmentSchema);
