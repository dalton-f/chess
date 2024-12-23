import { PIECES } from "../../utils/defs";

import { FetchIndexFromCoordinate } from "../../utils/helpers";

export const LoadPositionFromFEN = (fen) => {
  // If a non-string value is passed in, obviously ignore it
  if (typeof fen !== "string") {
    throw new Error(
      "Forsyth-Edwards Notation must be represented with a string",
    );
  }

  // Set up a FEN specific mapping of pieces directly to the predetermined values to save time on additional checks
  const pieceTypeFromSymbol = {
    p: PIECES.blackPawn,
    n: PIECES.blackKnight,
    b: PIECES.blackBishop,
    r: PIECES.blackRook,
    q: PIECES.blackQueen,
    k: PIECES.blackKing,

    P: PIECES.whitePawn,
    N: PIECES.whiteKnight,
    B: PIECES.whiteBishop,
    R: PIECES.whiteRook,
    Q: PIECES.whiteQueen,
    K: PIECES.whiteKing,
  };

  // A FEN string always describes a position starting from the 8th rank
  const ranks = fen.split("/");

  // Using 120 instead of 64 to allow for out of bound areas to be defined
  const board = new Array(120).fill(PIECES.outOfBounds);

  // Start population from the first rank as we reversed the FEN
  let index = FetchIndexFromCoordinate("a8");

  for (const rank of ranks) {
    for (const char of rank) {
      // If the value is a number
      if (!isNaN(char)) {
        // Fill the board from index to index + char with PIECES.empty (0)
        board.fill(PIECES.empty, index, index + parseFloat(char));

        // Increase the index by the number
        index += parseFloat(char);
      } else {
        // Add the correct piece to the corresponding index
        board[index] = pieceTypeFromSymbol[char];

        index++;
      }
    }

    // Move down to the next rank
    index += 2;
  }

  return board;
};
