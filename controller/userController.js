const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Asset = require("../models/asset");
const UserAsset = require("../models/userOwnAsset");
const TOKEN_KEY = "swerfodsur!@#$123<>?12swe";

module.exports.userDetails = async (req, res) => {
  try {
    const { name, dob, age, gender, password } = req.body;
    console.log(name, dob, age, gender);
    if (!name) {
      throw new Error("Invalid user name.");
    }
    if (!dob) {
      throw new Error("Invalid date of birth.");
    }
    if (!age) {
      throw new Error("Invalid age.");
    }
    if (!gender) {
      throw new Error("Please mention gender.");
    }

    const user = await User.findOne({ name: name });
    console.log("user", user);
    if (user) {
      throw new Error("User already exists.");
    } else {
      console.log("user not found");
      const newUser = new User({
        name,
        dob,
        age,
        gender,
      });

      newUser.save().then((result) => {
        if (result) {
          res.status(200).json({ message: "User details saved successfully.", success: true });
        } else {
          throw new Error("Server rerror.");
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    if (!name) {
      throw new Error("Invalid user name.");
    }
    if (!password) {
      throw new Error("Invalid passsword.");
    }
    const user = await User.findOne({ name: name });

    if (!user) {
      throw new Error("User not found.");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Either user name or password is invalid.");
      } else {
        const userToken = jwt.sign({ name, id: user._id }, TOKEN_KEY, {
          expiresIn: "1d",
        });
        res.status(200).json({ message: "User successfully logged in.", data: userToken, success: true });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports.assetPurchasing = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userName, assetName, bankBalance } = req.body;
    if (!userName) {
      throw new Error("Invalid user name.");
    }
    if (!assetName) {
      throw new Error("Invalid asset name.");
    }
    if (!bankBalance || bankBalance === 0) {
      throw new Error("Insufficient balance.");
    }
    const user = await User.findOne({ name: userName });

    if (!user) {
      throw new Error("User not found.");
    }

    const asset = await Asset.findOne({ assetName: assetName });

    if (!asset) {
      throw new Error("Asset not found.");
    }

    if (asset.assetAvailable) {
      asset.assetAvailable = false;
      await asset.save({ session });
    } else {
      throw new Error("Server is bussy please try after some time.");
    }

    const userAsset = await UserAsset.findOne({ userName: userName, assetName: assetName });

    if (userAsset) {
      throw new Error("You have already purchased this asset.");
    } else {
      if (bankBalance < asset.cost) {
        throw new Error("Insufficient balnce.");
      }
      asset.quantity -= 1;
      asset.assetSold += 1;
      asset.assetAvailable = true;
      await asset.save({ session });
      const newUserAsset = new UserAsset({
        userName,
        assetName,
      });
      newUserAsset.save({ session }).then(async (result) => {
        if (result) {
          await session.commitTransaction();
          res.status(200).json({ message: "You have successfully parchased the asset.", success: true });
        }
      });
    }
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message, success: false });
  }
};
