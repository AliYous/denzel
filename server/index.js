const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {PORT} = require('./constants');
const mongoose = require('mongoose')
require('dotenv/config')

const app = express();
module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());
app.options('*', cors());


const moviesRoutes = require('./routes/movies');
app.use('/movies', moviesRoutes);

app.get('/', (request, response) => {
  response.send('Home Page');
});


mongoose.connect(process.env.DB_CONNECTION , { useNewUrlParser: true}, () => 
  console.log("DB connected")
);

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
