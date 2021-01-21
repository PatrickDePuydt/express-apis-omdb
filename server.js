require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios').default;

require('dotenv').config();
const app = express();

app.set('view engine', 'ejs'); // Sets EJS as the view engine
app.use(express.static('static')); // Specifies the location of the static assets folder

app.use(express.urlencoded({ extended: false })); // Sets up body-parser for parsing form data

app.use(ejsLayouts); // Enables EJS Layouts middleware

app.use(require('morgan')('dev')); // Adds some logging to each request

app.get('/', (req, res) => {
  // res.send('Hello, backend!')
  res.render('index', { dino: "🦖" });
  console.log(`🧼 v3 req.body: ${req.body}`);
});
// Params is passing into the URl
// Query is for from the form
app.get('/results', (req, res) => {
  let results = req.query.s;
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB}&s=${results}`)
  .then( (answer) => {
    let results = answer.data;
    
    console.log(`⭐⭐⭐⭐`, answer)
    
    res.render('results', {
      results: results.Search
    });
  }).catch( error => console.log(`❌ Axios Error: `, error));
});

app.get('/results/:id', (req, res) => {
  let resultId = req.params.id;
  // console.log(`🍩 resultId`, resultId)
  res.render('detail', {id: resultId});
});

let server = app.listen(process.env.PORT || 3000); // The app.listen function returns a server handle

module.exports = server; // We can export this server to other servers like this
