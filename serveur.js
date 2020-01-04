var personnages = require("./personnages.json");
var classes = require("./classes.json");

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get(['/','/index'],function(req, res){
    var obj = {
        nom : "Matthieu",
        age : 31
    }
    res.render('index',obj);
})

app.get('/personnages',function(req, res){
    res.render('personnages',{mesPersos : personnages,mesClasses : classes});
})
app.post('/personnages',function(req, res){
    var monPersonnage = req.body.perso;
    var maClasse = req.body.classe;
    console.log(maClasse);

    personnages[monPersonnage].classe= parseInt(maClasse);
    fs.writeFileSync('personnages.json',JSON.stringify(personnages,undefined,4));
    res.render('personnages',{mesPersos : personnages,mesClasses : classes});
})

app.get('/personnage',function(req, res){
    var idPerso = req.query.perso;
    res.render('personnage',{perso : personnages[idPerso]});
})

app.post('/personnage', function (req, res){
   var monArme = req.body.arme;
   var monPerso = req.body.perso;

   var perso;
   for(perso in personnages){
        if(monPerso === personnages[perso].nom){
            personnages[perso].arme = monArme;
            break;
        }
   }
   fs.writeFileSync('personnages.json',JSON.stringify(personnages,undefined,4));
   res.render('personnage',{perso : personnages[perso]});
})

app.get('/classe',function(req, res){
    var nomClasse = req.query.nom;
    res.render('classe',{classe : classes[nomClasse], modification:false});
})

app.post('/classe',function(req, res){
    var maClasse = req.body.nom;
    var maDescription = req.body.description;

    var classe;
    for(classe in classes){
        if(maClasse === classes[classe].nom){
            classes[classe].description = maDescription;
            break;
        }
    }
   fs.writeFileSync('classes.json',JSON.stringify(classes,undefined,4));
   res.render('classe',{classe : classes[classe], modification:true});
})

app.listen(9090, function(){
    console.log("Mon serveur écoute sur le port 9090!")
})