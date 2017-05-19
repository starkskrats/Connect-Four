var canvas = document.getElementById("canvas");
var context;
var click;

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

var player = 1;
var hasWon = false;

window.onload = init;

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

function play() {
    document.getElementById("play").textContent = "RESET";
    document.getElementById("play").setAttribute('onclick', 'reset()');
    canvas.addEventListener('click', click = function placePiece() {
        var canvasBounds = canvas.getBoundingClientRect();
        var col = Math.trunc((event.clientX - canvasBounds.left) / 100);

        if (gameBoard[0][col] != 0) {
            alert('That column is full!')
        }

        if (player == 1) {
            for (i = 0; i < 6; i++) {
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
            player = 2;
        }

        // drop the piece in the column and change the player
        else {
            for (i = 0; i < 6; i++) {
                if (gameBoard[i][col] != 0) {
                    gameBoard[i - 1][col] = 2;
                    drawCircle(i, col);
                    i = 5;
                } else if (gameBoard[5][col] == 0) {
                    gameBoard[5][col] = 2;
                    drawCircle(6, col);
                    i = 5;
                }
            }
            player = 1;
        }

        setTimeout(function () {
            checkForWinner();
        }, 0);

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

    player = 1;
    hasWon = false;
}

function drawCircle(row, col) {
    context.beginPath();
    context.arc((col * 100) + 50, (row * 100) - 50, 48, 2 * Math.PI, false);

    if (player == 1) {
        context.fillStyle = "yellow";
    } else {
        context.fillStyle = "red";
    }

    context.fill();
}

function checkForWinner() {
    // checks every row, but only first three columns, since there are only 7 columns. loops through and checks if the next three locations are equal to the current location
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 4; j++) {
            if ((gameBoard[i][j] != 0) && (gameBoard[i][j] == gameBoard[i][j + 1] && gameBoard[i][j] == gameBoard[i][j + 2] && gameBoard[i][j] == gameBoard[i][j + 3])) {
                hasWon = true;
            }
        }
    }

    // same idea for check rows, but for columns
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 7; j++) {
            if ((gameBoard[i][j] != 0) && (gameBoard[i][j] == gameBoard[i + 1][j] && gameBoard[i][j] == gameBoard[i + 2][j] && gameBoard[i][j] == gameBoard[i + 3][j])) {
                hasWon = true;
            }
        }
    }

    // the idea behind this is a little more complicated. it's diagonal so we want to add 1 to both the row and column to check the values.
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
            if ((gameBoard[i][j] != 0) && (gameBoard[i][j] == gameBoard[i + 1][j + 1] && gameBoard[i][j] == gameBoard[i + 2][j + 2] && gameBoard[i][j] == gameBoard[i + 3][j + 3])) {
                hasWon = true;
            }
        }
    }

    // going the other way. same idea, but instead we want to add to the row, and subtract from the column
    for (i = 0; i < 3; i++) {
        for (j = 3; j < 7; j++) {
            if ((gameBoard[i][j] != 0) && (gameBoard[i][j] == gameBoard[i + 1][j - 1] && gameBoard[i][j] == gameBoard[i + 2][j - 2] && gameBoard[i][j] == gameBoard[i + 3][j - 3])) {
                hasWon = true;
            }
        }
    }

    if (hasWon) {
        if (player == 1) {
            alert('Player 2 wins!');
        } else {
            alert('Player 1 wins!')
        }

        canvas.removeEventListener('click', click, false);
    }
}