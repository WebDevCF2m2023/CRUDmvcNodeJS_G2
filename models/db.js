// on importe le module mysql
const mysql = require("mysql");

// on importe les données de configuration pour la connexion dans un fichier .env
require('dotenv').config();

// on charge la configuration pour la connexion avec la DB
const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
});

// on tente de se connecter
connection.connect(function(error) {
    // s'il y a une erreur à ce niveau, on arrête
    if (error) throw error; 
    
    console.log(`Connecté avec succès à la base de données ${process.env.DB_NAME} !`);
  });

// on exporte la connexion pour qu'elle puisse être utilisée par d'autres modules de l'application
module.exports = connection;