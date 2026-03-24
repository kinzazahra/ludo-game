let players = [
    { id: 1, color: "red", pos: -1 },
    { id: 2, color: "blue", pos: -1 },
    { id: 3, color: "green", pos: -1 },
    { id: 4, color: "yellow", pos: -1 }
];

let currentPlayer = 0;

function rollDice() {
    let dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerText = dice;

    let player = players[currentPlayer];

    // RULE: need 6 to start
    if (player.pos === -1 && dice === 6) {
        player.pos = 0;
    } else if (player.pos >= 0) {
        player.pos += dice;
    }

    moveToken(player);

    checkKill(player);

    checkWin(player);

    // extra turn if 6
    if (dice !== 6) {
        currentPlayer = (currentPlayer + 1) % 4;
    }

    document.getElementById("turn").innerText =
        "Player " + players[currentPlayer].id + " Turn";
}

function moveToken(player) {
    let existing = document.getElementById("token-" + player.id);
    if (existing) existing.remove();

    if (player.pos < 0) return;

    let [x, y] = path[player.pos % path.length];

    let cell = document.getElementById(`cell-${x}-${y}`);

    let token = document.createElement("div");
    token.classList.add("token", player.color);
    token.id = "token-" + player.id;

    cell.appendChild(token);
}

function checkKill(current) {
    players.forEach(p => {
        if (p.id !== current.id && p.pos === current.pos && p.pos !== -1) {
            p.pos = -1;
            let t = document.getElementById("token-" + p.id);
            if (t) t.remove();
            alert("Player " + current.id + " killed Player " + p.id);
        }
    });
}

function checkWin(player) {
    if (player.pos >= path.length) {
        alert("🎉 Player " + player.id + " Wins!");
        location.reload();
    }
}