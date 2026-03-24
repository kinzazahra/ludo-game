// 🎮 PLAYERS
let players = [
    { id: 1, color: "red", tokens: [-1, -1, -1, -1] },
    { id: 2, color: "blue", tokens: [-1, -1, -1, -1] },
    { id: 3, color: "green", tokens: [-1, -1, -1, -1] },
    { id: 4, color: "yellow", tokens: [-1, -1, -1, -1] }
];

let currentPlayer = 0;
let isMoving = false; // prevent spam clicks

// 🎲 ROLL DICE
async function rollDice() {

    if (isMoving) return;

    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerText = dice;

    let player = players[currentPlayer];
    let moved = false;

    // 🔍 Check all tokens for valid move
    for (let i = 0; i < 4; i++) {

        // 🟢 Spawn token
        if (player.tokens[i] === -1 && dice === 6) {
            player.tokens[i] = 0;
            moveToken(player, i);
            moved = true;
            break;
        }

        // 🔵 Move token
        else if (player.tokens[i] >= 0 && player.tokens[i] < path.length) {
            isMoving = true;
            await animateMove(player, i, dice);
            isMoving = false;
            moved = true;
            break;
        }
    }

    // ❌ No valid move
    if (!moved) {
        console.log("No valid move");
    }

    // 🔄 Change turn
    if (dice !== 6) {
        currentPlayer = (currentPlayer + 1) % 4;
    }

    updateTurn();
}

// 🎯 UPDATE TURN DISPLAY
function updateTurn() {
    document.getElementById("turn").innerText =
        "Player " + players[currentPlayer].id + " Turn";
}

// 🎯 MOVE TOKEN (instant placement)
function moveToken(player, index) {

    let tokenId = `token-${player.id}-${index}`;

    // remove old token
    let existing = document.getElementById(tokenId);
    if (existing) existing.remove();

    let pos = player.tokens[index];
    if (pos < 0) return;

    let [x, y] = path[pos % path.length];
    let cell = document.getElementById(`cell-${x}-${y}`);

    if (!cell) return;

    let token = document.createElement("div");
    token.classList.add("token", player.color);
    token.id = tokenId;

    cell.appendChild(token);
}

// 🎬 ANIMATION
async function animateMove(player, index, steps) {

    for (let i = 0; i < steps; i++) {
        await sleep(250);

        player.tokens[index]++;

        // 🏁 Stop if reached end
        if (player.tokens[index] >= path.length) {
            checkWin(player);
            return;
        }

        moveToken(player, index);
    }

    checkKill(player, index);
}

// ⏱️ DELAY FUNCTION
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 💥 KILL LOGIC
function checkKill(currentPlayerObj, index) {

    let currentPos = currentPlayerObj.tokens[index];

    players.forEach(p => {

        if (p.id !== currentPlayerObj.id) {

            p.tokens.forEach((pos, i) => {

                if (pos === currentPos && pos !== -1) {

                    // send back to home
                    p.tokens[i] = -1;

                    let t = document.getElementById(`token-${p.id}-${i}`);
                    if (t) t.remove();

                    alert(`🔥 Player ${currentPlayerObj.id} killed Player ${p.id}`);
                }
            });
        }
    });
}

// 🏆 WIN CHECK
function checkWin(player) {

    alert(`🎉 Player ${player.id} wins!`);
    location.reload();
}