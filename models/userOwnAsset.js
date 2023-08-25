const { Schema, model } = require("mongoose");

const userAssetSchema = new Schema(
  {
    userName: {
      type: String,
      default: "",
      index: true,
    },
    assetName: {
      type: String,
      default: "",
      index: true,
    },
  },
  { timestamps: true }
);

const UserAsset = model("userAsset", userAssetSchema);
module.exports = UserAsset;
