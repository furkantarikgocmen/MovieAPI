const express = require('express');
const router = express.Router();

//Models
const User = require('../models/User');

//Password helper
const bcrypt = require('bcryptjs');

//JSON Web Token
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* POST user page. */
router.post('/register', (req, res, next) => {
  const { username, password } = new User(req.body);

  bcrypt.hash(password, 10).then(hash => {
    const user = new User({
      username,
      password: hash
    });

    const promise = user.save();
    promise
      .then(data => {
        res.json({ status: 1 }); //password hash de gidiyor. o yüzden datayı kaldırdım.
      })
      .catch(err => {
        //res.json(err);
        next(err);
      });
  });
});

router.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne(
    {
      username
    },
    (err, user) => {
      if (err) throw err; //next(error);

      if (!user)
        next({
          status: false,
          message: 'Authentication Failure. User Not Found'
        });
      else {
        bcrypt.compare(password, user.password).then(result => {
          if (!result)
            next({
              status: false,
              message: 'Authentication Failure. Password Not Correct'
            });
          else {
            const payload = { username };

            const token = jwt.sign(payload, req.app.get('api_secret_key'), {
              expiresIn: 720 //12 saat. Dakika türünde
            });

            res.json({ status: true, token });
          }
        });
      }
    }
  );
});

module.exports = router;
