/*jshint esversion: 6*/

document.addEventListener("DOMContentLoaded", function () {
    //Get hero objects in array
    let heroArr = [];
    heroArr.push({
        name: "THOR",
        pic: "assets/images/heroImages/thor.jpg"
    });
    heroArr.push({
        name: "IRON MAN",
        pic: "assets/images/heroImages/ironMan.jpg"
    });
    heroArr.push({
        name: "HULK",
        pic: "assets/images/heroImages/hulk.jpg"
    });
    heroArr.push({
        name: "SCARLET WITCH",
        pic: "assets/images/heroImages/scarletWitch.jpg"
    });
    heroArr.push({
        name: "DR STRANGE",
        pic: "assets/images/heroImages/drStrange.jpg"
    });
    heroArr.push({
        name: "SPIDER MAN",
        pic: "assets/images/heroImages/spiderMan.png"
    });
    heroArr.push({
        name: "BLACK PANTHER",
        pic: "assets/images/heroImages/blackPanther.jpg"
    });
    heroArr.push({
        name: "BLACK WIDOW",
        pic: "assets/images/heroImages/blackWidow.jpg"
    });
    heroArr.push({
        name: "CAPTAIN AMERICA",
        pic: "assets/images/heroImages/captainAmerica.jpg"
    });
    heroArr.push({
        name: "HAWKEYE",
        pic: "assets/images/heroImages/hawkeye.jpg"
    });

    let randAnswer = heroArr[[Math.floor(Math.random() * heroArr.length)]].name;
    let answerLetters = Array.from(randAnswer);

    let possibleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    let incorrectLetters = [];
    let correctLetters = [];
    let wrongCount = 0;
    let gameWon = false;
    let gameLost = false;
    let image = document.querySelector(".hangmanImage");

    let gameAnswer = [];
    for (let i = 0; i < randAnswer.length; i++) {
        if (answerLetters[i] !== " ") {
            gameAnswer[i] = "-";
        }
        else {
            gameAnswer[i] = " ";
        }
    }
    let answerDiv = document.createElement("div");
    answerDiv.innerText = gameAnswer.join("");
    document.querySelector(".answer-letters").appendChild(answerDiv);

    //Event listener for player
    document.addEventListener("keydown", function (event) {
        if (gameWon === false && gameLost === false) {
            document.querySelector(".alert").innerHTML = "";
            let playerGuess = String.fromCharCode(event.which);
            if (correctLetters.includes(playerGuess) || incorrectLetters.includes(playerGuess)) {
                // Build prev guessed banner
                let alertDiv = document.createElement("div");
                alertDiv.className = ".alert alert-warning prev";
                let alertHeader = document.createElement("h4");
                alertHeader.className = ".alert-heading";
                alertHeader.innerText = "Letter already guessed!";
                alertDiv.appendChild(alertHeader);
                let alertParagraph = document.createElement("p");
                alertParagraph.innerText = "Please try a new letter";
                alertDiv.appendChild(alertParagraph);
                document.querySelector(".alert").appendChild(alertDiv);
            }
            else if (!possibleLetters.includes(playerGuess)) {
                // Build invalid banner
                let alertDiv = document.createElement("div");
                alertDiv.className = ".alert alert-warning invalid";
                let alertHeader = document.createElement("h4");
                alertHeader.className = ".alert-heading";
                alertHeader.innerText = "Invalid guess!";
                alertDiv.appendChild(alertHeader);
                let alertParagraph = document.createElement("p");
                alertParagraph.innerText = "Please try a letter in the US alphabet.";
                alertDiv.appendChild(alertParagraph);
                document.querySelector(".alert").appendChild(alertDiv);

            }
            else {
                if (answerLetters.includes(playerGuess)) {
                    document.querySelector(".correct-letters").innerText += playerGuess;
                    for (let i = 0; i < answerLetters.length; i++) {
                        if (playerGuess === answerLetters[i]) {
                            gameAnswer[i] = answerLetters[i];
                        }
                    }
                    correctLetters.push(playerGuess);

                    document.querySelector(".answer-letters").innerText = gameAnswer.join("");

                }
                else {
                    wrongCount++;
                    document.querySelector(".incorrect-letters").innerText += playerGuess;
                    incorrectLetters.push(playerGuess);

                    if (wrongCount === 6) {
                        gameLost = true;

                        // Build lose banner
                        document.querySelector(".alert").innerHTML = "";
                        let alertDiv = document.createElement("div");
                        alertDiv.className = ".alert alert-danger";
                        let alertHeader = document.createElement("h4");
                        alertHeader.className = ".alert-heading";
                        alertHeader.innerText = "You lose!";
                        alertDiv.appendChild(alertHeader);
                        let alertParagraph = document.createElement("p");
                        alertParagraph.innerText = "Thanos wiped out everyone!";
                        alertDiv.appendChild(alertParagraph);
                        document.querySelector(".alert").appendChild(alertDiv);

                        image.src = "assets/images/gameOverImages/gameLose.png";
                    }
                }

                //Check if game has been won
                if (answerLetters.join(",") === gameAnswer.join(",")) {
                    gameWon = true;

                    // Build win banner
                    document.querySelector(".alert").innerHTML = "";
                    let alertDiv = document.createElement("div");
                    alertDiv.className = ".alert alert-success";
                    let alertHeader = document.createElement("h4");
                    alertHeader.className = ".alert-heading";
                    alertHeader.innerText = "You win!";
                    alertDiv.appendChild(alertHeader);
                    let alertParagraph = document.createElement("p");
                    let nameBuilder = gameAnswer;
                    for (let i = 0; i < nameBuilder.length; i++) {
                        if (i !== 0 && nameBuilder[i - 1] !== " ") {
                            nameBuilder[i] = nameBuilder[i].toLowerCase();
                        }
                    }
                    alertParagraph.innerText = nameBuilder.join("") + " saved the day!";
                    alertDiv.appendChild(alertParagraph);
                    document.querySelector(".alert").appendChild(alertDiv);
                    image.src = findPicByName(heroArr, randAnswer);

                }
            }

            if (gameWon === false && gameLost === false)
                switch (wrongCount) {
                    case 0:
                        image.src = "assets/images/hangmanImages/1.PNG";
                        break;
                    case 1:
                        image.src = "assets/images/hangmanImages/2.PNG";
                        break;
                    case 2:
                        image.src = "assets/images/hangmanImages/3.PNG";
                        break;
                    case 3:
                        image.src = "assets/images/hangmanImages/4.PNG";
                        break;
                    case 4:
                        image.src = "assets/images/hangmanImages/5.PNG";
                        break;
                    case 5:
                        image.src = "assets/images/hangmanImages/6.PNG";
                        break;
                    case 6:
                        image.src = "assets/images/hangmanImages/7.PNG";
                        break;
                    default:
                        image.src = "assets/images/hangmanImages/7.PNG";
                        break;
                }
            // Set image based on wrongCount
            document.getElementsByTagName("img")[0].setAttribute("src", image.src);


        }
    });

    document.querySelector(".reset-button").addEventListener("click", function () {
        randAnswer = heroArr[[Math.floor(Math.random() * heroArr.length)]].name;
        answerLetters = Array.from(randAnswer);

        incorrectLetters = [];
        correctLetters = [];
        wrongCount = 0;
        gameWon = false;
        gameLost = false;

        gameAnswer = [];
        for (let i = 0; i < randAnswer.length; i++) {
            if (answerLetters[i] !== " ") {
                gameAnswer[i] = "-";
            }
            else {
                gameAnswer[i] = " ";
            }
        }
        document.querySelector(".answer-letters").innerText = gameAnswer.join("");
        document.querySelector(".incorrect-letters").innerText = [];
        let incorDiv = document.createElement("h3");
        incorDiv.innerText = "Incorrect";
        document.querySelector(".incorrect-letters").appendChild(incorDiv);

        document.querySelector(".correct-letters").innerText = [];
        let corDiv = document.createElement("h3");
        corDiv.innerText = "Correct";
        document.querySelector(".correct-letters").appendChild(corDiv);

        image.src = "assets/images/hangmanImages/1.PNG";
        document.getElementsByTagName("img")[0].setAttribute("src", image.src);
        document.querySelector(".alert").innerHTML = "";
    });
});

function findPicByName(array, nameValue) {
    for (let j = 0; j < array.length; j++) {
        if (array[j].name === nameValue) {
            return array[j].pic;
        }
    }
    return "wtf";
}