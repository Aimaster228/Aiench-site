let board, game;

function analyzePGN() {
  const pgn = document.getElementById("pgn-input").value;
  game = new Chess();
  game.load_pgn(pgn);

  board.position(game.fen());

  const engine = new Worker("stockfish.js");
  engine.postMessage("uci");
  engine.postMessage("position fen " + game.fen());
  engine.postMessage("go depth 10");

  engine.onmessage = function(event) {
    console.log("Stockfish says:", event.data);
  };
}

window.onload = function() {
  board = Chessboard('board', {
    position: 'start',
    pieceTheme: 'assets/pieces/{piece}.svg'
  });
};
