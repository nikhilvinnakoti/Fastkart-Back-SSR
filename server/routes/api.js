require("dotenv").config();
const express = require("express");

const router = express.Router();
const User = require("../models/users");
const Role = require("../models/roles");
const Wallet = require("../models/wallets");
const Point = require("../models/points");
const PaymentAccount = require("../models/payment_accounts");
const ProfileImage = require("../models/profile_images");
const Address = require("../models/addresses");
const Category = require("../models/categories");
const Product = require("../models/products");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

const db = "mongodb+srv://nikhil_vinnakoti:nikhil@fastkart.0gzrk.mongodb.net/?retryWrites=true&w=majority&appName=Fastkart";

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
router.post("/signup", async (req, res) => {
  const { name, email, phone, password, password_confirmation } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedPasswordConfirmation = await bcrypt.hash(
      password_confirmation,
      salt
    );

    // Create User and Store Refresh Token in DB
    user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      password_confirmation: hashedPasswordConfirmation,
      // Store refresh token in DB
    });
    await user.save();

    // Generate Persistent Token (Optional)
    const persistentToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    // Generate Access Token (Short-lived)
    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });

    // Generate Refresh Token (Long-lived)
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "30d",
      }
    );

    user.token = persistentToken;
    user.refresh_token = refreshToken;
    await user.save();

    // ✅ Assign Role & Link to User
    const role = new Role({
      user_id: user._id, // Linking the role with user_id
    });

    await role.save();

    // ✅ Assign Wallet & Link to User
    const wallet = new Wallet({
      consumer_id: user._id, // Linking the wallet with user_id
    });

    await wallet.save();

    // ✅ Assign Points & Link to User
    const point = new Point({
      consumer_id: user._id, // Linking the point with user_id
    });
    await point.save();

    // ✅ Assign Payment Accounts & Link to User
    const payment_accounts = new PaymentAccount({
      user_id: user._id, // Linking the Payment Accounts with user_id
    });
    await payment_accounts.save();

    // ✅ Assign Profile Images & Link to User
    const profile_images = new ProfileImage({
      created_by_id: user._id, // Linking the Profile Images with user_id
    });
    await profile_images.save();

    // // ✅ Assign Addresses & Link to User
    // const addresses = new Address({
    //   user_id: user._id, // Linking the Addresses with user_id
    // });
    // await addresses.save();

    user.token = persistentToken;
    user.refresh_token = refreshToken;
    user.role = role._id;
    user.wallet = wallet._id;
    user.point = point._id;
    user.payment_account = payment_accounts._id;
    user.profile_image = profile_images._id;
    // user.addresses = addresses._id;
    await user.save();

    // Send Refresh Token as HTTP-Only Cookie (For Security)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Signup successful!",
      token: persistentToken,
      access_token: accessToken,
      _id: user._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error. Please try again later" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Username/Password." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Username/Password." });

    // Generate New Persistent Token (Optional)
    const persistentToken = jwt.sign(
      { _id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    // Generate New Access Token (Short-lived)
    const accessToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });

    // Generate New Refresh Token (Long-lived)
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // Store New Refresh Token in DB
    user.token = persistentToken;
    user.refresh_token = refreshToken;
    await user.save();

    // Send Refresh Token as HTTP-Only Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful!",
      token: user.token,
      access_token: accessToken,
      _id: user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
});
// router.post("/createAddress", async(req, res)=> {

//   const { user_id, title, street, state_id, country_id, city, pincode, country_code, phone} = req.body;
 
//   try{
//     const user = await User.findById(user_id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     // Create a new address document
//     const newAddress = new Address({
//       title,
//       street,
//       state_id,
//       country_id,
//       city,
//       pincode,
//       country_code,
//       phone,
//       user_id


//     });
  
//     // Save the address document
//     const savedAddress = await newAddress.save();
  
//     // Update the user document to link the new address
//     user.addresses.push(savedAddress._id);
//     await user.save();
  
//     return res.status(201).json({ message: "Address added successfully", address: savedAddress });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
  

