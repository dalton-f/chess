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
  1: 7,
  2: 6,
  3: 5,
  4: 4,
  5: 3,
  6: 2,
  7: 1,
  8: 0,
};

// Set up constants for the bitwise masks so they are easier to use alongside the above piece notation
const PIECE_COLOUR_MASK = 0b11;
const PIECE_TYPE_MASK = 0b1111;

// a8 = 21, a1 = 91, h8 = 28, h1 = 98
const FetchIndexFromCoordinate = (coordinate) => {
  const [file, rank] = coordinate.split("");

  return 21 + FILES[file] + 10 * RANKS[rank];
};

const ExtractPieceData = (piece) => {
  const pieceColour = (piece >> 4) & PIECE_COLOUR_MASK;

  const pieceType = piece & PIECE_TYPE_MASK;

  return [pieceColour, pieceType];
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

const IsFriendlyPiece = (piece1, piece2) => {
  const [colour1] = ExtractPieceData(piece1);
  const [colour2] = ExtractPieceData(piece2);

  return colour1 === colour2;
};

const GenerateLegalMoves = (board) => {
  // Each item of this array is an object that represents a piece on the board, which stores the piece, its starting square and an array of its target squares
  const pieces = [];

  // Loop over the board
  for (let i = 0; i < board.length; i++) {
    const tile = board[i];

    // If a tile is not empty and not out of bounds this means it has a piece
    if (tile !== PIECES.empty && tile !== PIECES.outOfBounds) {
      // Get the piece type
      const [_, pieceType] = ExtractPieceData(tile);

      // Bishops
      if (pieceType === 3) pieces.push(GenerateBishopMoves(board, i));
    }
  }

  return pieces;
};

const GenerateBishopMoves = (board, index) => {
  const offsets = [11, -11, 9, -9];
  const startingIndex = index;

  const piece = {
    piece: board[startingIndex],
    startSquare: index,
    targetSquares: [],
  };

  // For every direction offset
  for (const offset of offsets) {
    // Reset the index for every offset loop
    index = startingIndex;

    // While still in the board
    while (board[index] >= 0) {
      index += offset;

      if (startingIndex === 96) {
        console.log("Offset: ", offset);

        console.log(index, board[index]);
      }

      // If we have gone out of bounds, skip to the next offset
      if (board[index] === PIECES.outOfBounds) break;

      // If empty square, assume valid move and continue forward with this offset
      if (board[index] === PIECES.empty) {
        piece.targetSquares.push(index);

        continue;
      }

      // Friendly piece on target square is blocking, so we cannot continue in this direction
      if (IsFriendlyPiece(board[startingIndex], board[index])) break;

      // Enemy piece is captured, so stop
      if (!IsFriendlyPiece(board[startingIndex], board[index])) {
        piece.targetSquares.push(index);
        break;
      }
    }
  }

  return piece;
};

const board = LoadPositionFromFEN(
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR",
);

const pieces = GenerateLegalMoves(board);

// from 96 to 41, 52, 63, 74, 85

console.log(pieces, board);
