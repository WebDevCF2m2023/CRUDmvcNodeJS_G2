// on importe le module mysql
const mysql = require("mysql");

// on importe le fichier de config pour la connexion
const dbConfig = require("../config/dbconfig.js");

// on charge la configuration pour la connexion
const connection = mysql.createConnection({
    host:dbConfig.DB_HOST,
    user:dbConfig.DB_USER,
    password:dbConfig.DB_PASSWORD,
    database:dbConfig.DB_NAME,
    port:dbConfig.DB_PORT
});

// on tente de se connecter
connection.connect(function(error) {
    // s'il y a une erreur à ce niveau, on arrête
    if (error) throw error; 
    
    console.log("Connecté avec succès à la base de données !");
  });

// on exporte la connexion pour qu'elle puisse être utilisée par d'autres modules de l'application
module.exports = connection;