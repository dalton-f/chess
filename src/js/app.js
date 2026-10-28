const STARTING_POSITION_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const PIECES = {
  empty: 0,
  pawn: 1,
  knight: 2,
  bishop: 3,
  rook: 4,
  queen: 5,
  king: 6,
  white: 8,
  black: 16,
};

const ZERO_INDEXED_RANKS = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
};

const ZERO_INDEXED_FILES = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};

const CASTLING_RIGHTS = {
  whiteKingside: 1,
  whiteQueenside: 2,
  blackKingside: 4,
  blackQueenside: 8,
};

const BOARD_SIZE = 64;

const game = {
  board: new Array(BOARD_SIZE).fill(PIECES.empty),
  activeColor: PIECES.white,
  castlingRights: 0,
  enPassantTarget: null,
  halfMoveClock: 0,
  fullMoveNumber: 1,
};

document.addEventListener("DOMContentLoaded", () => {
  loadGameFromFEN(STARTING_POSITION_FEN);
});

const loadGameFromFEN = (fen) => {
  const [
    piecePlacement,
    activeColor,
    castlingRights,
    enPassantTarget,
    halfMoveClock,
    fullMoveNumber,
  ] = parseFEN(fen);

  game.board = loadBoardFromFEN(piecePlacement);

  game.activeColor = activeColor === "w" ? PIECES.white : PIECES.black;

  game.castlingRights = calculateCastlingRights(castlingRights);

  game.enPassantTarget =
    enPassantTarget === "-" ? null : coordinateToIndex(enPassantTarget);

  game.halfMoveClock = halfMoveClock;
  game.fullMoveNumber = fullMoveNumber;

  console.log(game);
};

const parseFEN = (fen) => {
  const EXPECTED_FIELD_COUNT = 6;
  const EXPECTED_PIECE_PLACEMENT_ROWS = 8;

  if (typeof fen !== "string")
    throw new TypeError("parseFEN | FEN must be a string.");

  const fields = fen.trim().split(/\s+/);

  if (fields.length !== EXPECTED_FIELD_COUNT)
    throw new Error(`parseFEN | Expected 6 fields, received ${fields.length}.`);

  const [
    piecePlacement,
    activeColor,
    castlingRights,
    enPassantTarget,
    halfMoveClock,
    fullMoveNumber,
  ] = fields;

  // 1. Piece placement
  // TODO: More validation here
  const rows = piecePlacement.split("/");

  if (rows.length !== EXPECTED_PIECE_PLACEMENT_ROWS)
    throw new Error(
      `parseFEN | Expected 8 rows of piece placement, received ${rows.length}.`,
    );

  // 2. Active color
  if (!["w", "b"].includes(activeColor))
    throw new Error(
      `parseFEN | Invalid active color: expected "w" or "b", received "${activeColor}".`,
    );

  // 3. Castling rights
  if (castlingRights !== "-" && !/^(?!.*(.).*\1)[KQkq]+$/.test(castlingRights))
    throw new Error(`parseFEN | Invalid castling rights: "${castlingRights}".`);

  // 4. En passant target
  if (enPassantTarget !== "-" && !/^[a-h][36]$/.test(enPassantTarget)) {
    throw new Error(
      `parseFEN | Invalid en passant target: "${enPassantTarget}". Expected "-", or a square on rank 3 or 6 (e.g. "e3" or "e6").`,
    );
  }

  // 5. Half-move clock
  if (!/^\d+$/.test(halfMoveClock))
    throw new Error(
      `parseFEN | Invalid half-move clock: "${halfMoveClock}". Expected a non-negative integer.`,
    );

  // 6. Full-move number
  if (!/^[1-9]\d*$/.test(fullMoveNumber))
    throw new Error(
      `parseFEN | Invalid full-move number: "${fullMoveNumber}". Expected a positive integer starting at 1.`,
    );

  return [
    piecePlacement,
    activeColor,
    castlingRights,
    enPassantTarget,
    Number(halfMoveClock),
    Number(fullMoveNumber),
  ];
};

const loadBoardFromFEN = (piecePlacement) => {
  const board = new Array(BOARD_SIZE).fill(PIECES.empty);

  const fenToPieceType = {
    p: PIECES.pawn,
    n: PIECES.knight,
    b: PIECES.bishop,
    r: PIECES.rook,
    q: PIECES.queen,
    k: PIECES.king,
  };

  const rows = piecePlacement.split("/");

  for (let row = 0; row < rows.length; row++) {
    let file = 0;

    for (const char of rows[row]) {
      if (/\d/.test(char)) {
        file += Number(char);
        continue;
      }

      const pieceType = fenToPieceType[char.toLowerCase()];
      const pieceColor =
        char === char.toUpperCase() ? PIECES.white : PIECES.black;

      const rank = 7 - row;
      const index = rank * 8 + file;

      board[index] = pieceType | pieceColor;

      file++;
    }
  }

  return board;
};

const calculateCastlingRights = (castlingRights) => {
  let calculatedCastlingRights = 0;

  if (castlingRights.includes("K"))
    calculatedCastlingRights |= CASTLING_RIGHTS.whiteKingside;

  if (castlingRights.includes("Q"))
    calculatedCastlingRights |= CASTLING_RIGHTS.whiteQueenside;

  if (castlingRights.includes("k"))
    calculatedCastlingRights |= CASTLING_RIGHTS.blackKingside;

  if (castlingRights.includes("q"))
    calculatedCastlingRights |= CASTLING_RIGHTS.blackQueenside;

  return calculatedCastlingRights;
};

const coordinateToIndex = (coordinate) => {
  const [file, rank] = coordinate.split("");

  return ZERO_INDEXED_RANKS[rank] * 8 + ZERO_INDEXED_FILES[file];
};
