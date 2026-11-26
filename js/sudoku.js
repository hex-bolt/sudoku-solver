const board = document.getElementById("sudoku-board");

let selectedCell = null;
function createBoard(){
    for(let row = 0;row<9;row++){
        for(let col = 0; col<9; col++){
            let cell = document.createElement("input");
            cell.classList.add("cell");
            cell.type = "text";
            cell.maxLength = 1;

            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("input", function(){
                this.value = this.value.replace(/[^1-9]/g,"");
            });
            board.appendChild(cell);
        }
    }
    setupCellSelection();
}

function setupArrowNavigation() {

    let cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {

        cell.addEventListener("keydown", function(event) {

            let row = Number(this.dataset.row);
            let col = Number(this.dataset.col);

            let newRow = row;
            let newCol = col;

            // Determine the next cell
            switch(event.key) {

                case "ArrowUp":
                    newRow--;
                    break;

                case "ArrowDown":
                    newRow++;
                    break;

                case "ArrowLeft":
                    newCol--;
                    break;

                case "ArrowRight":
                    newCol++;
                    break;

                default:
                    return;
            }

            // Prevent default arrow-key behavior
            event.preventDefault();

            // Check board boundaries
            if (
                newRow >= 0 && newRow < 9 &&
                newCol >= 0 && newCol < 9
            ) {

                let nextCell = document.querySelector(
                    `.cell[data-row="${newRow}"][data-col="${newCol}"]`
                );

                nextCell.focus();
                nextCell.click();

            }

        });

    });

}

function getBoard() {

    let board = [];

    for (let row = 0; row < 9; row++) {

        board[row] = [];

        for (let col = 0; col < 9; col++) {

            let cell = document.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            );

            board[row][col] = cell.value === ""
                ? 0
                : Number(cell.value);
        }
    }

    return board;
}

function displayBoard(board) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            let cell = document.querySelector(
                `[data-row="${row}"][data-col="${col}"]`
            );

            cell.value = board[row][col] === 0
                ? ""
                : board[row][col];
        }
    }
}

createBoard();
setupArrowNavigation();