const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: false },
    email: { type: String, required: true },
    password:{ type: String, required: true },
    cartItems:[{ type: mongoose.Schema.Types.ObjectId, ref: "product", required: false },],
    shippingdateils:{
              firstname:{ type: String, required: false},
              lastname:{ type: String, required: false},
              mobile:{ type: Number, required: false},
              address:{ type: String, required: false},
              state:{ type: String, required: false},
              pincode:{ type: Number, required: false}},
    paymentdetails:{
              cardname:{ type: String, required: false},
              cardnumber:{ type: Number, required: false}},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 8);
  return next();
});

const Users = mongoose.model("user", userSchema);
module.exports = Users
