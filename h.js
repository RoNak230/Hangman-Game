// Objective: Make a hangman game.

alert("Welcome to my Hangman game!!! Type a letter, and then press enter.");    // Intro.    

let words = ["computer", "javascript", "coding", "binary",    // Array for words.    
            "astrophysics", "photon", "parallax", "atoms", 
            "chicago", "basketball", "jordan", "mack",
            "python", "cubs", "football", "bears",
            "mathematics", "newtow", "tyson", "hawking",
            "program", "glasses", "wolves", "air",
            "black hole", "kelvin", "relativity", "law",
            "asynchronous", "function", "debugging", "modules"];

let canvas = document.querySelector("canvas").getContext("2d");    // Making canvas constants  
canvas.strokeStyle = "white";
let bodyParts = {
    post: () => {
        canvas.beginPath();
        canvas.moveTo(25, 25);
        canvas.lineTo(25, 225);
        canvas.moveTo(0, 225);
        canvas.lineTo(50, 225);
        canvas.moveTo(25, 25);
        canvas.lineTo(75, 25);
        canvas.moveTo(75, 25);
        canvas.lineTo(75, 50);  
    }, head: () => {
        canvas.arc(75, 70, 20, 0, 10);
    }, backBone: () => {
        canvas.moveTo(75, 90);
        canvas.lineTo(75, 157.5);
    }, armUno: () => {
        canvas.moveTo(75, 106.875); 
        canvas.lineTo(100, 123.75);
    }, armDos: () => {
        canvas.moveTo(75, 106.875);
        canvas.lineTo(50, 123.75)
    }, legUno: () => {
        canvas.moveTo(75, 157.5);
        canvas.lineTo(100, 196.875);
    }, legDos: () => {
        canvas.moveTo(75, 157.5);
        canvas.lineTo(50, 196.875);
    }, l: () => {
        canvas.moveTo(65, 63.75);
        canvas.lineTo(70, 68.75);
        canvas.moveTo(70, 63.75);
        canvas.lineTo(65, 68.75);
        canvas.moveTo(80, 63.75);
        canvas.lineTo(85, 68.75);
        canvas.moveTo(85, 63.75);
        canvas.lineTo(80, 68);
        canvas.moveTo(65, 80);
        canvas.lineTo(90, 80);
    }
}

function playAgain() {    // Function for playing again.
    let pA = prompt("Would you like to play again?\n    A: Yes\n    B: No");
    if (pA.toLowerCase() == "a" || pA.toLowerCase() == "yes") location.reload();
    else {
        alert("Come back soon");
        window.close();
    }
}

let randomWord = words[Math.floor(Math.random() * words.length)];    // Making more constants for funcs to access.
let textAr = document.querySelector("textarea");
let undrlines = document.getElementById("underlines");
let livesCounter = 7, bPCounter = 0;

function setUp() {    // Setting up game... making _ _ _ etc., displaying lives counter, and adding event listeners.
    textAr.focus();
    for (let i = 0; i < randomWord.length; i++) {
        let spans = document.createElement("span"), text = document.createTextNode("_ ");
        spans.append(text);
        undrlines.appendChild(spans);  
    }
    document.getElementById("lives").textContent = livesCounter;
    textAr.addEventListener("focusin", () => {
        textAr.addEventListener("keydown", () => {
            if (event.keyCode == 13) {
                event.preventDefault();
                if (!(textAr.value == "")) main(textAr.value.toLowerCase());
                textAr.value = "";   
            }
        })
    });
}

function main(letter) {    // Checking if letter chosen is in word and if result is win or lose.
    if (document.getElementById("usedWrds").textContent.includes(letter) && !(letter == "")) {
        alert("Error: You've already used the letter " + letter + ".");
    } else {
        if (randomWord.includes(letter) && /[a-z]/.test(letter)) {
            for (let i = 0; i < randomWord.length; i++) {
                if (letter == randomWord[i]) {
                    document.getElementsByTagName("span")[i].textContent = `${letter} `;
                    if (!undrlines.innerHTML.includes("_")) {
                        setTimeout(() => {
                            alert("Noice job!!! You won!!!");
                            playAgain();
                        }, 500);
                    }
                }
            }
        } else if (/[a-z]/.test(letter)) {
            let applyPart = Object.keys(bodyParts), app = bodyParts[applyPart[bPCounter]];
            app();
            bPCounter++, livesCounter--;
            document.getElementById("lives").textContent = livesCounter;
            canvas.stroke();
            document.getElementById("usedWrds").textContent += `${letter}, `;
            if (livesCounter == 0) {
                bodyParts.l();
                canvas.stroke();
                setTimeout(() => {
                    alert(`Oof take that L hutter!!! The word was ${randomWord}.`);
                    playAgain();
                }, 500);
            }
        } else alert("Error: Choose a character that is a letter.");
    }
}

setUp();