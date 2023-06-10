//This variable keeps track of whose turn it is.
let activePlayer = 'X';
//This array stores an array of moves. we use this to determine win conditions.
let selectSquares = [];

//this function is for playing an x or o in a square.
function placeXOrO(squareNumber) {
    //this condition ensures a square hasent been selected already.
    //The .some() method is used to check each element of the selectSquare array
    //to see if it contains the square number clicked on.
    if (!selectSquares.some(element => element.includes(squareNumber))) {
        //this variable retreves the HTML element id that was clicked.
        let select = document.getElementById(squareNumber);
        if (activePlayer === 'X') {
            //If activePlayer is equal to 'X', the x.png is places in HTML
            select.style.backgroundImage = 'url("images/x.png")';
            //active palyer may only be 'X' or 'O' so, if not 'X' it must be 'O'
        } else {
            //if activePlayer is equal to 'X", the x.png is placed in HTML
            select.style.backgroundImage = 'url("images/o.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        //This calles a function to check for any win conditions.
        checkWinConditions();
        //Thos condition is for changing the active player.
        if (activePlayer === 'X') {
            //if active player is 'X' change it to O.
            activePlayer = 'O';
            //if active player is anything other than 'X'
        } else {
            activePlayer = 'X'
        }
        //This function playes placement sound.
        audio('./media/place.mp3');
        //this condition checks to see if it is the computers turn.
        if (activePlayer === 'O') {
            //This Function disables clicking if its the computers turn.
            disableClick();
            setTimeout(function () { computersTurn(); }, 1000);
        }
        //Returning true is needed for our computersTurn() function to work
        return true;
    }
    //This function results in a random square being selected by the computer
    function computersTurn() {
        let success = false;
        //this var stores a random number 0-8
        let pickASquare;
        //This condition allows our while loop to keep trying if a square is slected by the computer
        while (!success) {
            //A random number is between 0 - 8 is slected
            pickASquare = String(Math.floor(Math.random() * 9));

            if (placeXOrO(pickASquare)) {
                //this line calls the function
                placeXOrO(pickASquare);
                //this changes our coolean and ends the loop
                success = true;
            };
        }
    }
}
    //This function pareses the slectedSquares array to search for win conditions.
    //drawLine() function is called to draw a line on the screen if the condition is met.
    function checkWinConditions() {
        //x 0,1, 2 condition
        if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }

       else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }

       else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }

       else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }

       else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }

       else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }

       else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }

       else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 510, 90) }

       else if (arrayIncludes('0O', '10', '20')) { drawWinLine(50, 100, 558, 100) }

       else if (arrayIncludes('30', '40', '50')) { drawWinLine(50, 304, 558, 304) }

       else if (arrayIncludes('60', '70', '80')) { drawWinLine(50, 508, 558, 304) }

       else if (arrayIncludes('0O', '30', '60')) { drawWinLine(100, 50, 100, 558) }

       else if (arrayIncludes('10', '40', '70')) { drawWinLine(304, 50, 304, 558) }

       else if (arrayIncludes('20', '50', '80')) { drawWinLine(508, 50, 508, 558) }

       else if (arrayIncludes('60', '40', '20')) { drawWinLine(100, 508, 510, 90) }

       else if (arrayIncludes('0O', '40', '80')) { drawWinLine(100, 100, 520, 520) }

       else if (selectSquares.length >= 9) {
        audio('./media/tie.mp3');

        setTimeout(function () { resetGame(); }, 500);
       }
    

    function arrayIncludes(squareA, squareB, squareC) {
        const a = selectSquares.includes(squareA);
        const b = selectSquares.includes(squareB);
        const c = selectSquares.includes(squareC);

        if (a === true && b === true && c === true) { return true; }

    }
}

function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}

function audio(audioURL) {
    let Audio = new Audio(audioURL);
    audio.play();
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines');
    
    const c = canvas.getContext('2d');

    let x1 = coordX1,

        y1 = coordY1,

        x2 = coordX2,

        y2 = coordY2,

        x = x1,

        y = y1;




function animateLineDrawing() {
    
    const animationLoop = requestAnimationFrame(animateLineDrawing);

    c.clearsReact(0, 0, 608, 608);

    c.beginPath();

    c.moveTo(x1, y1)

    c.lineTo(x, y);

    c.lineWidth = 10;

    c.stokeStyle = 'rgba(70, 225, 33, .8)';

    c.stroke();

    if (x1 <= x2 && y1 <= y2) {
        
        if (x < x2) {x += 10; }

        if (y < y2) {y += 10; }

        if (x >= x2 && y1 >= y2) { cancelAnimationFrame(animationLoop); }
    }

    if (x1 <= x2 && y1 >= y2) {
        if (x < x2) { x += 10; }
        if (y > y2) { y -=10; }
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
    }
}

function clear() {
    const animationLoop = requestAnimationFrame(clear);

    c.clearRect(0, 0, 608, 608);

    cancelAnimationFrame(animationLoop);
}

disableClick();

audio('./media/winGame.mp3');

animateLineDrawing();

setTimeout(function () { clear(); resetGame(); }, 1000);

}

function resetGame() {
    //this for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        //this var get HTML element i.
        let square = document.getElementById(String(i));
        //this removes our elements background image.
        square.style.backgroundImage = '';
    }
    //this resets our array so it is empty and we can start over.
    selectSquares = [];
}