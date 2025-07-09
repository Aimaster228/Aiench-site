let board, game, engine, evals = [], moves = [];

function loadPGN() {
  const pgn = document.getElementById("pgnInput").value;
  game = new Chess();
  if (!game.load_pgn(pgn)) {
    alert("Неверный PGN");
    return;
  }
  moves = game.history();
  board.position(game.fen(), false);
  analyzeAllMoves();
}

function analyzeAllMoves() {
  evals = [];
  const tempGame = new Chess();
  let index = 0;

  function next() {
    if (index >= moves.length) return drawChart();
    tempGame.move(moves[index]);
    const fen = tempGame.fen();

    engine.postMessage("position fen " + fen);
    engine.postMessage("go depth 15");

    engine.onmessage = function (event) {
      const line = event.data;
      if (line.startsWith("info depth") && line.includes("score")) {
        const parts = line.split(" ");
        const cpIndex = parts.indexOf("cp");
        const mateIndex = parts.indexOf("mate");

        let score = 0;
        if (cpIndex !== -1) score = parseInt(parts[cpIndex + 1]) / 100;
        if (mateIndex !== -1) score = parts[mateIndex - 1] === "score" ? "Мат в " + parts[mateIndex + 1] : score;

        evals.push(score);
        index++;
        next();
      }
    };
  }

  next();
}

function drawChart() {
  new Chart(document.getElementById("evalChart"), {
    type: 'line',
    data: {
      labels: moves.map((_, i) => i + 1),
      datasets: [{
        label: 'Оценка позиции (в пешках)',
        data: evals,
        borderColor: '#0984e3',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  board = Chessboard('board', {
    draggable: false,
    position: 'start'
  });

  engine = new Worker("stockfish.js");
});
