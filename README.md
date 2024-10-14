# CRUDmvcNodeJS_G2
CRUD MVC Node.JS Express MySQL

## Remplacer le fichier config/dbconfig.js par un fichier .env
- D'abord installer le module dotenv  
voir : https://www.npmjs.com/package/dotenv  
- Ensuite reprendre les données de configuration et les écrire dans le fichier .env
- Supprimer dossier et fichiers (config/dbconfig.js)
- Enfin modifier le code pour utiliser ce fichier .env

## Ajouter une table users dans la DB pour gérer les utilisateurs
- scripts dans le dossier data
    - contacts.sql (création de la DB et table des messages)
    - users.sql (table des utilisateurs)

## Nouvelles routes pour gérer les utilisateurs
- modifier le fichier app.js
- ajouter le fichier routes/users.js

## Nouveau modèle pour gérer la table users
- ajouter le fichier models/user.model.js

## Nouveau contrôleur pour gérer les utilisateurs
- ajouter le fichier controllers/user.controller.js

## Nouvelles vues pour l'enregistrement et la connexion
- ajouter le fichier views/index_admin.ejs (page d'accueil d'un utilisateur connecté)
- ajouter le fichier views/register_form.ejs (formulaire d'enregistrement)
- ajouter le fichier views/login_form.ejs (formulaire de connexion)
- modifier le fichier views/index.ejs (page d'accueil - utilisateur non connecté)

## Nouveaux packages pour utiliser les sessions
- installer express-session
- installer express-mysql-session
- installer cors  
(c'est-à-dire : npm install --save cors express-session express-mysql-session)  
voir : https://www.npmjs.com/package/cors

## Mise en place du mécanisme des sessions
- ajouter des constantes dans app.js et des paramètres dans .env
- définition du sessionStore dans app.js  
voir : https://www.npmjs.com/package/express-session  
voir : https://www.npmjs.com/package/express-mysql-session  

## Compléter controllers/user.controller.js

- installer le package bcrypt pour gérer le cryptage du mot de passe  
  ( npm install --save bcrypt )  
  voir : https://www.npmjs.com/package/bcrypt

- compléter les méthodes du contrôleur (enregistrement, login et logout) 

## Sécuriser les champs de formulaire

- installer le module htmlspecialchars avec npm  
(le module htmlspecialchars en JavaScript est utilisé pour encoder les caractères spéciaux en entités HTML, ce qui est particulièrement utile pour prévenir les attaques de type injection de code, voir : https://www.npmjs.com/package/htmlspecialchars )
- modifier le formulaire de création d'un message

## Tester si l'utilisateur est loggé ou non

- ajoute un middleware pour tester si une session est active (utilisateur loggé)
- modifier les routes message pour définir celles qui sont publiques ou privées
