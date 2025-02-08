const notesSets = {
  "C,D,E": [
      ["C", "D", "E", "F", "G", "A"],
      ["Do", "Re", "Mi", "Fa", "Sol", "La"]
  ],
  "Do,Re,Mi": [
      ["Do", "Re", "Mi", "Fa", "Sol", "La"],
      ["C", "D", "E", "F", "G", "A"]
  ]
};

let selectedSet = "C,D,E";
let shuffledNotes = [];

function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function shuffleNotes() {
  shuffledNotes = shuffleArray(notesSets[selectedSet][0]);
  renderGame();
}

function renderGame() {
  let container = document.getElementById("notation-area");
  container.innerHTML = "";

  shuffledNotes.forEach((note, index) => {
      let column = document.createElement("div");
      column.classList.add("column");

      let noteElement = document.createElement("div");
      noteElement.classList.add("note");
      noteElement.innerText = note;
      column.appendChild(noteElement);

      notesSets[selectedSet][1].forEach((label) => {
          let button = document.createElement("button");
          button.innerText = label;
          button.classList.add("note-button");
          button.onclick = function () { checkAnswer(note, label, button); };
          column.appendChild(button);
      });

      container.appendChild(column);
  });
}

function checkAnswer(note, selected, button) {
  let correctIndex = notesSets[selectedSet][0].indexOf(note);
  let correctAnswer = notesSets[selectedSet][1][correctIndex];

  if (selected === correctAnswer) {
      button.classList.add("correct");
      button.innerText += " ✅";
      checkWin();
  } else {
      button.classList.add("wrong");
      alert("Try again!");
  }
}

function checkWin() {
  let correctButtons = document.querySelectorAll(".note-button.correct");
  if (correctButtons.length === shuffledNotes.length) {
      setTimeout(() => alert("Very good! Let's shuffle again!"), 500);
      setTimeout(shuffleNotes, 2000);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("shuffle-button").onclick = shuffleNotes;
  document.getElementById("notation-select").onchange = function (e) {
      selectedSet = e.target.value;
      shuffleNotes();
  };
  shuffleNotes();
});