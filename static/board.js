// 🧭 DEFINE PATH (VERY IMPORTANT)
const path = [];

// Top row (left → right)
for (let j = 0; j < 15; j++) path.push([0, j]);

// Right column (top → bottom)
for (let i = 1; i < 15; i++) path.push([i, 14]);

// Bottom row (right → left)
for (let j = 13; j >= 0; j--) path.push([14, j]);

// Left column (bottom → top)
for (let i = 13; i > 0; i--) path.push([i, 0]);


// 🎯 CREATE BOARD
function createBoard() {
    const board = document.getElementById("board");

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            // Home zones
            if (i < 6 && j < 6) cell.classList.add("red-home");
            else if (i < 6 && j > 8) cell.classList.add("green-home");
            else if (i > 8 && j < 6) cell.classList.add("blue-home");
            else if (i > 8 && j > 8) cell.classList.add("yellow-home");
            else cell.classList.add("path");

            cell.id = `cell-${i}-${j}`;
            board.appendChild(cell);
        }
    }
}

createBoard();