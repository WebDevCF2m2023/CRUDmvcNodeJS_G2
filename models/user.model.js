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
User.insertUser = function(newUser,resultat) {
    db.query("INSERT INTO users(nom,email,motdepasse) VALUES(?,?,?);",[newUser.nom,newUser.email,newUser.motdepasse],function(err,res){
        // si on a une erreur, ça se trouve dans err
        if (err) {
            console.log("Erreur User.insertUser : ", err);
            resultat(err,null);
            return;
        };
        // si tout se passe bien, on a les données dans res
        console.log("User.insertUser OK : ", res);
        resultat(null,res);
    });
};

// méthode pour rechercher un utilisateur sur base de son ID
User.getUserById = function(id,resultat) {
    db.query("SELECT * FROM users WHERE id=?",id,(err,res)=>{
        if (err) {
            console.log("Erreur User.getUserById : ",err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("User.getUserById - utilisateur trouvé : ",res[0]);
            resultat(null,res[0]);
            return;
        }

        // Pas d'utilisateur trouvé avec cet ID
        resultat({type:"ERR_NOT_FOUND"},null);
    });
};

// méthode pour rechercher un utilisateur sur base de son e-mail
User.getUserByEmail = function(email,resultat) {
    db.query("SELECT * FROM users WHERE email=?",email,(err,res)=>{
        if (err) {
            console.log("Erreur User.getUserByEmail : ",err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("User.getUserByEmail - utilisateur trouvé : ",res[0]);
            resultat(null,res[0]);
            return;
        }

        // Pas d'utilisateur trouvé avec cet email
        resultat({type:"ERR_NOT_FOUND"},null);
    });
};

// Export pour les autres modules
module.exports = User;