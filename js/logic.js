function isValid(board, row, col, num) {

    // Check row

    for (let c = 0; c < 9; c++) {

        if (board[row][c] === num) {
            return false;
        }
    }

    // Check column

    for (let r = 0; r < 9; r++) {

        if (board[r][col] === num) {
            return false;
        }
    }

    // Find starting position of 3x3 box

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    // Check box

    for (let r = startRow; r < startRow + 3; r++) {

        for (let c = startCol; c < startCol + 3; c++) {

            if (board[r][c] === num) {
                return false;
            }
        }
    }

    return true;
}

function validateBoard(board){
    for(let row = 0; row<9; row++){
        for(let col = 0; col<9; col++){
            let num = board[row][col];

            if(num!=0){
                board[row][col] = 0;
                let validity = isValid(board, row, col, num);
                board[row][col] = num;
                if(!validity){
                    return false;
                }
            }

        }
    }
    return true;
}