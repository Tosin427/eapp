const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const ethers = require("ethers");
const crypto = require("crypto");

const CoinKey = require("coinkey");

const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      var wallet = new CoinKey.createRandom();
      let bitAdd = wallet.publicAddress;
      let bitKey = wallet.privateKey.toString("hex");

      // Generate Etherum Address
      const id = crypto.randomBytes(32).toString("hex");
      const privateKeyEth = "0x" + id;
      // console.log(privateKeyEth);
      const walletEth = new ethers.Wallet(privateKeyEth);
      const walletEthAddress = walletEth.address;
      // console.log(walletEthAddress);

      user = new User({
        name,
        email,
        bitAdd,
        bitKey,
        privateKeyEth,
        walletEthAddress,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
