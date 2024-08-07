const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_ID;

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  console.log('Token received:', token);

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user; 
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
