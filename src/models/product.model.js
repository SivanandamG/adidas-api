const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: { type: String, required: false,default:"Male" },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrls:[{type: String, required: true}],
    description: { type: String, required: true },
    discount:{type:Number,required:true}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Products = mongoose.model("product", productSchema);

module.exports = Products;
