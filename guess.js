// game name () 
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML =gameName;
document.querySelector("footer").innerHTML =`${gameName} Game Created By NOURHAN SALEH`;

//game options 
let numOfTries = 5;
let numOfLetters = 5;
let currentTry = 1;
let numOfHints =2 ;

let wordToGuess ="";
const words =["Alarm" ,"cover" ,"blood" ,"apple" ,"cream" ,"juice" , "sport" ];
wordToGuess =words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

document.querySelector(".hint span").innerHTML = numOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click" , getHint);

function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    for(let i = 1; i<=numOfTries; i++){
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML =`<span>try ${i}</span>`;

    if(i !== 1 ) tryDiv.classList.add("disabled-inputs");

    for (let j = 1; j<= numOfLetters; j++){
        const input =document.createElement("input");
        input.type ="text";
        input.id =`guess-${i}-letter-${j}`;
        input.setAttribute("maxLength","1");
        tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");

    inputsInDisabledDiv.forEach((input) => (input.disabled = true));

    const inputs =document.querySelectorAll("input");
    inputs.forEach((input , index) => {

        input.addEventListener("input" , function(){
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index +1];
            if (nextInput) nextInput.focus();
        });
        
        input.addEventListener("keydown" , function (event) {
            const currentIndex = Array.from(inputs).indexOf(event.target);
            
            if (event.key === "ArrowRight"){
                const nextInput = currentIndex +1 ;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft"){
                const prevInput = currentIndex -1 ;
                if(prevInput >= 0) inputs[prevInput].focus();
            }
        })
    })
}
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click" , handleGuesses);
console.log(wordToGuess);

function handleGuesses() {
    let successGuess = true ;
    for (let i = 1 ; i <= numOfLetters ; i++){

        const inputField=document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letterGuess =inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i -1];

        if (letterGuess === actualLetter){
            inputField.classList.add("yes");
        }else if (wordToGuess.includes(letterGuess) && letterGuess !== ""){
            inputField.classList.add("maybe");
            successGuess = false;
        }else{
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    if(successGuess){
        messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

        guessButton.disabled =true;
        getHintButton.disabled =true;

    }else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");

        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => (input.disabled =true));

        currentTry++;


        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled =false));

        let el = document.querySelector(`.try-${currentTry}`);
        if(el){

            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");

            el.children[1].focus();
        }else{
            guessButton.disabled =true;
            getHintButton.disabled =true;
            messageArea.innerHTML = `You lose The Word Is <span>${wordToGuess}</span>`;

        }

    }
}

function getHint() {
    if (numOfHints > 0){
        numOfHints--;
        document.querySelector(".hint span").innerHTML = numOfHints;
    }
    if (numOfHints === 0){
        getHintButton.disabled =true;
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");

    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

        if (indexToFill !== -1) {
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }
    }
}

window.onload = function () {
    generateInput();
}