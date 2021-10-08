const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/auth');

const sequelize = new Sequelize("nom_base_de_donnees", "nom_utilisateur", "mot_de_passe_utilisateur", {
  dialect: "mysql",
  host: "localhost"
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}
const app = express();

//appel des routes

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.json());

  app.use('/images', express.static(path.join(__dirname, 'images')))
  
  app.use('/api/auth', userRoutes);
  app.use('/api/sauces', sauceRoutes)


module.exports = app;