// Minuteur
function minuteur() {
const departMinutes = document.getElementById("input").value
    let temps = departMinutes * 60

    const timerElement = document.getElementById("timer")
    let interval = setInterval(() => {
        let minutes = parseInt(temps / 60, 10)
        let secondes = parseInt(temps % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        secondes = secondes < 10 ? "0" + secondes : secondes

        timerElement.innerText = `${minutes}:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1

        if (temps === 0) {
            clearInterval(interval)
            document.getElementById("xyz").play();
            timerElement.innerText = "00:00";
            if (Notification.permission === "granted") {
            var notification = new Notification("Le minuteur est terminé !");
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                var notification = new Notification("Le minuteur est terminé !");
            }
            });

        }
        }
    }, 1000)
}

function stop() {
    document.getElementById('xyz').pause()
}

// Chronomètre
// initialisation des variables
/* jshint expr: true */
var centi = 0;
var mili = 0;
var sec = 0;
var sec_;
var afficher;
var compteur;

// affichage du compteur à 0
document.getElementById('time').innerHTML = "0" + sec + ":" + "0" + mili;

function chrono() {
    setInterval(function (){
        mili++;
            if (mili > 9) {
                mili = 0;
            }
    }, 1);
    
    centi++;
    centi*10;//=======pour passer en dixièmes de sec
    //=== on remet à zéro quand on passe à 1seconde
    if (centi > 9) {
        centi = 0;
        sec++;
    }  

    if (sec < 10) {
        sec_ = "0" + sec;
    }
    else {
        sec_ = sec;
    }
        
    afficher = sec_ + ":" + centi + mili;
    document.getElementById("time").innerHTML = afficher;
    
    reglage = window.setTimeout("chrono();",100);
} 


function debut()  //== Activation et désactivation des boutons
{
    document.parametre.lance.disabled = "disabled";
    document.parametre.pause.disabled = "";
    document.parametre.zero.disabled = "";
    document.parametre.intermediaire.disabled = "";
    document.parametre.rappel.disabled = "";
}
function arret() 
{	
    window.clearTimeout(reglage);
    document.parametre.lance.disabled = "";
    document.parametre.pause.disabled = "disabled";
    document.parametre.zero.disabled = "";
    document.parametre.intermediaire.disabled = "";
    document.parametre.rappel.disabled = "";
}
    
function raz() //====pour remettre à zéro
{ 
    document.parametre.zero.disabled = "disabled";
    document.parametre.intermediaire.disabled = "disabled";
    document.parametre.rappel.disabled = "disabled";
    centi = 0;
    mili = 0;
    sec = 0;
    compteur = "aucun temps intermediaire enregistré";
    afficher = sec + "0:" + centi + mili;	
    document.getElementById("time").innerHTML = afficher;
    document.getElementById('presenter').style.visibility='hidden';
    document.getElementsByName('intermediaire')[0].style.backgroundColor = 'rgba(50,205,50, 0.25)';
}
    
function inter() //==== Pour afficher le temps intermédiaire
{
    compteur = document.getElementById("time").innerHTML;
    document.getElementsByName('intermediaire')[0].style.backgroundColor = "orange";
}

function rappeler() {
    document.getElementById('presenter').style.visibility='visible';
    document.getElementById('interm').innerHTML = compteur;
    document.getElementsByName('intermediaire')[0].style.backgroundColor = 'rgba(50,205,50, 0.25)';
}

// Horloge
function refresh(){
    var t = 1000;
    setTimeout('Horloge()',t)
}

function Horloge() {
    var date = new Date()
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if( h < 10 ){ h = '0' + h; }
    if( m < 10 ){ m = '0' + m; }
    if( s < 10 ){ s = '0' + s; }
    var time = h + ':' + m + ':' + s
    document.getElementById('horloge').innerHTML = time;
    refresh();
}

// if minuteur-btn clicked then show minuteur
document.getElementById("minuteur-btn").addEventListener("click", function() {
    document.getElementById("minuteur").style.display = "block";
    document.getElementById("chrono").style.display = "none";
    document.getElementById("horloge").style.display = "none";
});

// if chronometre-btn clicked then show chronometre
document.getElementById("chrono-btn").addEventListener("click", function() {
    document.getElementById("minuteur").style.display = "none";
    document.getElementById("chrono").style.display = "block";
    document.getElementById("horloge").style.display = "none";
});

// if horloge-btn clicked then show horloge
document.getElementById("horloge-btn").addEventListener("click", function() {
    document.getElementById("minuteur").style.display = "none";
    document.getElementById("chrono").style.display = "none";
    document.getElementById("horloge").style.display = "block";
});

Horloge();