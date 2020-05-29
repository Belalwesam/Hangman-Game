//dom elements
const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-btn");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finaleMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

//The words to be gussed
const words = ["application", "programming", "interface", "wizard"];

//choosing a rendom word from the array
let selectedWord = words[Math.floor(Math.random() * words.length)];

//correct letters will be stored here
const correctLetters = [];
//wrong letters will be stored here
const wrongLetters = [];

//update The wrong letters
function updateWrongLetter() {
  //display wrong letters
  wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>wrong</p>" : ""}
        ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;
  //display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //in case of losing
  if (wrongLetters.length === figureParts.length) {
    finaleMessage.innerText = "You lost!The man was hanged";
    popup.style.display = "flex";
  }
}
//function show notification
function showNotifaication() {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}
//show the hidden word
function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  const innerWord = wordElement.innerText.replace(/\n/g, "");
  //to check for winning
  if (innerWord === selectedWord) {
    finaleMessage.innerText = "Congrats! You won!";
    popup.style.display = "flex";
  }
}

//key down letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotifaication();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetter();
      }
    }
  }
});

//for restarting the game and play again
playAgainBtn.addEventListener("click", () => {
  //empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetter();
  popup.style.display = "none";
});

//should be always called to display the animation
displayWord();
