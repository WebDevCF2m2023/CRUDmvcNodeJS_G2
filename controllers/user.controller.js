// on importe le modèle qui va donner la connexion à la DB
const User = require('../models/user.model.js');

console.log("On passe dans controllers/user.controller.js");

// on importe le module de cryptage
const { hashSync, genSaltSync, compareSync } = require('bcrypt');

// Pour afficher la page d'accueil d'un utilisateur connecté
exports.home = (req,res) => {
    console.log("user.controller - .home");
    res.redirect('/');
};

// Pour afficher le formulaire d'enregistrement d'un nouvel utilisateur
exports.register_form = (req,res) => {
    console.log("user.controller .register_form : req.session = "+req.session);

    const {userId} = req.session;
    console.log("user.controller .register_form : userID = "+userId);

    // Si une session est déjà active, on affiche la page d'accueil pour un utilisateur déjà loggé, car pas besoin de l'enregistrer
    if (userId) {
        console.log("Déjà enregistré - userID="+userId);
        User.getUserById(userId,(err,utilisateur)=>{
            if (err) {
/*
                res.status(500).send({
                    title:'Erreur 500',
                    message:"Erreur, dans registerform, pendant la recherche d'un utilisateur sur base de son ID"
                });
*/                
                res.render('error.ejs',{
                    title:'Erreur 500',
                    message:"Erreur, dans registerform, pendant la recherche d'un utilisateur sur base de son ID"
                });
            } else {
                // Aller sur l'accueil "connecté"
                res.render('index_admin.ejs',{title:'Express - Admin',user:utilisateur.nom});
            }
        });
    } else {
    // Sinon, on affiche le formulaire d'enregistrement  
        console.log("Affichage du formulaire d'enregistrement");
        res.render("register_form.ejs", {title:"Enregistrement"});
    }
};

// Pour stocker les données d'enregistrement du nouvel utilisateur
exports.register = (req,res) => {
    console.log("user.controller - .register");
    const lenom = req.body.nom;
    const lemail = req.body.email;
    let lemotdepasse = req.body.motdepasse;

    // valider le contenu du formulaire
    if ((!req.body)||(lenom==="")||(lemail==="")||(lemotdepasse==="")) {
        console.log("Le contenu du formulaire n'est pas valide !");
        res.render("register_form.ejs",{title:"Enregistrement"});
    } else {
        console.log(req.body);

        // Hashage du mot de passe
        const salt = genSaltSync(10);
        console.log("Mot de passe, AVANT hashage : "+lemotdepasse);
        lemotdepasse = hashSync(lemotdepasse,salt);
        console.log("Mot de passe, APRES hashage : "+lemotdepasse);

        // Création d'un utilisateur avec le modèle
        const unUser = new User({
            nom: lenom,
            email: lemail,
            motdepasse: lemotdepasse
        });

        // Rechercher si l'e-mail n'est pas déjà enregistré
        User.getUserByEmail(unUser.email, (err,data)=>{
            console.log(`User.getUserByEmail : ${err}`);
            if (err) {
                console.log("Email inconnu");
                if (err.type === "ERR_NOT_FOUND"){
                    User.insertUser(unUser, (err,data)=>{
                        if (err) {
/*
                            res.status(500).send({
                                title: "Erreur pendant getUserByEmail", message: "Erreur pendant la création de l'utilisateur dans la DB !"
                            });
*/
                            res.render('error.js',{
                                title: "Erreur 500", message: "Erreur (getUserByEmail) pendant la création de l'utilisateur dans la DB !"
                            });
                        } else {
                            console.log('Nouvel utilisateur :'+data);
                            res.redirect('/');
                        }
                    });
                } else {
/*
                    res.status(500).send({
                        title: "Erreur 500", message: "Erreur (getUserByEmail) pendant l'enregistrement d'un utilisateur"
                    });
*/                    
                    console.log("Autre erreur");
                    res.render('error.js',{
                        title: "Erreur 500", message: "Erreur (getUserByEmail) pendant l'enregistrement d'un utilisateur"
                    });
                }
            } else {
                console.log("Email connu - Données : "+data);
                if (data.nom == lenom) {
                    console.log(`${data.nom} est déjà enregistré avec cet e-mail !`);
/*
                    res.status(500).send({
                        title: "Erreur 500 pendant getUserByEmail", message: "Déjà enregistré avec cet e-mail !"
                    });
*/
                    res.render('error.js',{
                        title: "Erreur 500", message: "Déjà enregistré avec cet e-mail !"
                    });
                } else {
                    console.log("Nom inconnu");
                    User.insertUser(unUser, (err,data)=>{
                        if (err) {
/*
                            res.status(500).send({
                                title: "Erreur 500", message: "Erreur (getUserByEmail) pendant la création de l'utilisateur dans la DB !"
                            });
*/                            
                            res.render('error.js',{
                                title: "Erreur 500", message: "Erreur (getUserByEmail) pendant la création de l'utilisateur dans la DB !"
                            });
                        } else {
                            console.log('Nouvel utilisateur :'+data);
                            res.redirect('/');
                        }
                    });
                }
            }
        });
    }
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