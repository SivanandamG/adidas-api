const express = require("express");
const Users = require("../models/user.model");
const Products = require("../models/product.model");

const router = express.Router();

router.get(
  "/additem/:id/:product",
  async (req, res) => {
    try {
     const user = await Users.findById(req.params.id).lean().exec();

     let cartdata = [...user.cartItems,req.params.product];

      const product = await Users.findByIdAndUpdate(req.params.id, {cartItems:cartdata}).lean().exec();
      return res.send({ product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

// router.get(
//      "additem/:id/:product",
//      async (req, res) => {
//        try {
//         const user = await Users.findById(req.params.id).lean().exec();
   
//         let cartdata = [...user.cartItems,req.params.product];
   
//          const product = await Users.findByIdAndUpdate(req.params.id, {cartItems:cartdata}).lean().exec();
//          return res.send({ product });
//        } catch (err) {
//          return res.status(500).send(err);
//        }
//      }
//    );


router.get(
     "/deleteitem/:id/:product",
     async (req, res) => {
       try {
          const user = await Users.findById(req.params.id).populate("cartItems").lean().exec();
          const productdata = await Products.findById(req.params.product).lean().exec();
          let arr = [];
          user.cartItems.map((a)=>{if(a.title === productdata.title){
        }else{arr.push(a._id)}});
         const cart = await Users.findByIdAndUpdate(req.params.id, {cartItems:arr}).populate("cartItems").lean().exec();
         return res.send(cart.cartItems);
       } catch (err) {
         return res.status(500).send(err);
       }
     }
   );

//    router.get(
//      "deleteitem/:id/:product",
//      async (req, res) => {
//        try {
//           const user = await Users.findById(req.params.id).populate("cartItems").lean().exec();
//           const productdata = await Products.findById(req.params.product).lean().exec();
//           let arr = [];
//           user.cartItems.map((a)=>{if(a.title === productdata.title){
//         }else{arr.push(a._id)}});
//          const cart = await Users.findByIdAndUpdate(req.params.id, {cartItems:arr}).lean().exec();
//          return res.send({ cart });
//        } catch (err) {
//          return res.status(500).send(err);
//        }
//      }
//    );

router.get(
     "/:id",
     async (req, res) => {
       try {   
         const product = await Users.findById(req.params.id).populate("cartItems").lean().exec();
         return res.send( product.cartItems );
       } catch (err) {
         return res.status(500).send(err);
       }
     }
   );

module.exports = router;
