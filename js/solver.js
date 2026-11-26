
let steps = [];
let currentStep = -1;

let solverCalls = 0;
let backtrackCount = 0;

function recordStep(board, row, col, number, action) {

    steps.push({
        row: row,
        col: col,
        number: number,
        action: action,
        board: board.map(r => [...r])
    });

}

function sudokuSolver(board) {

    solverCalls++;

    let bestcell = null;
    let bestCandidates = null;

    // Find the empty cell with the fewest candidates
    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {

                let candidates = getCandidates(board, row, col);

                // No possible number: dead end
                if (candidates.length === 0) {
                    return false;
                }

                if (
                    bestCandidates === null ||
                    candidates.length < bestCandidates.length
                ) {
                    bestCandidates = candidates;
                    bestcell = { row, col };
                }

                // One candidate is the minimum possible
                if (bestCandidates.length === 1) {
                    break;
                }
            }
        }

        if (
            bestCandidates !== null &&
            bestCandidates.length === 1
        ) {
            break;
        }
    }

    // No empty cells remain
    if (bestcell === null) {
        return true;
    }

    let row = bestcell.row;
    let col = bestcell.col;

    // Try every candidate
    for (let num of bestCandidates) {

        // Place the number
        board[row][col] = num;

        // Record the attempt
        recordStep(board, row, col, num, "try");

        if (sudokuSolver(board)) {
            return true;
        }

        // The attempt failed: undo it
        board[row][col] = 0;

        backtrackCount++;

        // Record the actual backtracking
        recordStep(board, row, col, num, "backtrack");
    }

    return false;
}
