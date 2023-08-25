const mongoose = require("mongoose");
const Asset = require("../models/asset");

module.exports.assetDetails = async (req, res) => {
  try {
    const { assetName, quantity, cost } = req.body;
    if (!assetName) {
      throw new Error("Invalid assset name.");
    }
    if (!quantity) {
      throw new Error("Invalid asset quantity.");
    }
    if (!cost) {
      throw new Error("Invalid asset cost.");
    }

    const asset = await Asset.findOne({ assetName: assetName });
    if (asset) {
      throw new Error("Asset already exists.");
    } else {
      const newAsset = new Asset({
        assetName,
        quantity,
        cost,
      });
      newAsset.save().then((result) => {
        if (result) {
          res.status(200).json({ message: "Asset details saved successfully.", success: true });
        } else {
          throw new Error("Server rerror.");
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
