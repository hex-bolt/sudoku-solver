
function getRelatedCells(row, col) {

    let related = [];

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {

            // A cell is not related to itself
            if (r === row && c === col) {
                continue;
            }

            // Check whether cells share a row
            let sameRow = r === row;

            // Check whether cells share a column
            let sameCol = c === col;

            // Check whether cells share a 3x3 box
            let sameBox =
                Math.floor(r / 3) === Math.floor(row / 3) &&
                Math.floor(c / 3) === Math.floor(col / 3);

            if (sameRow || sameCol || sameBox) {

                related.push({
                    row: r,
                    col: c
                });
            }
        }
    }

    return related;
}


// Remove existing highlights
function clearCellHighlights() {

    let cells = document.querySelectorAll(".cell");

    cells.forEach(function(cell) {
        cell.classList.remove("selected");
        cell.classList.remove("related");
    });
}


// Highlight selected cell and its related cells
function setupCellSelection() {

    let cells = document.querySelectorAll(".cell");

    cells.forEach(function(cell) {

        cell.addEventListener("click", function() {

            clearCellHighlights();

            let row = Number(this.dataset.row);
            let col = Number(this.dataset.col);

            selectedCell = {
                row: row,
                col: col
            };

            // Highlight the selected cell
            this.classList.add("selected");

            // Find all related cells
            let relatedCells = getRelatedCells(row, col);

            // Highlight related cells
            relatedCells.forEach(function(position) {

                let relatedCell = document.querySelector(
                    `.cell[data-row="${position.row}"][data-col="${position.col}"]`
                );

                relatedCell.classList.add("related");
            });

            document.getElementById("status").textContent =
                `Selected cell: Row ${row + 1}, Column ${col + 1}. ` +
                `${relatedCells.length} related cells found.`;
        });
    });
}
