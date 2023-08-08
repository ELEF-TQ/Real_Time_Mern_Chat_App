const jwt = require('jsonwebtoken');

const GenerateToken = (id) => {

  const secretKey = process.env.JWT_SECRET;
  const payload = {userId: id};
  const options = {expiresIn: '1h'};

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

module.exports = GenerateToken;
