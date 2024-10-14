console.log("On passe dans controllers/root.controller.js");

// on importe l'objet User et la connection à la DB au travers du modèle
const User = require("../models/user.model.js");

// Fonction pour analyser et sécuriser la requête
// équivalent au traitement PHP avec htmlspecialchars, strip_tags et trim
const htmlspecialchars = require('htmlspecialchars');

function securiserChamp(donnees) {
    console.log("Reçu = ",donnees);
    // supprimer les espaces avant et après la chaîne
    donnees = donnees.trim();
    // instruction utilisée pour supprimer les balises HTML d’une chaîne de caractères
    // <([^>]+)> : regex qui capture tout ce qui se trouve entre les chevrons < et >
    // g pour recherche globale, i pour insensible à la casse
    // La chaîne vide indique que les balises HTML trouvées doivent être remplacées par rien, c’est-à-dire supprimées.
    donnees = donnees.replace(/(<([^>]+)>)/gi,"");
    // remplacer les caractères spéciaux par leurs entités HTML correspondantes
    donnees = htmlspecialchars(donnees);

    return donnees;
}

// Route pour l'accueil
exports.home = (req, res, next) => {
    const { userId } = req.session;
    console.log("root.controller .home - userId = ",userId);

    // Si une session est déjà active, on affiche l'accueil pour utilisateur loggé
    if (userId) {
        // rechercher l'utilisateur
        User.getUserById(userId,(err,utilisateur)=>{
            if (err){
                res.status(500).send({
                    title: "Erreur 500",
                    message: "Erreur dans getUserById "
                });
            } else {
                res.render('index_admin.ejs', {title:'Express - Admin', user: utilisateur.nom })
            }
        });
    } else { // Sinon, on affiche l'accueil pour utilisateur non loggé
        res.render('index.ejs', { title: 'Express' });
    }
};

// Route pour afficher le formulaire de création d'un message
exports.form = (req, res, next) => {
    res.render('contact_form.ejs',{ title: 'Formulaire de contact' });
};

// Route pour afficher les données encodées
exports.traitement = (req, res, next) => {
    // récupération dans le formulaire du nom et du message, avec sécurisation
    let lenom = securiserChamp(req.body.nom);
    let lemessage = securiserChamp(req.body.msg);

    res.render('traiter_form.ejs', { title: "Formulaire reçu", nom:lenom, msg: lemessage});
};