const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

// Set up multiple definitions here so that we avoid using magic numbers + the code is slightly easier to understand
const PIECES = {
  empty: 0,
  outOfBounds: -1,

  whitePawn: 1,
  whiteKnight: 2,
  whiteBishop: 3,
  whiteRook: 4,
  whiteQueen: 5,
  whiteKing: 6,

  blackPawn: 33,
  blackKnight: 34,
  blackBishop: 35,
  blackRook: 36,
  blackQueen: 37,
  blackKing: 38,
};

// Ensure both files + ranks are zero indexed for logic
const FILES = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};

const RANKS = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
};

// Set up constants for the bitwise masks so they are easier to use alongside the above piece notation
const PIECE_COLOUR_MASK = 0b11;
const PIECE_TYPE_MASK = 0b1111;

const FetchIndexFromCoordinate = (coordinate) => {
  const [file, rank] = coordinate.split("");

  return 21 + FILES[file] + 10 * RANKS[rank];
};

const LoadPositionFromFEN = (fen) => {
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

  // A FEN string always describes a position starting from the 8th rank and our board representation starts from the first, so reverse the FEN to account for this
  const ranks = fen.split("/").reverse();

  // Using 120 instead of 64 to allow for out of bound areas to be defined
  const board = new Array(120).fill(PIECES.outOfBounds);

  // Start population from the first rank as we reversed the FEN
  let index = FetchIndexFromCoordinate("a1");

  for (const rank of ranks) {
    for (const char of rank) {
      // If the value is a number
      if (!isNaN(char)) {
        // Fill the board from index to index += char with PIECES.empty (0)
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

const board = LoadPositionFromFEN(STARTING_FEN);

console.log(board, board[FetchIndexFromCoordinate("d1")]);
