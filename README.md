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
