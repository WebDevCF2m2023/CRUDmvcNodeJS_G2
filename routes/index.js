var express = require('express');
var router = express.Router();

const root = require("../controllers/root.controller.js");

console.log('On passe dans : routes/index.js');

/* GET home page. */
router.get('/', root.home);

/* Affichage du formulaire de contact */
router.get('/contact', root.form);

/* Affichage de la confirmation des données reçues */
router.post('/traitement', root.traitement);

module.exports = router;
