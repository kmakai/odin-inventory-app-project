const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  instock_count: { type: Number, required: true },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  image: { type: String, required: true },
});

productSchema.virtual("url").get(function () {
  return `/inventory/products/${this._id}`;
});

module.exports = mongoose.model("Product", productSchema);
