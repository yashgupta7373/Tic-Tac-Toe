let boxes = document.querySelectorAll(".box");
let turn = document.getElementById("turn");
const reStart = document.getElementById("restart");
const newGame = document.getElementById("new-game");
const themeBtn = document.querySelector(".theme");
let count=0;
let player1name = "Player 1";
let player2name = "Player 2";
let player1score = 0;
let player2score = 0;
let drawGame = 0;
const modal = document.getElementById("name-modal");
const startBtn = document.getElementById("start-game");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const player1nameDisplay = document.getElementById("p1name");
const player2nameDisplay = document.getElementById("p2name");
const player1scoreDisplay = document.getElementById("p1score");
const player2scoreDisplay = document.getElementById("p2score");
const drawScoreDisplay = document.getElementById("drawScore");


let player1 = true; //O

const winPattern =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startBtn.addEventListener("click", ()=>{
    document.getElementById("click2").play();
    player1name = player1Input.value.trim() || "Player 1";
    player2name = player2Input.value.trim() || "Player 2";
    modal.classList.remove("active");
    resetGame();
    turn.innerText = `${player1name}'s Turn (X)`;
    player1nameDisplay.innerText = `${player1name} (X)`;
    player2nameDisplay.innerText = `${player2name} (O)`;

});
// Listen for Enter key globally when modal is active
// document.addEventListener("keydown", (e) => {
//     if (modal.classList.contains("active") && e.key === "Enter") {
//         e.preventDefault(); // Prevent accidental form submission
//         startBtn.click();
//     }
// });
// Trigger start button click on Enter key press in either input
[player1Input, player2Input].forEach(input => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if(player1Input.value.trim()!='' && player2Input.value.trim()!=''){
                startBtn.click();
            }
        }
    });
});


// turn.innerText="Player 1's Turn (X)";
boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        document.getElementById("click").play();
        if(player1){
            turn.innerText = `${player2name}'s Turn (O)`;
            box.innerText = "X";
            player1 = false
        }else{
            turn.innerText = `${player1name}'s Turn (X)`;
            box.innerText = "O";
            player1 = true;
        }
        count++;
        box.style.pointerEvents="none";

        checkWinner();
    });
});

//check winner
const checkWinner=()=>{
    let win = false;
    for(let pattern of winPattern){
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if(position1!="" && position2!="" && position3!=""){
            if(position1===position2 && position2===position3){
                win=true;
                const winner = position1 === 'X'? player1name:player2name;
                turn.innerText = `${winner} (${position1}) won the match 🎉`;
                if(position1==='X'){
                    player1score++;
                    player1scoreDisplay.innerHTML=player1score;
                }else{
                    player2score++;
                    player2scoreDisplay.innerHTML=player2score;
                }
                //play sound
                document.getElementById("win-sound").play();

                //fire confetti
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: {y: 0.6}
                });

                pattern.forEach((i)=>{
                    boxes[i].style.backgroundColor = "#55efc4";
                    boxes[i].style.boxShadow = "0 0px 15px #55efc4";
                })

                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                });
                break;
            }
        }
    }
    if(!win && count==9){
        turn.innerText = "It's s Draw!😵";
        drawGame++;
        drawScoreDisplay.innerHTML=drawGame;
    }
};

//reset game
const resetGame=()=>{
    document.getElementById("click2").play();
    document.getElementById("win-sound").pause();
    document.getElementById("win-sound").currentTime=0;
    player1=true;
    count=0;
    enableBox();
}

//enable box
const enableBox=()=>{
    for(let box of boxes){
        box.style.pointerEvents="auto";
        box.innerText="";
        turn.innerText=`${player1name}'s Turn (X)`;
        box.style.backgroundColor = "rgba(240, 234, 235, 0.707)";
        box.style.boxShadow = "0 0px 10px rgba(0,0,0,0.2)";
    }
}

//new game
newGame.addEventListener("click", ()=>{
    document.getElementById("click2").play();
    document.getElementById("win-sound").pause();
    document.getElementById("win-sound").currentTime=0;
    player1Input.value="";
    player2Input.value="";
    player1score=0;
    player2score=0;
    drawGame=0;
    player1scoreDisplay.innerText=0;
    player2scoreDisplay.innerText=0;
    drawScoreDisplay.innerText=0;
    modal.classList.add("active");
});
//restart game
restart.addEventListener("click", () => {
    resetGame();
});

//mode
themeBtn.addEventListener("click", () => {
    document.getElementById("click2").play();
    document.body.classList.toggle("dark-mode");
    themeBtn.innerText = document.body.classList.contains("dark-mode") ? "☀️ Light" : "🌙 Dark";
});