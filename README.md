# MovieAPI

## Express Based Simple REST API

### How To Run :

```
$ git clone github.com/furkantarikgocmen/MovieAPI.git
$ npm install
$ npm run start
```

### How To Use:

```
1- Look At http://localhost:3000/
2- Create a New User (/register)
3- Generate a token (/authenticate)
4- Add Generated Token to Query

Request Header = ['x-access-token'] or
Request Body = {token : 'generatedToken'} or
request.query.token = http://localhost:3000/api/movie?token=generatedToken
```

### Dependencies

- **MongoDB**

### Don't Forget Change secret_api_key In ./config.js

- **secret_api_key is Elfida...**

## Movies

| Route                                    | HTTP Verb | POST body                                                                                         | Description                   |
| ---------------------------------------- | --------- | ------------------------------------------------------------------------------------------------- | ----------------------------- |
| /api/movie                               | `GET`     | Empty                                                                                             | List all movies.              |
| /api/movie                               | `POST`    | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7 } | Create a new movie.           |
| /api/movie/:movie_id                     | `GET`     | Empty                                                                                             | Get a movie.                  |
| /api/movie/:movie_id                     | `PUT`     | {'name':'foo', 'surname':'bar'}                                                                   | Update a movie with new info. |
| /api/movie/:movie_id                     | `DELETE`  | Empty                                                                                             | Delete a movie.               |
| /api/movie/top10                         | `GET`     | Empty                                                                                             | Get the top 10 movies.        |
| /api/movie/between/:start_year/:end_year | `GET`     | Empty                                                                                             | Movies between two dates.     |

## Directors

| Route                                  | HTTP Verb | POST body                                         | Description                      |
| -------------------------------------- | --------- | ------------------------------------------------- | -------------------------------- |
| /api/director                          | `GET`     | Empty                                             | List all directors.              |
| /api/director                          | `POST`    | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Create a new director.           |
| /api/director/:director_id             | `GET`     | Empty                                             | Get a director.                  |
| /api/director/:director_id             | `PUT`     | {'name':'foo', 'surname':'bar', 'bio': 'lorem'}   | Update a director with new info. |
| /api/director/:director_id             | `DELETE`  | Empty                                             | Delete a director.               |
| /api/director/:director_id/best10movie | `GET`     | Empty                                             | The director's top 10 films.     |

## Index

| Route         | HTTP Verb | POST body                            | Description        |
| ------------- | --------- | ------------------------------------ | ------------------ |
| /register     | `POST`    | { username: 'foo', password:'1234' } | Create a new user. |
| /authenticate | `POST`    | { username: 'foo', password:'1234' } | Generate a token.  |
