// import * as Sentry from "@sentry/browser";
// import { BrowserTracing } from "@sentry/tracing";

export default class SettingsManager {
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
    this.refreshRate = localStorage.getItem('refreshRate') || 1;

    // Get theme element
    this.themeElem = document.getElementById('theme');
    this.theme = localStorage.getItem('theme') === 'true';
  
    // Get lock element
    this.lockElem = document.getElementById('lock');
    this.enablePinElem = document.getElementById('lock-method-pin');
    this.enablePatternElem = document.getElementById('lock-method-pattern');
    this.enablePinLock = localStorage.getItem('enablePinLock') === 'true';
    this.enablePatternLock = localStorage.getItem('enablePatternLock') === 'true';
    
    // Get save settings button
    this.saveSettingsButton = document.getElementById('save-settings-button');
}

  // initSentry() {
  //   Sentry.init({
  //     dsn: "https://afdf00511842421a9d7497493afda5c2@o4504753336680448.ingest.sentry.io/4504753343627264",
  //     integrations: [new BrowserTracing()],
    
  //     // Set tracesSampleRate to 1.0 to capture 100%
  //     // of transactions for performance monitoring.
  //     // We recommend adjusting this value in production
  //     tracesSampleRate: 1.0,
  //   });
  // }

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
    const refreshRate = localStorage.getItem('refreshRate') || 1;
    const theme = localStorage.getItem('theme') === 'true';
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
    this.themeElem.checked = theme;
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

    if (this.showVibration) {
      this.vibrationElem.style.display = 'block';
    } else {
      this.vibrationElem.style.display = 'none';
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

  updateTheme() {
    if (this.theme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
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
    localStorage.setItem('theme', this.themeElem.checked);
    localStorage.setItem('enablePinLock', this.enablePinElem.checked);
    localStorage.setItem('enablePatternLock', this.enablePatternElem.checked);
    // console.log('Settings saved successfully.');
  }
}

// Create an instance of the Settings class
const settings = new SettingsManager();
// settings.initSentry();
settings.updateCheckboxes();
settings.updateTheme();
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
  // try {
  //   console.log('Saving settings...');

    settings.saveSettings();
  // } catch (error) {
  //   Sentry.captureException(error);
  // }
});


