const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

/* GET movie listing. */
router.post('/', (req, res, next) => {
  const movie = new Movie(req.body);

  const promise = movie.save();
  promise
    .then(data => {
      res.json({ status: 1 });
    })
    .catch(err => {
      res.json({ status: 0, error: err });
    });
});

module.exports = router;
