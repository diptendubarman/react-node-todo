const jwt = require("jsonwebtoken");
require('dotenv').config();

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  // Check if the Authorization header starts with "Bearer "
  const tokenPrefix = "Bearer ";
  if (!token.startsWith(tokenPrefix)) {
    return res
      .status(401)
      .send({ auth: false, message: "Invalid token format." });
  }

  const tokenWithoutPrefix = token.slice(tokenPrefix.length);

  jwt.verify(
    tokenWithoutPrefix,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err || !decoded || !decoded.id) {
        return res
          .status(500)
          .send({
            auth: false,
            message: "Failed to authenticate the provided token.",
          });
      }

      req.userId = decoded.id;
      console.log("decoded",decoded);
      next();
    }
  );
}

module.exports = verifyToken;
