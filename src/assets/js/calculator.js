class Calculator {
  constructor() {
    this.currentValue = 0;
    this.operation = null;
    this.pendingValue = null;
    this.displayElem = document.getElementById('display');
    this.db = null;
    this.openDatabase();
    this.initEventListeners();
  }

  // function to open the database and create the object store if it doesn't exist
  openDatabase() {
    const request = window.indexedDB.open('CalculatorDB', 1); 
    request.onerror = () => console.error('Failed to open database'); 
    request.onsuccess = () => {
      console.log('Database opened successfully');
      this.db = request.result;
    };
    request.onupgradeneeded = (event) => {
      console.log('Upgrading database');
      const db = event.target.result;
      db.createObjectStore('calculations', { keyPath: 'id', autoIncrement: true }); 
    };
  }

  initEventListeners() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.textContent;
        switch (value) {
          case '+':
          case '-':
          case '*':
          case '/':
            this.handleOperation(value);
            break;
          case '=':
            this.handleEquals();
            break;
          case 'C':
            this.handleClear();
            break;
          case '+/-':
            this.handleNegate();
            break;
          case '.':
            this.handleDecimal();
            break;
          case '':
            this.handleBackspace();
            break;
          default:
            this.handleNumber(value);
        }
        this.updateVibration();
      });
    });
  }

  handleNumber(value) {
    if (this.currentValue === 0) {
      this.currentValue = value;
    } else {
      this.currentValue += value;
    }
    this.updateDisplay();
  }

  handleOperation(op) {
    if (this.pendingValue !== null) {
      this.handleEquals();
    }
    this.pendingValue = this.currentValue;
    this.currentValue = 0;
    this.operation = op;
  }

  handleEquals() {
    if (this.operation === null) {
      return;
    }
    const val1 = parseFloat(this.pendingValue);
    const val2 = parseFloat(this.currentValue);
    let result;
    switch (this.operation) {
      case '+':
        result = val1 + val2;
        break;
      case '-':
        result = val1 - val2;
        break;
      case '*':
        result = val1 * val2;
        break;
      case '/':
        result = val1 / val2;
        break;
      default:
        return;
    }
    this.saveCalculation(val1, this.operation, val2, result);
    this.pendingValue = null;
    this.currentValue = result;
    this.operation = null;
    this.updateDisplay();
  }

  handleClear() {
    this.currentValue = 0;
    this.pendingValue = null;
    this.operation = null;
    this.updateDisplay();
  }

  handleNegate() {
    this.currentValue = -parseFloat(this.currentValue);
    this.updateDisplay();
  }

  handleDecimal() {
    if (this.currentValue.indexOf('.') === -1) {
      this.currentValue += '.';
    }
    this.updateDisplay();
  }

  handleBackspace() {
    if (this.currentValue === 0) {
      return;
    }
    this.currentValue = this.currentValue.toString().slice(0, -1);
    if (this.currentValue === '') {
      this.currentValue = 0;
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.displayElem.value = this.currentValue;
  }

  saveCalculation(val1, op, val2, result) {
    const calculation = {
      value1: val1,
      operator: op,
      value2: val2,
      result: result,
      timestamp: new Date()
    };
    const transaction = this.db.transaction(['calculations'], 'readwrite');
    const store = transaction.objectStore('calculations');
    const request = store.add(calculation);
    request.onerror = () => console.error('Failed to save calculation');
    request.onsuccess = () => console.log('Calculation saved successfully');
  }
}

const calculator = new Calculator();