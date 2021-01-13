const express = require('express');
const ejsLayouts = require('express-ejs-layouts');

require('dotenv').config();
const app = express();


app.set('view engine', 'ejs'); // Sets EJS as the view engine
app.use(express.static('static')); // Specifies the location of the static assets folder

app.use(express.urlencoded({ extended: false })); // Sets up body-parser for parsing form data

app.use(ejsLayouts); // Enables EJS Layouts middleware

app.use(require('morgan')('dev')); // Adds some logging to each request

app.get('/', (req, res) => {
  // res.send('Hello, backend!');
  res.render('index', { dino: "DINOSAURRRrrrrr" });
});

let server = app.listen(process.env.PORT || 3000); // The app.listen function returns a server handle

module.exports = server; // We can export this server to other servers like this
