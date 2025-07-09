<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chess Analysis</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="controls">
    <textarea id="pgn-input" placeholder="Paste PGN here..."></textarea>
    <button onclick="analyzePGN()">Анализировать PGN</button>
    <select id="language">
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  </div>

  <div id="board" class="board"></div>
  <canvas id="evalChart" width="400" height="100"></canvas>

  <script src="libs/chess.js"></script>
  <script src="libs/chessboard.js"></script>
  <script src="libs/chart.js"></script>
  <script src="stockfish.js"></script>
  <script src="script.js"></script>
</body>
</html>
