let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    loss: 0,
    tie: 0,
    count: 0
};


updateScore();

let pmove;
function getCompRes(move){
    pmove = move;
    let res="";
    let cmove="";
    const rnum = Math.random();
    if(rnum >= 0 && rnum < 1/3) cmove="rock";
    else if(rnum >= 1/3 && rnum < 2/3) cmove = "paper";
    else if(rnum >= 2/3 && rnum < 1) cmove = "scissors";
    
    switch(pmove){
       case "rock":
        if(cmove === pmove) res = "tie";
        else if(cmove === "scissors") res="win";
        else res="lose"; 
        break;              
       case "paper": 
       if(cmove === pmove) res = "tie";
        else if(cmove === "rock") res="win";
        else res="lose"; 
        break;   
       case "scissors":
        if(cmove === pmove) res = "tie";
        else if(cmove === "paper") res="win";
        else res="lose"; 
        break;    
    }
    
    // update score
    if(res === "win") score.win += 1;
    else if(res === "tie") score.tie += 1;
    else if(res === "lose") score.loss += 1;
    score.count += 1;
    updateScore();
    
    //store updated score in local storage
    localStorage.setItem("score", JSON.stringify(score));
    
    // show result
    let res2 = document.querySelector(".res2");
    res2.innerHTML = `Result: ${res}`;
    
    //show moves
    let moves = document.querySelector(".moves");
    moves.innerHTML = `<pre>Moves: your move     computer's move <br>
       <img src="../images/${pmove}-emoji.png" class="simg">        <img src="../images/${cmove}-emoji.png" class="simg"> </pre>`;
}

function resetScore(){
    score.win = 0 ;
     score.loss = 0;
     score.tie = 0;
     score.count = 0; 
    localStorage.removeItem("score");
}

function updateScore(){
    let points = document.querySelector(".points");
    // document.querySelector(".count").innerHTML = `Attempts: ${score.count} `;
    points.innerHTML = `<br>Score : win - ${score.win}, loss - ${score.loss}, draw - ${score.tie}`;
}

let aPlay = false;
let intervalId;
function autoPlay(){
    if(aPlay === true){
       let rnum2 = Math.random();
       if(rnum2 >= 0 && rnum2 < 1/3) pmove="rock";
       else if(rnum2 >= 1/3 && rnum2 < 2/3) pmove = "paper";
       else if(rnum2 >= 2/3 && rnum2 < 1) pmove = "scissors";
       getCompRes(pmove);
    } 
}

function startInterval(){
   intervalId = setInterval(autoPlay,3000);
}
function closeInterval(){
    aPlay = false;
    clearInterval(intervalId);
}

//speech reognition
let speechStart = false;
let recognition;

function startSpeechRecognition() {
    if (speechStart === false) {
        speechStart = true;
        if (!('webkitSpeechRecognition' in window)) {
            alert("You don't have speech API ");
        } else {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";
            recognition.onstart = function() {
                console.log("Speech recognition has started...");
            }
            
            recognition.onresult = function(event) {
                let text = event.results[event.resultIndex][0].transcript;
                   if (text.trim().toLowerCase().includes("rock")) {
                       document.querySelector("#r").click();
                   } 
                    if (text.trim().toLowerCase().includes("paper")) {
                       document.querySelector("#p").click();
                   } 
                   if(text.trim().toLowerCase().includes("scissor") || text.trim().toLowerCase().includes("scissors")) { 
                       document.querySelector("#s").click();
                   }
                }    
            recognition.start();
        }       
    } else if (speechStart === true) {
        if (recognition != null) {
            speechStart = false;
            recognition.stop();
            console.log("Speech recognition has stopped!");
        }
    }
}

