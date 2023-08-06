const jwt = require('jsonwebtoken');

const GenerateToken = (id) => {

  const secretKey = 'ELEF_TQ';
  const payload = {userId: id,};
  const options = {expiresIn: '1h'};

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

module.exports = GenerateToken;
