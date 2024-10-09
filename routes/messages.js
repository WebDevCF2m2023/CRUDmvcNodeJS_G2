const express = require('express');
const router = express.Router();

const messages = require('../controllers/message.controller.js');

console.log('On passe dans : routes/messages.js');

/* ===== Lire toutes les données ===== */

// Lire sous forme d'un tableau (vue pour l'admin)
router.get('/', messages.readAll);

// Lire sour forme d'une liste (vue pour le visiteur)
router.get('/list', messages.list);

/* ===== Ajout d'un message =====*/

// Afficher le formulaire avant insertion
router.get('/newmsg', messages.newmsg);

// Envoyer les données à ajouter dans la DB
router.post('/create', messages.create);

/* ===== Lecture d'un seul message, après sélection de ce message ===== */

router.get('/read/:id', messages.readById);

/* ===== Mise à jour ===== */

// Voir les données existantes pour les afficher, avant modification
router.get('/edit/:id', messages.updateById);

// Effectuer la mise à jour dans la DB
router.post('/update/:id', messages.update);

/* ===== Suppression ===== */

// Voir les données existantes et attendre la confirmation avant de supprimer 
router.get('/confirm/:id', messages.deleteById);

// Effectuer la suppression des données après confirmation
router.post('/delete/:id', messages.delete);

/* ===== Export ===== */

// on exporte ce module pour être utilisé ailleurs dans l'application
module.exports = router;