// })
router.post("/createAddress", async (req, res) => {
  const {
    user_id,
    title,
    street,
    city,
    pincode,
    country_code,
    phone,
    country, // Expecting: { id: Number, name: String }
    state     // Expecting: { id: Number, name: String }
  } = req.body;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new address document
    const newAddress = new Address({
      user_id,
      title,
      street,
      city,
      pincode,
      country_code,
      phone,
      country,  // Save full object
      state     // Save full object
    });

    // Save the address document
    const savedAddress = await newAddress.save();

    // Update the user document to link the new address
    user.addresses.push(savedAddress._id);
    await user.save();

    return res.status(201).json({ message: "Address added successfully", address: savedAddress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});
// router.post("/updateAddress", async (req, res) => {
//   const {
//     user_id,
//     title,
//     street,
//     city,
//     pincode,
//     country_code,
//     phone,
//     country, // Expecting: { id: Number, name: String }
//     state     // Expecting: { id: Number, name: String }
//   } = req.body;

//   try {
//     const user = await User.findById(user_id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create a new address document
//     const newAddress = new Address({
//       user_id,
//       title,
//       street,
//       city,
//       pincode,
//       country_code,
//       phone,
//       country,  // Save full object
//       state     // Save full object
//     });

//     // Save the address document
//     const savedAddress = await newAddress.save();

//     // Update the user document to link the new address
//     user.addresses.push(savedAddress._id);
//     await user.save();

//     return res.status(201).json({ message: "Address added successfully", address: savedAddress });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// })
router.put("/updateAddress/:id", async (req, res) => {
  const addressId = req.params.id;

  const {
    title,
    street,
    city,
    pincode,
    country_code,
    phone,
    country, // { id, name }
    state    // { id, name, country_id }
  } = req.body;

  try {
    const address = await Address.findById(new mongoose.Types.ObjectId(addressId));
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update fields
    address.title = title;
    address.street = street;
    address.city = city;
    address.pincode = pincode;
    address.country_code = country_code;
    address.phone = phone;
    address.country = country;
    address.state = state;

    const updatedAddress = await address.save();

    return res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});



router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log("userId", userId);

    const user = await User.findById(new mongoose.Types.ObjectId(userId))
      .populate("role")
      .populate("point")
      .populate("wallet")
      // .populate("payment_accounts")
      // .populate("profile_images")
      .populate("addresses");

    // console.log("got",user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/categories", async (req, res) => {
  try {
    // console.log(req);
    const categories = await Category.findOne();
    // .populate('subcategories', 'name slug') // Fetch subcategories
    // .populate('parent', 'name slug'); // Fetch parent category
    // console.log("categories", categories);

    res.json({
      data: categories?.data || [], // ✅ Send the inner `data` array directly
      total: categories?.data?.length || 0, // ✅ Count the total categories
    });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ message: "Error fetching categories", error });
  }
});
router.get("/products", async (req, res) => {
  try {
    // console.log(req);
    // const products = await Product.find();
    // const products = await Product.find()
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    res.json({
      data: products || [], // ✅ Send the inner `data` array directly
      total: products?.length || 0, // ✅ Count the total products
    });
    
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ message: "Error fetching products", error });
  }
});
router.post("/checkout", async (req, res) => {
  try {
    console.log("checkout", req.body);
    const { products, shipping_address, billing_address, delivery_method, payment_method, coupon, points_amount, wallet_balance } = req.body;

    // if (!cart || cart.length === 0) {
    //   return res.status(400).json({ message: "Cart is empty." });
    // }

    // Sample total calculation
    console.log("all products", products)
    let sub_total = 0;
    products.forEach(item => {
      const price = item.price || 0;
      console.log("product price", price);
      sub_total += price * item.quantity;
    });

    const shipping_total = 5; // example
    const tax_total = +(sub_total * 0.1).toFixed(2); // 10% tax
    const point_discount = (points_amount) ? points_amount/30 : 0;
    const wallet_discount = wallet_balance ? wallet_balance : 0;
    const coupon_discount = coupon ? 50 : 0;

    const raw_total =
      (sub_total + shipping_total + tax_total) -( point_discount + wallet_discount + coupon_discount);
      console.log("raw total", raw_total);
    const total = Math.max(raw_total, 0);

    // Construct response similar to your app's expectation
    const checkoutSummary = {
      total: {
        sub_total,
        shipping_total,
        tax_total,
        convert_point_amount: 10,
        convert_wallet_balance: 84.4,
        coupon_total_discount: coupon_discount,
        total,
      },
    };

    res.json(checkoutSummary);
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Checkout failed", error });
  }
});
router.post("/logout", async (req, res) => {
  console.log("logout", req.cookies);
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token found." });
  }

  try {
    // Clear refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
});
router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "No refresh token, please log in." });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Generate new access & refresh tokens
    const newAccessToken = jwt.sign(
      { _id: decoded._id },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign(
      { _id: decoded._id },
      process.env.REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    // Send new refresh token in HTTP-only cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({ access_token: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token." });
  }

  
});
module.exports = router;
