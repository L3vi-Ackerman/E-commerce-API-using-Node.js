const router = require("express").Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin || false
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select(
      "username email password isAdmin"
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordMatch = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).send("Incorrect password");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({...others,accessToken});
  } catch (error) {
    console.log("Error in auth.js: ", error);
    res.status(500).json({ err: error });
  }
});
module.exports = router;
