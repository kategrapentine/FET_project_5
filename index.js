//Assigning the elements I had created within index.html:
let btn = $('.main');
let markedBtn = $('.marked');
let startBtn = $('#start');
let xHead = $('#x-header');
let oHead = $('#o-header');
let winHead = $('#w-header')

//These keep track of the game results:
let x = [];
let o = [];
let turn = 0;

//The Start Button starts a new game, acts as both the start button and a reset button:
startBtn.click(() => {
    btn.attr("disabled", false);
    btn.attr('hidden', false);
    markedBtn.removeClass('btn-success');
    markedBtn.removeClass('btn-danger')
    turn = 0;
    x = [];
    o = [];
    winHead.attr('hidden', true);
    markedBtn.attr('hidden', true);
    isTurn('x');
});

//When the player clicks an avaliable button, it will first check to see who's turn it is, then it will check to see if a player won the game
//If no players have won then it will allow the player to make a move
//If a player has won then it will disable all the buttons and display the winner

//There are 2 sets of buttons that are loaded within the HTML document, when a player makes a move, that button will hide the button clicked and show the disabled button in the same position
//I did it this way as having the pre-existing elements helped me keep track of them a lot more easily.
btn.click(() => {
    let id = event.target.id;
    let target = $(event.target);

    if (xTurn == true) {

        x.push(id);

        if (checkForWinner(x) == true) {
            target.attr('hidden', true);
            addMark(id);

            winHead.html('X wins!');
            xHead.attr('hidden', true);
            winHead.attr('hidden', false);

            btn.attr("disabled", true);
        } else {
            target.attr('hidden', true);
            addMark(id);
            turn += 1;
            isTurn('o');
        }
    } else if (xTurn == false) {

        o.push(id);

        if (checkForWinner(o) == true) {
            target.attr('hidden', true);
            addMark(id);

            winHead.html('O wins!');
            oHead.attr('hidden', true);
            winHead.attr('hidden', false);

            btn.attr("disabled", true);
        } else {
            target.attr('hidden', true);
            addMark(id);
            turn += 1;
            isTurn('x');
        }
    }
});

//isTurn will first check to see if the game has resulted in a draw
//If a draw hasn't occured, then it will check to see which player's turn it is and display their banner.
function isTurn(player) {
    if (player === 'x' && turn < 9) {
        xTurn = true;
        oHead.attr('hidden', true);
        xHead.attr('hidden', false);
    } else if (player === 'o' && turn < 9) {
        xTurn = false;
        xHead.attr('hidden', true);
        oHead.attr('hidden', false);
    } else if (turn === 9) {
            winHead.html('Draw!');
            oHead.attr('hidden', true);
            xHead.attr('hidden', true);
            winHead.attr('hidden', false);
    }
}

//checkForWinner checks to see if either x or o has won the game
//The arrays keep track of what placements have been marked by their number Id.
//so it checks to see if any of the possible outcomes of three have occured
function checkForWinner(array) {
    if (
    array.includes("1") == true && array.includes("2") == true && array.includes("3") == true ||
    array.includes("1") == true && array.includes("5") == true && array.includes("9") == true || 
    array.includes("1") == true && array.includes("4") == true && array.includes("7") == true ||

    array.includes("2") == true && array.includes("5") == true && array.includes("8") == true ||
    array.includes("4") == true && array.includes("5") == true && array.includes("6") == true ||
    array.includes("7") == true && array.includes("5") == true && array.includes("3") == true ||

    array.includes("3") == true && array.includes("6") == true && array.includes("9") == true ||
    array.includes("7") == true && array.includes("8") == true && array.includes("9") == true
    )
    return true;
}

//addMark will show the hidden disabled button to replace the clicked button and display it as X or O
//it also color codes the buttons for better visual distinction to help players be aware of the board and also aware of who's turn it is.
function addMark(targetId) {
    if (xTurn == true) {
        $(`#${targetId}d`).html('X');
        $(`#${targetId}d`).attr('hidden', false);
        $(`#${targetId}d`).addClass('btn-danger');
    } else {
        $(`#${targetId}d`).html('O');
        $(`#${targetId}d`).attr('hidden', false);
        $(`#${targetId}d`).addClass('btn-success');
    }
}
