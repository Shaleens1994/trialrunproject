const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    
    let token = req.body.token || req.query.token || req.headers.authorization;
    // User.create({
    //   name : req.body.name,
    //   email : req.body.email,
    //   password : hashedPassword
    // },
    // function (err, user) {
    //   if (err) return res.status(500).send("There was a problem registering the user.")
    //   // create a token
    //   var token = jwt.sign({ id: user._id }, config.secret, {
    //     expiresIn: 86400 
    
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
