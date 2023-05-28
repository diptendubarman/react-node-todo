const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
