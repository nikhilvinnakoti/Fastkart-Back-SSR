const express = require("express");

const router = express.Router();
const User = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/fastkart";

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
router.get("/", (req, res) => {
  res.send("From Fastkart APIs");
});
router.post("/signup", (req, res) => {
  let userData = req.body;
  console.log("received", userData);
  let user = new User(userData);
  // user.save((error, registeredUser)=>{
  //     if(error){
  //         console.log(error)
  //     }else{
  //         res.status(200).send(registeredUser)
  //     }
  // })
  user
    .save()
    .then((registeredUser) => {
      res.status(200).send(registeredUser);
      console.log("savedUser", registeredUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
