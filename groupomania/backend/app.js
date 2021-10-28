//Import
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/post.js');
const answerRoutes = require ('./routes/answer.js');

const path = require('path');

//création application Express
const app = express();


//Résolution erreur CORS
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Parser les corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/answer', answerRoutes);


module.exports = app;