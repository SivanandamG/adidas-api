const express = require("express");
const Users = require("../models/user.model");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
router.get("/login", async (req, res) => {
  try {
    let user = await Users.findOne({email:req.params.email}).lean().exec();
    if(user === null){
         return res.status(401).send({res:"User doesn't exists"});
     }
     const match =  function(password) {
          console.log(password,user.password);
          return  bcrypt.compareSync(password, user.password);
        };
        if(!match(req.body.password)){
             return res.status(401).send("Wrong password");
        };
        const token = newToken(user);
     return res.status(201).send({user:user,token:token});
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get(
  "/signup/:username/:email/:password",
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    try {
     const errors = validationResult(req);
     console.log(errors);

    //  if (!errors.isEmpty()) {
    //    return res.status(400).json({ errors: errors.array() });
    //  }

    var user = await Users.findOne({email:req.params.email});
    console.log(user);
    if(user !== null){
         return res.status(401).send("User exists login");
     }

     const body = {
      username:req.params.username,
      email:req.params.email,
      password:req.params.password
    }

      user = await Users.create(body);

     const token = newToken(user);

     return res.send({ user:user,token:token });

    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get(
  "/signup",
  async (req, res) => {
    try {
     const errors = validationResult(req);
     // console.log(errors);
     // if (!errors.isEmpty()) {
     //   return res.status(400).json({ errors: errors.array() });
     // }

     var user = await Users.findOne({email:req.body.email}).lean().exec();
     console.log(req.body);
    if(user !== null){
         return res.status(401).send("User exists login");
     }

      user = await Users.create(req.body);

     const token = newToken(user);

     return res.send({ user:user,token:token });

    } catch (err) {
      return res.status(500).send(err);
    }
  }
);


router.get("/users", async (req, res) => {
  try {
    let user = await Users.find().populate("cartItems").lean().exec();
    // if(user === null){
    //      return res.status(401).send({res:"User doesn't exists"});
    //  }
    //  const match =  function(password) {
    //       console.log(password,user.password);
    //       return  bcrypt.compareSync(password, user.password);
    //     };
    //     if(!match(req.body.password)){
    //          return res.status(401).send("Wrong password");
    //     };
    //     const token = newToken(user);
     return res.status(201).send({user:user});
  } catch (err) {
    return res.status(500).send(err);
  }
});

const newToken = (user) => {
  return jwt.sign({ user: user }, "adidasscretkey", {
    expiresIn: 60 * 60 * 10,
  });
};


module.exports = router;