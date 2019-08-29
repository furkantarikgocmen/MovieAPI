const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token =
    req.headers['x-access-token'] || req.body.token || req.query.token; //query get isteğinden yakalar

  if (token)
    jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
      if (err) next({ status: false, message: 'Failed To Authenticate Token' });
      else {
        req.decode = decoded;
        //console.log(decoded); Token Bilgisi
        next();
      }
    });
  else next({ status: false, message: 'No Token Provided' });
};
