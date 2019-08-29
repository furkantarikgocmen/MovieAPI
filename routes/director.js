const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

//Mongoose
const mongoose = require('mongoose');

/* GET home page. */
router.post('/', (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();

  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      //next({ status: 0, message: 'Director Was Not Saved !', code: 404, err });
      //res.json(err);
      next(err);
    });
});

/* GET directors list. */
router.get('/', (req, res, next) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }
  ]);

  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      //next({ status: 0, message: 'Director Was Not Saved !', code: 404, err });
      //res.json(err);
      next(err);
    });
});

/* GET director and movies on id. */
router.get('/:director_id', (req, res, next) => {
  const promise = Director.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        movies: '$movies'
      }
    }
  ]);

  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      //next({ status: 0, message: 'Director Was Not Saved !', code: 404, err });
      //res.json(err);
      next(err);
    });
});

/* PUT director on id. */
router.put('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {
    new: true
  }); //new : true = Güncellenmiş halini dön
  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      /*next({
        status: 0,
        message: 'Director Was Not Updated !',
        code: 404,
        err
      });*/
      //res.json(err);
      next(err);
    });
});

/* DELETE director on id. */
router.delete('/:director_id', (req, res, next) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);
  promise
    .then(data => {
      res.json({ status: 1, data });
    })
    .catch(err => {
      /*next({
        status: 0,
        message: 'Director Was Not Deleted !',
        code: 404,
        err
      });*/
      //res.json(err);
      next(err);
    });
});

module.exports = router;
