// on importe le modèle qui va donner la connexion à la DB
const Message = require('../models/message.model.js');

// on importe le module 'moment.js'
const moment = require('moment');

console.log('On passe dans controllers/message.controller.js');

// Création d'un message (affichage du formulaire)
exports.newmsg = (req,res) => {
    console.log("Affichage du formulaire de contact");
};

// Créer et sauvegarder un message
exports.create = (req,res) => {
    console.log("POST créer un message");
    const titrePage = 'Formulaire reçu';
    const lenom = req.body.nom;
    const lemessage = req.body.msg;

    // Validation du formulaire
    if ( (!req.body) || (lenom=="") || (lemessage=="") ) {
        console.log("Le formulaire est incomplet !");
        res.redirect('/contact');       // retour au formulaire de contact
    } else {
        console.log(req.body);
        // créer un nouveau message avec mon modèle
        const unMsg = new Message({
            nom: lenom,
            msg: lemessage
        });

        Message.create(unMsg, function(err,data){
            if (err) {
                res.status(500).send({
                    message:"Erreur pendant la création du message"
                });
            } else {
                console.log("Data : " + data);
                res.render("traiter_form.ejs", {title:titrePage, nom:unMsg.nom, msg:unMsg.msg});
            }
        });
    }
};
/* équivalent à
exports.create = function(req,res){

};
*/

// Lire tous les messages (sous forme d'une liste)
exports.list = (req,res)=>{
    console.log("Affichage de la liste des messages");

    Message.readAll(function(err,data){
        if (err) {
            res.status(500).send({
                message:"Erreur pendant la lecture des messages (liste)"
            });
        } else {
            console.log("Data : " + data);
            moment.locale('fr');
            res.render("listeMessages.ejs",{title:"Liste des messages", donnees:data, moment:moment});
        }
    });
};

// Lire tous les messages (sous forme d'un tableau)
exports.readAll = (req,res) => {
    console.log("GET tous les messages");

    Message.readAll(function(err,data){
        if (err) {
            res.status(500).send({
                message:"Erreur pendant la lecture des messages (tableau)"
            });
        } else {
            console.log("Data : " + data);
            moment.locale('fr');
            res.render("tableauMessages.ejs",{title:"Tableau des messages", donnees:data, moment:moment});
        }
    });
};

// Lire un seul message
exports.readById = (req,res) => {
    console.log('Affichage des détails du message #'+req.params.id);

    Message.readById(req.params.id, function(err,data){
        if (err) {
            if (err.type === "ERR_NOT_FOUND") {
                res.status(404).send({
                    message:`Pas de message trouvé avec l'id ${req.params.id} - readById`
                });
            } else {
                res.status(500).send({
                    message:`Une erreur s'est produite pendant la recherche du message avec l'id ${req.params.id} - readById`
                });
            }
        } else {
            let titrePage = `Détails du message #${req.params.id}`;
            moment.locale('fr');
            res.render("detailMessage.ejs",{title:titrePage, donnees:data, moment:moment});
        }
    });
};

// Mettre à jour un message en fonction de son id
exports.updateById = (req,res)=>{
    console.log("Récupérer les données actuelles du message #" + req.params.id);

    Message.updateById(req.params.id, (err,data)=>{
        if (err) {
            if (err.type === "ERR_NOT_FOUND") {
                res.status(404).send({
                    message: `Pas de message trouvé avec id #${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Une erreur s'est produite lors de la recherche du message ${req.params.id}`
                });
            }
        } else {
            let titrePage = "Modification du message #" + req.params.id;
            res.render('edit_form',{title:titrePage,donnees:data});
        }
    });
};

// Mettre à jour dans la DB un message en fonction de son id
exports.update = (req,res)=>{
    console.log("Mettre à jour un message");
    const titrePage = 'Liste des messages';
    const lid = req.body.id;
    const lenom = req.body.nom;
    const lemessage = req.body.msg;

    // Validation du formulaire de modification
    if ( (!req.body) || (lenom=="") || (lemessage=="") ) {
        console.log("Le formulaire est incomplet !");
        res.redirect('/messages/edit/'+req.body.id);       // retour au formulaire de modification pour le message associé à l'id
    } else {
        console.log(req.body);
        // créer un nouveau message avec mon modèle
        const unMsg = new Message({
            nom: lenom,
            msg: lemessage
        });

        Message.update(lid, unMsg, function(err,data){
            if (err) {
                res.status(500).send({
                    message:"Erreur pendant la modification du message"
                });
            } else {
                console.log("Data : " + data);
                res.redirect('/messages/');
            }
        });
    }
};

// Confirmer la suppression d'un message en fonction de son id
exports.deleteById = (req,res)=>{
    console.log("Récupérer les données actuelles du message à supprimer #" + req.params.id);

    Message.deleteById(req.params.id, (err,data)=>{
        if (err) {
            if (err.type === "ERR_NOT_FOUND") {
                res.status(404).send({
                    message: `Pas de message trouvé avec id #${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Une erreur s'est produite lors de la recherche du message ${req.params.id}`
                });
            }
        } else {
            let titrePage = "Confirmation avant suppression du message #" + req.params.id;
            res.render('confirm_form',{title:titrePage,donnees:data});
        }
    });
};

// Supprimer dans la DB un message en fonction de son id
exports.delete = (req,res)=>{
    console.log("Supprimer un message");

    const lid = req.body.id;

    // Validation du formulaire de modification
    if (!req.body) {
        console.log("Le contenu ne peut pas être vide !");
        res.redirect('/messages/confirm/'+req.body.id);       // retour au formulaire de modification pour le message associé à l'id
    } else {
        console.log(req.body);

        Message.delete(lid, function(err,data){
            if (err) {
                res.status(500).send({
                    message:"Erreur pendant la suppression du message"
                });
            } else {
                res.redirect('/messages/');
            }
        });
    }
};

