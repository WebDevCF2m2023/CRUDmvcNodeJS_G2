// on importe le module de connexion
const db = require("./db.js");

console.log("On passe dans : models/user.model.js");

// Constructeur
const User = function(lutilisateur) {
    this.nom = lutilisateur.nom;
    this.email = lutilisateur.email;
    this.motdepasse = lutilisateur.motdepasse;
};

// méthode pour créer un nouvel utilisateur
User.insertUser = function() {

};

// méthode pour rechercher un utilisateur sur base de son ID
User.getUserById = function() {

};

// méthode pour rechercher un utilisateur sur base de son e-mail
User.getUserByEmail = function() {

};

// Export pour les autres modules
module.exports = User;