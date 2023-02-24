class Calculator {  
  constructor() {
    const DISPLAY_SELECTOR = "#display";
    const BTN_CLEAR_SELECTOR = "#btn-clear";
    const BTN_POS_NEG_SELECTOR = "#btn-pos-neg";
    const BTN_DIVIDE_SELECTOR = "#btn-divide";
    const BTN_MULTIPLY_SELECTOR = "#btn-multiply";
    const BTN_MINUS_SELECTOR = "#btn-minus";
    const BTN_PLUS_SELECTOR = "#btn-plus";
    const BTN_EQUALS_SELECTOR = "#btn-equals";
    const BTN_BACKSPACE_SELECTOR = "#btn-backspace";
    const DARK_MODE_SWITCH_SELECTOR = "#dark-mode-switch";

    this.display = document.querySelector(DISPLAY_SELECTOR);
    this.btnClear = document.querySelector(BTN_CLEAR_SELECTOR);
    this.btnPosNeg = document.querySelector(BTN_POS_NEG_SELECTOR);
    this.btnDivide = document.querySelector(BTN_DIVIDE_SELECTOR);
    this.btnMultiply = document.querySelector(BTN_MULTIPLY_SELECTOR);
    this.btnMinus = document.querySelector(BTN_MINUS_SELECTOR);
    this.btnPlus = document.querySelector(BTN_PLUS_SELECTOR);
    this.btnEquals = document.querySelector(BTN_EQUALS_SELECTOR);
    this.btnBackspace = document.querySelector(BTN_BACKSPACE_SELECTOR);
    this.darkModeSwitch = document.querySelector(DARK_MODE_SWITCH_SELECTOR);
    this.result = 0;
    this.currentNumber = "";
    this.currentOperator = "";
    this.hapticFeedback = false;

    this.initEventListeners();
    this.checkDarkMode();

    console.log("Calculator initialized");
  }

  initEventListeners() {
    const NUMBER_BTN_SELECTOR = ".number";

    this.btnClear.addEventListener("click", () => {
      this.reset();
    });

    this.btnPosNeg.addEventListener("click", () => {
      this.currentNumber = -1 * parseFloat(this.currentNumber);
      this.updateDisplay();
      this.triggerHapticFeedback();
    });

    this.btnDivide.addEventListener("click", () => {
      this.performOperation("/");
      this.triggerHapticFeedback();
    });

    this.btnMultiply.addEventListener("click", () => {
      this.performOperation("x");
      this.triggerHapticFeedback();
    });

    this.btnMinus.addEventListener("click", () => {
      this.performOperation("-");
      this.triggerHapticFeedback();
    });

    this.btnPlus.addEventListener("click", () => {
      this.performOperation("+");
      this.triggerHapticFeedback();
    });

    this.btnEquals.addEventListener("click", () => {
      this.calculate();
      this.triggerHapticFeedback();
    });

    this.btnBackspace.addEventListener("click", () => {
      this.backspace();
    });

    this.darkModeSwitch.addEventListener("change", () => {
      this.toggleDarkMode();
      this.triggerHapticFeedback();
    });

    document.querySelectorAll(NUMBER_BTN_SELECTOR).forEach(numberBtn => {
      numberBtn.addEventListener("click", event => {
        this.addDigit(event.target.innerText);
      });
    });
  }

  checkDarkMode() {
    if (localStorage.getItem("darkMode") === "enabled") {
      this.darkModeSwitch.checked = true;
      this.toggleDarkMode();
    }
  }

  toggleDarkMode() {
    if (this.darkModeSwitch.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }

  addDigit(digit) {
    this.currentNumber += digit;
    this.updateDisplay();
  }

  performOperation(operator) { 
    if (this.currentOperator === "") {
      this.result = parseFloat(this.currentNumber);
      this.currentNumber = "";
      this.currentOperator = operator;
    } else {
      this.calculate();
      this.currentOperator = operator;
    }
  }

  calculate() {
    switch (this.currentOperator) {
      case "+":
        this.result += parseFloat(this.currentNumber);
        break;
      case "-":
        this.result -= parseFloat(this.currentNumber);
        break;
      case "*":
        this.result *= parseFloat(this.currentNumber);
        break;
      case "/":
        this.result /= parseFloat(this.currentNumber);
        break;
      default:
        this.result = parseFloat(this.currentNumber);
    }

    this.currentNumber = "";
    this.currentOperator = "";
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.value = this.currentNumber || this.result || 0;
  }

  reset() {
    this.result = 0;
    this.currentNumber = "";
    this.currentOperator = "";
    this.updateDisplay();
  }

  backspace() {
    if(this.currentNumber) {
      this.currentNumber = this.currentNumber.toString().slice(0, -1);
      this.updateDisplay();
    }
  }

  triggerHapticFeedback() {
    if (window.navigator.vibrate) {
      console.log("Haptic feedback triggered");
      window.navigator.vibrate(50);
    }
  }
}
  
  const calculator = new Calculator();
  
