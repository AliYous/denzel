const express = require('express');
const router = express.Router();
const imdb = require('../imdb')
const Movie = require('../models/Movie')
const DENZEL_IMDB_ID = 'nm0000243';


router.get('/', (request, response) => {
    response.send('Movies');
  });



/*
  Populate Database
*/
router.post('/populate', async (req,res) => {
  const movies = await imdb(DENZEL_IMDB_ID)
  console.log(`🍿 ${movies.length} movies found.`);

  for (const m of movies) {
    const movie = new Movie(m)
    const savedMovie = await movie.save();
    console.log(savedMovie)
  }
});


module.exports = router;