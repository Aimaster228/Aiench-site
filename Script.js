let board, game, engine;

window.onload = function () {
  // Инициализация доски при загрузке страницы
  board = Chessboard('board', {
    position: 'start',
    pieceTheme: 'assets/pieces/{piece}.svg',
    draggable: false
  });

  game = new Chess(); // создаём шахматную игру
};

function analyzePGN() {
  const pgn = document.getElementById("pgn-input").value.trim();
  if (!pgn) {
    alert("Введите PGN!");
    return;
  }

  const ok = game.load_pgn(pgn);
  if (!ok) {
    alert("Некорректный PGN");
    return;
  }

  // Обновить доску на последнюю позицию
  board.position(game.fen());

  // Инициализация Stockfish
  if (engine) engine.terminate(); // перезапуск, если уже был запущен
  engine = new Worker("stockfish.js");

  engine.onmessage = function (event) {
    console.log("Stockfish:", event.data);

    if (event.data.startsWith("bestmove")) {
      const bestMove = event.data.split(" ")[1];
      alert("Лучший ход: " + bestMove);
    }
  };

  // Команды для Stockfish
  engine.postMessage("uci");
  engine.postMessage("ucinewgame");
  engine.postMessage("position fen " + game.fen());
  engine.postMessage("go depth 12");
}
