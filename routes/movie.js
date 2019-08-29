const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

/* DELETE movie on id. */
router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      //next({ status: 0, message: 'Movies Was Not Deleted !', code: 404, err });
      //res.json(err);
      next(err);
    });
});

/* PUT movie on id. */
router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {
    new: true
  }); //new : true = Güncellenmiş halini dön
  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      //next({ status: 0, message: 'Movies Was Not Updated !', code: 404, err });
      //res.json(err);
      next(err);
    });
});

/* GET Top10 movie listing. */
router.get('/top10', (req, res, next) => {
  const promise = Movie.find({})
    .limit(10)
    .sort({ imdb_score: -1 });
  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      //next({ status: 0, message: 'Movies Was Not Found !', code: 404, err });
      //res.json(err);
      next(err);
    });
});

/* GET movie details on id. */
router.get('/:movie_id', (req, res, next) => {
  const promise = Movie.findById(req.params.movie_id);
  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      //next({ status: 0, message: 'The Movie Was Not Found !', code: 404, err });
      //res.json(err);
      next(err);
    });
});

/* GET movie listing. */
router.get('/', (req, res, next) => {
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    },
    {
      $unwind: {
        path: '$director',
        preserveNullAndEmptyArrays: true //Bu olmazsa Yönetmeni Olmayan Filmler Gelmiyor.
      }
    }
  ]);
  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      //next({ status: 0, message: 'Movies Was Not Found !', code: 404, err });
      //res.json(err);
      next(err);
    });
});

/* POST movie saving. */
router.post('/', (req, res, next) => {
  const movie = new Movie(req.body);

  const promise = movie.save();
  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      /*next({
        status: 0,
        message: 'Movies Was Not Saved !',
        code: 404,
        err
      });*/
      //res.json(err);
      next(err);
    });
});

/* GET movie between listing. */
router.get('/between/:start_year/:end_year', (req, res, next) => {
  const { start_year, end_year } = req.params;
  const promise = Movie.find({
    year: { $gte: parseInt(start_year), $lte: parseInt(end_year) }
  });
  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      //next({ status: 0, message: 'Movies Was Not Found !', code: 404, err });
      //res.json(err);
      next(err);
    });
});

module.exports = router;
