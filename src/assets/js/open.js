const openSettingsBtn = document.getElementById("open-settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeBtn = document.querySelector(".close");

openSettingsBtn.addEventListener("click", function() {
  settingsModal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
  settingsModal.style.display = "none";
});

const openCalculatorBtn = document.getElementById("open-calculator-btn");
const calculatorModal = document.getElementById("calculator-modal");
const closeBtnCalc = document.querySelector(".close-calc");

openCalculatorBtn.addEventListener("click", function() {
  calculatorModal.style.display = "block";
});

closeBtnCalc.addEventListener("click", function() {
  calculatorModal.style.display = "none";
});

const openHorlogerieBtn = document.getElementById("open-horlogerie-btn");
const horlogerieModal = document.getElementById("horlogerie-modal");
const closeBtnHorlogerie = document.querySelector(".close-horlogerie");

openHorlogerieBtn.addEventListener("click", function() {
  horlogerieModal.style.display = "block";
});

closeBtnHorlogerie.addEventListener("click", function() {
  horlogerieModal.style.display = "none";
});

const openTicTacToeBtn = document.getElementById("open-tictactoe-btn");
const ticTacToeModal = document.getElementById("tictactoe-modal");
const closeBtnTicTacToe = document.querySelector(".close-tictactoe");

openTicTacToeBtn.addEventListener("click", function() {
  ticTacToeModal.style.display = "block";
});

closeBtnTicTacToe.addEventListener("click", function() {
  ticTacToeModal.style.display = "none";
});