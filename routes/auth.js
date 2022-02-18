const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndSup,
} = require("./verifyToken");

// REGISTER
router.post("/register", verifyTokenAndAdmin, async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    permission: req.body.permission,
  });
  await newUser
    .save()
    .then((resp) => res.status(201).json(resp.data))
    .catch((err) => {
      if (err.code && err.code === 11000) {
        errorKey = Object.keys(err.keyValue);
        res.status(500).json(`An account with that ${errorKey} already exists`);
      } else {
        res.status(500).json(err);
      }
    });
});

//  LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        permission: user.permission,
      },
      process.env.JWT_SEC,
      { expiresIn: "2d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
