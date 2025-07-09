var Chess = function() {
  return {
    load_pgn: function(pgn) { console.log("PGN loaded:", pgn); },
    fen: function() { return "startpos"; }
  };
};
