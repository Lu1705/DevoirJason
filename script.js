"use strict";

let jasonHp = 100; //Nous créons une variable pour la santé de Jason


let rôles=["sportif/ve", "riche", "gothique", "blond/e", "populaire", "skater/euse", "musicien/ne", "littéraire"]; 
//nous créons les noms des rôles que  nous mettons dans un tableau
let nomSurvivant=["Lu", "Eden", "Camille", "Alex", "Tom", "Hugo", "Benni", "Leo", "Agathe", "Aurélia", "Hélia", "Sarah"]; 
// ainsi que les noms des survivants que de même nous mettons dans un tableau

class Survivant{// nous allons également créer un classe survivant cette dernière sera défini sur plusieurs point
    constructor(){
        this.prenom=nomSurvivant[Math.floor(Math.random() * nomSurvivant.length)]; // un prénom de survivants choisi au hasard dans le tableau
        this.rôle=rôles[Math.floor(Math.random() * rôles.length)]; // un rôles qui de même va être choisi dans le tableau créé antérieurement
        /*
        Avec cette manière de faire plusieurs survivant peuvent tomber sur le même prénoms, ainsi il faudrait spécifier qu'une fois qu'un nom
        est choisi, il faut le retirer du tableau. Tout ceci est également valable pour les rôles
        pour se faire, il faudrait utiliser la commannde "splice(this.prenom,1) pour que la valeur soit seulement supprimé"
        */
        this.probaMort=Math.floor(Math.random() * 10); // un probabilité de seulement mourir (un chiffre aléatoire vaa être pris entre 1 et 10)
        this.probaEsquive=Math.floor(Math.random() * (10 - this.probaMort)); // une probabilité de d'esquiver et d'attaquer 
        this.probaDegatDead=10-this.probaMort-this.probaEsquive; // et une probabilité de mourir et d'attaquer. Ces fonctions changent à chaque parties
        this.proba = [];//cette proba va contenir les trois actions possible qui vont être incérés dans ce tableau ci dessous
        for(let i=0;i<this.probaMort;i++){
            this.proba.push("Mort");
        }
        for(let i=0;i<this.probaEsquive;i++){
            this.proba.push("Esquive");
        }
        for(let i=0;i<this.probaDegatDead;i++){
            this.proba.push("Mort+Degat");
        }
    }
}


let survivant1= new Survivant();//nous créons alors les 5 survivants
let survivant2= new Survivant();
let survivant3= new Survivant();
let survivant4= new Survivant();
let survivant5= new Survivant();

console.log(survivant1);// et on les consolees log pour que leurs prénoms, leurs rôles, et leurs stats soient affichés
console.log(survivant2);
console.log(survivant3);
console.log(survivant4);
console.log(survivant5); 

let enVie=[survivant1, survivant2, survivant3, survivant4, survivant5];//nous créons deux tableaux, un avec les vivants et un avec les morts
let nbMort=[];//ça va permettre de définir des limites aux boucles

while(jasonHp>0 && enVie.length>0){//tant que la vie de Jason et le nombres de survivants en vie n'a pas atteint 0 la boucle continue
    let survivantRandom=enVie[Math.floor(Math.random() * enVie.length)];//on créé une variable aléatoire qui va permettre de définir quel survivants se fait attaquer
    let action=survivantRandom.proba[Math.floor(Math.random() * survivantRandom.proba.length)];//et une qui va permettre de savoir quelle action il va faire 
    if(action=="Mort"){//si c'est l'action mort le nom du survivant passe du tableau des vivants au tableau des morts
        nbMort.push(survivantRandom.prenom);
        enVie.splice(enVie.indexOf(survivantRandom),1);
        console.log(`Jason a attrapé ${survivantRandom.prenom} et l'a tué.`);
    }
    if(action=="Esquive"){//s'il esquive Jason va perdre de la vie et le compteur de point de vie va annoncer combien de points de vie il lui reste
        jasonHp-=10;
        console.log(`Jason a essayé de tuer ${survivantRandom.prenom} mais ce dernier a esquivé et a infligé 10 dégats à Jason.`);
        console.log(`il reste donc ${jasonHp} points de vie à Jason.`);
    }
    if(action=="Mort+Degat"){// s'il meurt mais fait des dégats son prénom va passer suur le tableau des morts et le compteur de point de vie va apparaître
        nbMort.push(survivantRandom.prenom);
        enVie.splice(enVie.indexOf(survivantRandom),1);
        jasonHp-=15;
        console.log(`Jason a attrapé et tué ${survivantRandom.prenom} mais ce dernier avant de mourir a infligé 15 dégats à Jason.`);
        console.log(`il reste donc ${jasonHp} points de vie à Jason.`);
    }
}

if(jasonHp<=0){//finalement une fois que la boucle est finie, si la vie de Jason a atteind 0 il est annoncé que les survivants ont gagné
    console.log("Jason a été tué.");
    console.log(`Les survivants ont gagné, mais ${nbMort} ont péri durant la lutte.`);
}else{//sinon il est annoncé que Jason a éliminé tous les survivants
    console.log("Jason a éliminé tous les survivants.");
}

if(enVie != 0){// si le nombre de personnes en vie est supérieur à 0, alors le nom des survivants sera affiché
    console.log("Survivant.e.s:")
    enVie.forEach((element) => console.log(element.prenom));
} else {// sinon il sera dis que personne n'a survécu
    console.log("Ainsi personne n'a survécu à cette lutte.");
}

