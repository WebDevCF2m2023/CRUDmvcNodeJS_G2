console.log("On passe dans controllers/root.controller.js");

exports.home = (req, res, next) => {
    res.render('index.ejs', { title: 'Express' });
};

exports.form = (req, res, next) => {
    res.render('contact_form.ejs',{ title: 'Formulaire de contact' });
};

exports.traitement = (req, res, next) => {
    let lenom = req.body.nom;
    let lemessage = req.body.msg;

    res.render('traiter_form.ejs', { title: "Formulaire reçu", nom:lenom, msg: lemessage});
};