// Box width
var bw = 700;
// Box height
var bh = 600;

// gameBoard array. this makes it easy to check if their is a winner
var gameBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

var canvas = document.getElementById("canvas");
var context;

function init() {
    context = canvas.getContext("2d");
    drawBoard();
}

function drawBoard() {
    for (var x = 0; x <= bw; x += 100) {
        context.moveTo(0.5 + x, 0);
        context.lineTo(0.5 + x, bh);
    }


    for (var x = 0; x <= bh; x += 100) {
        context.moveTo(0, 0.5 + x);
        context.lineTo(bw, 0.5 + x);
    }

    context.strokeStyle = "black";
    context.stroke();
}

window.onload = init;

var click;
function play() {
    document.getElementById("play").textContent = "RESET";
    document.getElementById("play").setAttribute('onclick', 'reset()');
    canvas.addEventListener('click', click = function placePiece() {
        var canvasBounds = canvas.getBoundingClientRect();
        var col = Math.trunc((event.clientX - canvasBounds.left) / 100);
        console.log(col);
        

        for (i = 0; i < 6; i++) {

            if (gameBoard[0][col] == 1) {
                alert('That column is full!')
                i = 5;
            }

            if (gameBoard[i][col] != 0) {
                gameBoard[i - 1][col] = 1;
                drawCircle(i, col);
                i = 5;
            } else if (gameBoard[5][col] == 0) {
                gameBoard[5][col] = 1;
                drawCircle(6, col);
                i = 5;
            }
        }
    }, false);
}

function reset() {

    for (i = 0; i < 6; i++) {
        for (j = 0; j < 7; j++) {
            gameBoard[i][j] = 0;
        }
    }
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    drawBoard();

    canvas.removeEventListener('click', click, false);
    document.getElementById("play").textContent = "PLAY";
    document.getElementById("play").setAttribute('onclick', 'play()');
}

function drawCircle(row, col) {
    context.beginPath();
    context.arc((col * 100) + 50, (row * 100) - 50, 50, 2 * Math.PI, false);
    context.fillStyle = "blue";
    context.fill();
}