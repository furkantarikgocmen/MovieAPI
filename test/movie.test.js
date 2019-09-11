const chai = require('chai');
const chaiHttp = require('chai-http');
const Should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movie test', () => {
  before(done => {
    chai
      .request(server)
      .post('/authenticate')
      .send({ username: 'test', password: 'test' })
      .end((err, res) => {
        if (err) console.log(err);
        token = res.body.token;
        done();
      });
  });

  describe('(GET) /api/movie', () => {
    it('it Should GET All The Movies', done => {
      chai
        .request(server)
        .get('/api/movie')
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) console.log(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('(POST) /api/movie', () => {
    it('it Should POST a Movie', done => {
      const movie = {
        title: 'test',
        director_id: '5d667e5d7fabf309881a64e2',
        category: 'test',
        country: 'localhost',
        year: '2019',
        imdb_score: 9.9
      };
      chai
        .request(server)
        .post('/api/movie')
        .send(movie)
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) console.log(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('data')
            .and.to.have.property('director_id');
          res.body.should.have
            .property('data')
            .and.to.have.property('category');
          res.body.should.have
            .property('data')
            .and.to.have.property('imdb_score');
          res.body.should.have.property('data').and.to.have.property('title');
          res.body.should.have.property('data').and.to.have.property('country');
          res.body.should.have.property('data').and.to.have.property('year');

          movieId = res.body.data._id;
          done();
        });
    });
  });

  describe('(GET) /api/movie/:movie_id', () => {
    it('it Should GET a Movie by The Given ID', done => {
      chai
        .request(server)
        .get('/api/movie/' + movieId)
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) console.log(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('data')
            .and.to.have.property('director_id');
          res.body.should.have
            .property('data')
            .and.to.have.property('category');
          res.body.should.have
            .property('data')
            .and.to.have.property('imdb_score');
          res.body.should.have
            .property('data')
            .and.to.have.property('director_id');
          res.body.should.have
            .property('data')
            .and.to.have.property('director_id');
          res.body.should.have.property('data').and.to.have.property('country');
          res.body.should.have.property('data').and.to.have.property('year');
          res.body.should.have
            .property('data')
            .and.to.have.property('_id')
            .eql(movieId);
          done();
        });
    });
  });

  describe('(PUT) /api/movie/:movie_id', () => {
    it('it Should PUT (Update) a Movie Given by Id', done => {
      const movie = {
        title: 'testUpdated',
        director_id: '5d667e5d7fabf309881a64e2',
        category: 'testUpdated',
        country: 'localhostUpdated',
        year: '2019',
        imdb_score: 9.9
      };

      chai
        .request(server)
        .put('/api/movie/' + movieId)
        .send(movie)
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) console.log(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('data')
            .and.to.have.property('director_id')
            .eql(movie.director_id);
          res.body.should.have
            .property('data')
            .and.to.have.property('category')
            .eql(movie.category);
          res.body.should.have
            .property('data')
            .and.to.have.property('imdb_score')
            .eql(movie.imdb_score);
          res.body.should.have
            .property('data')
            .and.to.have.property('title')
            .eql(movie.title);
          res.body.should.have
            .property('data')
            .and.to.have.property('country')
            .eql(movie.country);
          movieId = res.body.data._id;
          done();
        });
    });
  });

  describe('(DELETE) /api/movie/:movie_id', () => {
    it('it Should DELETE a Movie Given by Id', done => {
      chai
        .request(server)
        .delete('/api/movie/' + movieId)
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) console.log(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('data')
            .and.to.have.property('_id')
            .eql(movieId);
          res.body.should.have.property('status');
          done();
        });
    });
  });
});
