var express = require('express');
var router = express.Router();

const users = require("../controllers/user.controller.js");

console.log("On passe dans routes/users.js");

// Page d'accueil
router.get('/', users.home);

// Affichage du formulaire d'enregistrement
router.get('/register', users.register_form);

// Enregistrement dans la DB d'un nouvel utilisateur
router.post('/register', users.register);

// Affichage du formulaire de connexion
router.get('/login', users.login_form);

// Connexion d'un utilisateur (login)
router.post('/login', users.login);

// Déconnexion d'un utilisateur (logout)
router.get('/logout', users.logout);

// Export du module
module.exports = router;
