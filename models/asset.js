const { Schema, model } = require("mongoose");

const assetSchema = new Schema(
  {
    assetName: {
      type: String,
      default: "",
      unique: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
    assetSold: {
      type: Number,
      default: "",
    },
    assetAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Asset = model("asset", assetSchema);
module.exports = Asset;
