const express = require('express');
const router = express.Router();
const imdb = require('../imdb')
const Movie = require('../models/Movie')
//const DENZEL_IMDB_ID = 'nm0000243';

/*
  Get random must watch movie 
*/
router.get('/', async (req, res) => {
  let movie;

	try {
		movie = await Movie.aggregate([{ $match: { metascore: { $gt: 77 } } }, { $sample: { size: 3} }]);
  } 
  catch (err) {
		return res.status(500).json(err);
  }
  
  if (movie.length === 0) {
    return res.status(404).send('No movie found.');
  } else {
    console.log(movie.length)
    res.send(movie[0])
  }
});



/*
  Populate Database
*/
router.post('/populate/:id', async (req,res) => {
  const movies = await imdb(req.params.id)
  console.log(`🍿 ${movies.length} movies found.`);

  for (const m of movies) {
    const movie = new Movie(m)
    const savedMovie = await movie.save();
    console.log(savedMovie)
  }
});


module.exports = router;