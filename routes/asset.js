var express = require("express");
var assetRouter = express.Router();
const { validateToken } = require("../middlewares/auth");

const { assetDetails } = require("../controller/assetController");

assetRouter.post("/assetDetails", validateToken, assetDetails);

module.exports = assetRouter;
