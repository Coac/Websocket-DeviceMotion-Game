Websocket-DeviceMotion-Game
===========================

Un jeu réalisé pendant la nuit de l'info 2014.
Utilisation des Websocket, de l'api DeviceMotion et du Canvas2D.

But du jeu
===========================

Le héros doit aller soigner le plus rapidement les personnes atteinte d'une certaine maladie.
Mais en restant dans cette zone contaminée, il perd de la vie. Il regagne de la vie en soignant les patients, puisqu'il se retrouve de l'espoir.
Manger un Bretzel lui fait perdre des vie à cause de la transmission du virus.
Mais boire de la bière lui fait gagner en vitesse.

Le jeu se joue avec l'accéléromètre du téléphone portable utilisé, pour déplacer le médecin.

(Les sprites ne sont que des placeholders, à modifier si besoin)

Installation
===========================

Serveur NodeJS : 
- Installer NodeJS
- Installer le plugin WebSocket via npm
- Editer le fichier "nodeserver.js" pour changer de port si besoin

Serveur Web : 
- Placer les autres fichiers dans votre dossier /www 
- Changer les ports si besoin dans les fichiers "index.html" et "mobile/index.html"

Utilisation
===========================

Serveur NodeJs : 
- Lancer le serveur via la commande "node nodeserver.js"

Côté PC : 
- Lancez la page web "index.html" dans votre navigateur préféré
- La page se connecte directement sur le serveur NodeJS
- Vérifier bien que la page affiche "Status : Connected" et non "Status : Not Connected"

Côté mobile : 
- Lancez la page web "mobile/index.html" sur le navigateur de votre téléphone
- Appuyez sur le bouton "send" pour envoyer les informations de l'accéloromètre au serveur nodeJS
(Si vous voyez "null" à la place des valeurs, cela veut dire que votre mobile ne supporte pas DeviceMotion API)

Vous pouvez maintenant orienter votre mobile pour faire bouger le personnage !

