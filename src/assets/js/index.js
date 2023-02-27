class SettingsManager {
  constructor() {
    // Get hour element
    this.hourElem = document.getElementById('hour');
    this.showHourElem = document.getElementById('show-hour');
    this.showMinuteElem = document.getElementById('show-minute');
    this.showSecondElem = document.getElementById('show-second');
    this.showHour = localStorage.getItem('showHour') === 'true';
    this.showMinute = localStorage.getItem('showMinute') === 'true';
    this.showSecond = localStorage.getItem('showSecond') === 'true';

    // Get date element
    this.dateElem = document.getElementById('date');
    this.showDateElem = document.getElementById('show-date');
    this.showYearElem = document.getElementById('show-year');
    this.showMonthElem = document.getElementById('show-month');
    this.showDayElem = document.getElementById('show-day');
    this.showDate = localStorage.getItem('showDate') === 'true';
    this.showYear = localStorage.getItem('showYear') === 'true';
    this.showMonth = localStorage.getItem('showMonth') === 'true';
    this.showDay = localStorage.getItem('showDay') === 'true';
  
    // Get vibration element
    this.vibrationElem = document.getElementById('vibration');
    this.showVibrationElem = document.getElementById('show-vibration');
    this.enableVibrationElem = document.getElementById('enable-vibration');
    this.showVibration = localStorage.getItem('showVibration') === 'true';
    this.enableVibration = localStorage.getItem('enableVibration') === 'true';

    // Get battery element
    this.batteryElem = document.getElementById('battery');
    this.enableBatteryElem = document.getElementById('show-battery');
    this.enableBattery = localStorage.getItem('enableBattery') === 'true';

    // Get delay element
    this.latencyElem = document.getElementById('latency');
    this.showLatencyElem = document.getElementById('show-latency');
    this.pingServerElem = document.getElementById('ping-server');
    this.refreshRateElem = document.getElementById('latency-refresh-rate');
    this.showLatency = localStorage.getItem('showLatency') === 'true';
    this.pingServer = localStorage.getItem('pingServer') || 'google.com';
    this.refreshRate = localStorage.getItem('refreshRate') || 1000;

    // Get lock element
    this.lockElem = document.getElementById('lock');
    this.enablePinElem = document.getElementById('lock-method-pin');
    this.enablePatternElem = document.getElementById('lock-method-pattern');
    this.enablePinLock = localStorage.getItem('enablePinLock') === 'true';
    this.enablePatternLock = localStorage.getItem('enablePatternLock') === 'true';
    
    // Get save settings button
    this.saveSettingsButton = document.getElementById('save-settings-button');
    
  }

  updateCheckboxes() {
    const showHour = localStorage.getItem('showHour') === 'true';
    const showMinute = localStorage.getItem('showMinute') === 'true';
    const showSecond = localStorage.getItem('showSecond') === 'true';
    const showDate = localStorage.getItem('showDate') === 'true';
    const showYear = localStorage.getItem('showYear') === 'true';
    const showMonth = localStorage.getItem('showMonth') === 'true';
    const showDay = localStorage.getItem('showDay') === 'true';
    const showVibration = localStorage.getItem('showVibration') === 'true';
    const enableVibration = localStorage.getItem('enableVibration') === 'true';
    const enableBattery = localStorage.getItem('enableBattery') === 'true';
    const showLatency = localStorage.getItem('showLatency') === 'true';
    const pingServer = localStorage.getItem('pingServer') || 'google.com';
    const refreshRate = localStorage.getItem('refreshRate') || 1000;
    const enablePinLock = localStorage.getItem('enablePinLock') === 'true';
    const enablePatternLock = localStorage.getItem('enablePatternLock') === 'true';

    this.showHourElem.checked = showHour;
    this.showMinuteElem.checked = showMinute;
    this.showSecondElem.checked = showSecond;
    this.showDateElem.checked = showDate;
    this.showYearElem.checked = showYear;
    this.showMonthElem.checked = showMonth;
    this.showDayElem.checked = showDay;
    this.showVibrationElem.checked = showVibration;
    this.enableVibrationElem.checked = enableVibration;
    this.enableBatteryElem.checked = enableBattery;
    this.showLatencyElem.checked = showLatency;
    this.pingServerElem.value = pingServer;
    this.refreshRateElem.value = refreshRate;
    this.enablePinElem.checked = enablePinLock;
    this.enablePatternElem.checked = enablePatternLock;
  }

  updateHour() {
    const date = new Date();
    let hourString = '';
    if (this.showHour) {
      const hours = date.getHours();
      hourString += (hours < 10 ? '0' : '') + hours + ':'; 
    }
    if (this.showMinute) {
      const minutes = date.getMinutes();
      hourString += (minutes < 10 ? '0' : '') + minutes + ':'; 
    }
    if (this.showSecond) {
      const seconds = date.getSeconds();
      hourString += (seconds < 10 ? '0' : '') + seconds;
    }
    this.hourElem.textContent = hourString;
  }


  updateDate() {
    if (this.showDate) {
      const date = new Date();
      let dateString = '';
      if (this.showDay) {
        const day = date.getDate();
        dateString += (day < 10 ? '0' : '') + day + '-';
      }
      if (this.showMonth) {
        const month = date.getMonth() + 1;
        dateString += (month < 10 ? '0' : '') + month + '-';
      }
      if (this.showYear) {
        dateString += date.getFullYear();
      }
      this.dateElem.textContent = dateString;
    } else {
      this.dateElem.textContent = '';
    }
  }

  updateVibration() {
    if ('vibrate' in window.navigator) {
      if (this.enableVibration) {
        const pattern = this.enableHapticFeedback ? [100, 50, 100] : [100];
        window.navigator.vibrate(pattern);
      }
      this.vibrationElem.textContent = 'Vibration : activée';
    } else {
      this.vibrationElem.textContent = 'La vibration n\'est pas prise en charge';
      window.navigator.vibrate(0);
    }
  }

  updateBattery() {
    if ('getBattery' in navigator && this.enableBattery) {
      navigator.getBattery().then(battery => {
        this.batteryElem.textContent = `Batterie: ${(battery.level * 100).toFixed()}%`;

        if (battery.level < 0.2 && this.enableVibration) {
          window.navigator.vibrate(1000);
        }
      });
    } else {
      this.batteryElem.textContent = 'La batterie n\'est pas prise en charge';
    }
  }

  updateLatency() {
    if (this.showLatency) {
      const pingServer = this.pingServerElem.value;
      const startTime = performance.now();
  
      fetch(`https://${pingServer}`, { mode: 'no-cors' })
        .then(() => {
          const endTime = performance.now();
          this.latency = Math.round(endTime - startTime);
          this.latencyElem.textContent = `Latence : ${this.latency} ms`;
        })
        .catch(() => {
          this.latency = null;
          this.latencyElem.textContent = 'Impossible de mesurer la latence';
        });
    } else {
      this.latencyElem.textContent = '';
    }
  }

  updateLock() {
    if (this.enablePinLock) {
      this.lockElem.textContent = 'Verrouillage: PIN';
    } else if (this.enablePatternLock) {
      this.lockElem.textContent = 'Verrouillage: Motif';
    } else {
      this.lockElem.textContent = 'Verrouillage: Aucun';
    }
  }

  saveSettings() {
    localStorage.setItem('showHour', this.showHourElem.checked);
    localStorage.setItem('showMinute', this.showMinuteElem.checked);
    localStorage.setItem('showSecond', this.showSecondElem.checked);
    localStorage.setItem('showDate', this.showDateElem.checked);
    localStorage.setItem('showYear', this.showYearElem.checked);
    localStorage.setItem('showMonth', this.showMonthElem.checked);
    localStorage.setItem('showDay', this.showDayElem.checked);
    localStorage.setItem('showVibration', this.showVibrationElem.checked);
    localStorage.setItem('enableVibration', this.enableVibrationElem.checked);
    localStorage.setItem('enableBattery', this.enableBatteryElem.checked);
    localStorage.setItem('showLatency', this.showLatencyElem.checked);
    localStorage.setItem('pingServer', this.pingServerElem.value);
    localStorage.setItem('refreshRate', this.refreshRateElem.value);
    localStorage.setItem('enablePinLock', this.enablePinElem.checked);
    localStorage.setItem('enablePatternLock', this.enablePatternElem.checked);

    console.log('Settings saved successfully.');
  }
}

// Create an instance of the Settings class
const settings = new SettingsManager();
settings.updateCheckboxes();
settings.updateHour();
setInterval(settings.updateHour.bind(settings), 1000);
settings.updateDate();
settings.updateVibration();
settings.updateBattery();
setInterval(settings.updateBattery.bind(settings), 1000);
settings.updateLatency();
setInterval(settings.updateLatency.bind(settings), settings.refreshRate * 1000);
// settings.updateLock();

settings.saveSettingsButton.addEventListener('click', () => {
  settings.saveSettings();
});

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
