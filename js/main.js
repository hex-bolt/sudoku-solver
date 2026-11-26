let status = document.getElementById("status");
let originalPuzzle = null;
document.getElementById("sudoku-board").addEventListener("input", function() {

    // A user has modified the puzzle
    originalPuzzle = null;

});
document.getElementById("reset-btn").addEventListener("click", () => {

    originalPuzzle = null;

    steps = [];
    currentStep = -1;

    solverCalls = 0;
    backtrackCount = 0;

    displayBoard(
        Array.from({ length: 9 }, () => Array(9).fill(0))
    );

    clearCellHighlights();

    selectedCell = null;

    status.textContent = "Board cleared.";

});

document.getElementById("validate-btn").addEventListener("click", ()=>{
    console.log("validate button pressed");
    let board = getBoard();
    
    if(validateBoard(board)){
        status.textContent = "Valid Sudoku board";
    }else{
        status.textContent = "Invalid Sudoku board. Check content for repeated no.s";
    }
});

document.getElementById("candidates-btn").addEventListener("click", function(){
    //console.log("candidates button");
    if(selectedCell === null){
        status.textContent = "No Cell Selected";
        return;
    }

    let board = getBoard();
    let row = selectedCell.row;
    let col = selectedCell.col;
    let candidates = getCandidates(board, row, col);

    if (board[row][col] !== 0) {

        status.textContent =
            "This cell is already filled.";

    } else if (candidates.length === 0) {

        status.textContent =
            "No possible candidates for this cell.";

    } else {

        status.textContent =
            `Candidates: ${candidates.join(", ")}`;
    }
});




function showStep(index) {

    if (index < 0 || index >= steps.length) {
        return;
    }

    currentStep = index;

    let step = steps[index];

    displayBoard(step.board);

    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove(
            "solving",
            "correct",
            "backtracked"
        );
    });

    let currentCell = document.querySelector(
        `.cell[data-row="${step.row}"][data-col="${step.col}"]`
    );

    if (currentCell) {

        currentCell.classList.add("solving");

        if (step.action === "try") {
            currentCell.classList.add("correct");
        } else if (step.action === "backtrack") {
            currentCell.classList.add("backtracked");
        }
    }

    if (step.action === "try") {

        status.textContent =
            `Step ${index + 1}/${steps.length}: Trying ${step.number} at row ${step.row + 1}, column ${step.col + 1}`;

    } else {

        status.textContent =
            `Step ${index + 1}/${steps.length}: Backtracking. Removing ${step.number} from row ${step.row + 1}, column ${step.col + 1}`;

    }
}

document.getElementById("solve-btn").addEventListener("click", function () {

    // Save the original puzzle if this is a new solving session
    if (originalPuzzle === null) {
        originalPuzzle = getBoard();
    }

    // Always start solving from the original puzzle
    let board = originalPuzzle.map(row => [...row]);

    // Validate the puzzle
    if (!validateBoard(board)) {
        status.textContent = "Invalid board. Fix the duplicate numbers.";
        return;
    }

    // Clear previous solving steps
    steps = [];
    currentStep = -1;

    solverCalls = 0;
    backtrackCount = 0;

    // Create a separate working copy
    let solution = board.map(row => [...row]);

    // Run the solver and record its steps
    let solved = sudokuSolver(solution);

    console.log("Solver result:", solved);
    console.log("Total recorded steps:", steps.length);
    console.log("Recursive calls:", solverCalls);
    console.log("Backtracking operations:", backtrackCount);

    if (solved) {

        // Display the COMPLETE solution immediately
        displayBoard(solution);

        status.textContent =
            `Sudoku solved! ${steps.length} steps recorded. Click Next Step to view the solving process.`;

    } else {

        displayBoard(board);

        status.textContent =
            "No solution exists for this Sudoku puzzle.";

    }

});

document.getElementById("step-btn").addEventListener("click", function () {

    if (steps.length === 0) {
        status.textContent = "Click Solve first to generate the solving steps.";
        return;
    }

    if (currentStep >= steps.length - 1) {
        status.textContent = "You have reached the final step.";
        return;
    }

    showStep(currentStep + 1);

});
document.getElementById("previous-btn").addEventListener("click", function () {

    if (currentStep <= 0) {
        status.textContent = "You are at the first step.";
        return;
    }

    showStep(currentStep - 1);

});