function getCandidates(board, row, col){
    // To puch any remaining possible candidates into a set
    if (board[row][col] !== 0) {
        return [];
    }

    let candidates = [];

    // Test every possible number from 1 to 9
    for (let num = 1; num <= 9; num++) {

        if (isValid(board, row, col, num)) {
            candidates.push(num);
        }
    }

    return candidates;

}

function getAllCandidates(board) {

    let result = [];

    for (let row = 0; row < 9; row++) {

        result[row] = [];

        for (let col = 0; col < 9; col++) {

            result[row][col] = getCandidates(board, row, col);
        }
    }

    return result;
}