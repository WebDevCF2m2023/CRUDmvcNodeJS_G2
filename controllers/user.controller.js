// on importe le modèle qui va donner la connexion à la DB
const User = require('../models/user.model.js');

console.log("On passe dans controllers/user.controller.js");

// Pour afficher la page d'accueil d'un utilisateur connecté
exports.home = (req,res) => {

};

// Pour afficher le formulaire d'enregistrement d'un nouvel utilisateur
exports.register_form = (req,res) => {
    
};

// Pour stocker les données d'enregistrement du nouvel utilisateur
exports.register = (req,res) => {
    
};

// Pour afficher le formulaire de connexion de l'utilisateur
exports.login_form = (req,res) => {
    
};

// Pour vérifier que l'utilisateur est correct (login/mot de passe OK)
exports.login = (req,res) => {
    
};

// Pour se déconnecter
exports.logout = (req,res) => {
    
};