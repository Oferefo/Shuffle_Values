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

        // Use the second array in notesSets for button labels
        notesSets[selectedSet][1].forEach((label) => {
            let button = document.createElement("button");
            button.innerText = label; // Set the button text to the label
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
        showMessage("❌ Try Again", "red");
    }
}

function checkWin() {
    let correctButtons = document.querySelectorAll(".note-button.correct");
    if (correctButtons.length === shuffledNotes.length) {
        showMessage("✅ Very Good! Let's Shuffle Again!", "green");
        setTimeout(shuffleNotes, 2000); // Shuffle again after 2 seconds
    }
}

function showMessage(message, color) {
    let messageElement = document.getElementById("message");
    messageElement.innerText = message;
    messageElement.style.color = color;
    messageElement.style.display = "block"; // Show the message

    // Hide the message after 2 seconds
    setTimeout(() => {
        messageElement.style.display = "none";
    }, 2000);
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("shuffle-button").onclick = shuffleNotes;
    document.getElementById("notation-select").onchange = function (e) {
        selectedSet = e.target.value;
        shuffleNotes();
    };
    shuffleNotes();
});