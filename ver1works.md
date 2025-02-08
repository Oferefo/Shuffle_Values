<!DOCTYPE html>
<html>
<head>
    <title>Music Shuffle App</title>
    <script>
        let notes = {
            "C,D,E": ["C", "D", "E", "F", "G", "A"],
            "Do,Re,Mi": ["Do", "Re", "Mi", "Fa", "Sol", "La"]
        };
        
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
        function loadNotes() {
            let selection = document.getElementById("notationSelect").value;
            let shuffledNotes = [...notes[selection]];
            shuffle(shuffledNotes);
            
            let buttonsContainer = document.getElementById("buttonsContainer");
            buttonsContainer.innerHTML = "";
            shuffledNotes.forEach(note => {
                let button = document.createElement("button");
                button.innerText = note;
                button.onclick = () => checkAnswer(note);
                buttonsContainer.appendChild(button);
            });
        }
        
        function checkAnswer(note) {
            let correctOrder = notes[document.getElementById("notationSelect").value];
            let inputArea = document.getElementById("answerContainer");
            inputArea.innerHTML += note + " ";
            
            let userInput = inputArea.innerText.trim().split(" ");
            if (userInput.length === correctOrder.length) {
                if (JSON.stringify(userInput) === JSON.stringify(correctOrder)) {
                    alert("Very Good! Let's Shuffle Again!");
                } else {
                    alert("Try Again");
                }
                inputArea.innerHTML = "";
            }
        }
    </script>
</head>
<body>
    <h1>Music Shuffle App</h1>
    <label>Select Notation:</label>
    <select id="notationSelect" onchange="loadNotes()">
        <option value="C,D,E">C,D,E</option>
        <option value="Do,Re,Mi">Do,Re,Mi</option>
    </select>
    <button onclick="loadNotes()">Shuffle</button>
    
    <div id="buttonsContainer" style="margin-top: 20px;"></div>
    <h3>Your Answer:</h3>
    <div id="answerContainer" style="font-size: 20px; font-weight: bold;"></div>
</body>
</html>
