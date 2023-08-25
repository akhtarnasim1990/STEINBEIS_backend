const jwt = require("jsonwebtoken");
// Middleware function to validate the JWT token
const TOKEN_KEY = "swerfodsur!@#$123<>?12swe";
module.exports.validateToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    if (!token) {
      throw new Error("No token provided.");
      // return res.status(400).send({ message: 'No token provided.', success: false });
    }
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: error.message, success: false });
  }
};
