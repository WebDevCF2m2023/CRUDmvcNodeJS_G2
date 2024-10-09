// on importe le module de connexion
const db = require("./db.js");

console.log("Je passe dans models/message.model.js");

// Constructeur
const Message = function(lemessage) {
    this.nom = lemessage.nom;
    this.msg = lemessage.msg;
    this.date_creation = new Date();
};

// Méthode create pour créer un nouveau message dans la base de données
// newMsg : l'objet Message à créer et à sauver dans la DB
// resultat : la réponse du serveur de DB quand on insère (OK ou erreur)
Message.create = function(newMsg,resultat){
    db.query("INSERT INTO messages(nom,message) VALUES(?,?)",[newMsg.nom,newMsg.msg], function(err,res){
        // si on a une erreur, ça se trouve dans err
        if (err) {
            console.log("Erreur Message.create : ", err);
            resultat(err,null);
            return;
        };
        // si tout se passe bien, on a les données dans res
        console.log("Message.create OK : ", res);
        resultat(null,res);
    });
};

// Méthode readAll : pour lire tous les messages
Message.readAll = function(resultat){
    db.query("SELECT * FROM messages ORDER BY datemessage DESC", function(err,res){
        // si on a une erreur, ça se trouve dans err
        if (err) {
            console.log("Erreur Message.readAll : ", err);
            resultat(err,null);
            return;
        };
        // si tout se passe bien, on a les données dans res
        console.log("Message.readAll OK : ", res);
        resultat(null,res);
    });
};

/* Rappel : notations équivalentes
    function(id,resultat){...}
        est le même que
    (id,resultat)=>{...}
*/

// Méthode pour lire un seul message dans la DB, en fonction de son ID
Message.readById = function(id,resultat){
    db.query("SELECT * FROM messages WHERE id=?",id,(err,res)=>{
        if (err) {
            console.log("Erreur Message.readById : ",err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("Message.readById - message trouvé : ",res[0]);
            resultat(null,res[0]);
            return;
        }

        // Pas de message trouvé avec cet ID
        resultat({type:"ERR_NOT_FOUND"},null);
    })
};

// Méthode pour trouver le message à modifier, en fonction de son ID
Message.updateById = function(id,resultat){
    db.query("SELECT * FROM messages WHERE id=?",id,(err,res)=>{
        if (err) {
            console.log("Erreur Message.updateById : ",err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("Message.updateById - message trouvé : ",res[0]);
            resultat(null,res[0]);
            return;
        }

        // Pas de message trouvé avec cet ID
        resultat({type:"ERR_NOT_FOUND"},null);
    })
};

// Méthode pour modifier un message dans la DB, en fonction de son ID
Message.update = function(id,msg,resultat){
    console.log(msg);
    db.query("UPDATE messages SET nom=?,message=? WHERE id=?", [msg.nom,msg.msg,id], (err,res)=>{
        if (err) {
            console.log("Erreur Message.update : ",err);
            resultat(err,null);
            return;
        }

        if(res.affectedRows == 0){
            // Pas de message trouvé avec cet ID
            resultat({type:"ERR_NOT_FOUND"},null);
            return;
        }

        console.log("Message.update - message mis à jour : ",{id: id,...msg});
        resultat(null,{id: id,...msg});
    });
};

// Méthode pour trouver le message à supprimer, en fonction de son ID
Message.deleteById = function(id,resultat){
    db.query("SELECT * FROM messages WHERE id=?",id,(err,res)=>{
        if (err) {
            console.log("Erreur Message.deleteById : ",err);
            resultat(err,null);
            return;
        }

        if (res.length) {
            console.log("Message.deleteById - message trouvé : ",res[0]);
            resultat(null,res[0]);
            return;
        }

        // Pas de message trouvé avec cet ID
        resultat({type:"ERR_NOT_FOUND"},null);
    })
};

// Méthode pour supprimer le message dans la DB, après confirmation
Message.delete = function(id,resultat){
    db.query("DELETE FROM messages WHERE id=?",id,(err,res)=>{
        if (err) {
            console.log("Erreur Message.delete : ",err);
            resultat(err,null);
            return;
        }
        console.log("res=",res);

        if(res.affectedRows == 0){
            // Pas de message trouvé avec cet ID
            resultat({type:"ERR_NOT_FOUND"},null);
            return;
        }

        console.log("Message.delete - message "+id+" supprimé");
        resultat(null,res);
    });
};

// on exporte cet objet pour les autres modules
module.exports = Message;