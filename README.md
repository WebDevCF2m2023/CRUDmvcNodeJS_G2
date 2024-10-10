# CRUDmvcNodeJS_G2
CRUD MVC Node.JS Express MySQL

## Remplacer le fichier config/dbconfig.js par un fichier .env
- D'abord installer le module dotenv
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

## Mise en place du mécanisme des sessions
- ajouter des constantes dans app.js et des paramètres dans .env
- définition du sessionStore dans app.js