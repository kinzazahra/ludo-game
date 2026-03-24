const path = [];

// Create simple path (square loop)
for (let i = 0; i < 15; i++) path.push([0, i]);
for (let i = 1; i < 15; i++) path.push([i, 14]);
for (let i = 13; i >= 0; i--) path.push([14, i]);
for (let i = 13; i > 0; i--) path.push([i, 0]);

function createBoard() {
    let board = document.getElementById("board");

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `cell-${i}-${j}`;
            board.appendChild(cell);
        }
    }
}

createBoard();