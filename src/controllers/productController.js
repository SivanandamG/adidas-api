const express = require("express");

const router = express.Router();

const Products = require("../models/product.model");

router.get("", async (req, res) => {
  try {
    const products = await Products.find().lean().exec();
    console.log(products);
    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post(
  "",
  async (req, res) => {
    try {
      const product = await Products.create(req.body);
      return res.send({ product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const products = await Products.findById(req.params.id).lean().exec();
    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.patch(
  "/:id",
  async (req, res) => {
    try {
      const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.send({ product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get("/men", async (req, res) => {
  try {
    const products = await Products.find({category:"Men"}).lean().exec();
    console.log(products);
    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/women", async (req, res) => {
  try {
    const products = await Products.find({category:"women"}).lean().exec();
    console.log(products);
    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
// https://github.com/AnanthuSuresh098/Server-Adidas_replica/tree/SIvanandam