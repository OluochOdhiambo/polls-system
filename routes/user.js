const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndSup,
  verifyTokenAndAuthorized,
} = require("./verifyToken");

const router = require("express").Router();

// UPDATE USER
router.put("/:id", verifyTokenAndAuthorized, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => res.status(500).json(err));
});

//  GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  await User.findById(req.params.id)
    .then((resp) => {
      const { password, ...others } = resp._doc;
      res.status(200).json(others);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

// DELETE USER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then((resp) => res.status(200).json("User has been deleted..."))
    .catch((err) => res.status(500).json(err));
});
