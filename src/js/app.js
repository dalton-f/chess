const STARTING_POSITION_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

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

const algebraicCoordinateToIndex = (coordinate) => {
  if (typeof coordinate !== "string")
    throw new TypeError(
      "algebraicCoordinateToIndex | Coordinate must be a string.",
    );

  if (coordinate.length !== 2) {
    throw new Error(
      `algebraicCoordinateToIndex | Coordinate "${coordinate}" must be exactly 2 characters long.`,
    );
  }

  const [file, rank] = coordinate.split("");

  if (!(file in ZERO_INDEXED_FILES)) {
    throw new Error(
      `algebraicCoordinateToIndex | Invalid file "${file}". Expected a-h.`,
    );
  }

  if (!(rank in ZERO_INDEXED_RANKS)) {
    throw new Error(
      `algebraicCoordinateToIndex | Invalid rank "${rank}". Expected 1-8.`,
    );
  }

  const zeroIndexedFile = ZERO_INDEXED_FILES[file];
  const zeroIndexedRank = ZERO_INDEXED_RANKS[rank];

  const index = zeroIndexedRank * 8 + zeroIndexedFile;

  return index;
};

const indexToAlgebraicCoordinate = (index) => {
  if (typeof index !== "number")
    throw new TypeError("indexToAlgebraicCoordinate | Index must be a number.");

  if (index < 0 || index > 63) {
    throw new Error(
      "indexToAlgebraicCoordinate | Index must be a non-negative number between 0 and 63.",
    );
  }

  const files = "abcdefgh";

  const zeroIndexedFile = index % 8;
  const zeroIndexedRank = Math.floor(index / 8);

  const file = files[zeroIndexedFile];
  const rank = zeroIndexedRank + 1;

  return `${file}${rank}`;
};

const convertFENToBoard = (fenString) => {
  const fenSymbolToPieceMap = {
    p: PIECES.pawn | PIECES.black,
    n: PIECES.knight | PIECES.black,
    b: PIECES.bishop | PIECES.black,
    r: PIECES.rook | PIECES.black,
    q: PIECES.queen | PIECES.black,
    k: PIECES.king | PIECES.black,
    P: PIECES.pawn | PIECES.white,
    N: PIECES.knight | PIECES.white,
    B: PIECES.bishop | PIECES.white,
    R: PIECES.rook | PIECES.white,
    Q: PIECES.queen | PIECES.white,
    K: PIECES.king | PIECES.white,
  };

  const board = new Array(64).fill(PIECES.empty);

  let index = algebraicCoordinateToIndex("a8");

  const ranks = fenString.split("/");

  for (const rank of ranks) {
    for (const char of rank) {
      const emptySquares = Number(char);

      if (!Number.isNaN(emptySquares)) {
        index += emptySquares;
        continue;
      }

      board[index] = fenSymbolToPieceMap[char];

      index++;
    }

    index -= 16;
  }

  return board;
};

// TODO: Optimise this function
const displayBoard = (board) => {
  const pieceToImageMap = {
    [PIECES.white | PIECES.pawn]: "static/images/whitePawn.svg",
    [PIECES.white | PIECES.knight]: "static/images/whiteKnight.svg",
    [PIECES.white | PIECES.bishop]: "static/images/whiteBishop.svg",
    [PIECES.white | PIECES.rook]: "static/images/whiteRook.svg",
    [PIECES.white | PIECES.queen]: "static/images/whiteQueen.svg",
    [PIECES.white | PIECES.king]: "static/images/whiteKing.svg",

    [PIECES.black | PIECES.pawn]: "static/images/blackPawn.svg",
    [PIECES.black | PIECES.knight]: "static/images/blackKnight.svg",
    [PIECES.black | PIECES.bishop]: "static/images/blackBishop.svg",
    [PIECES.black | PIECES.rook]: "static/images/blackRook.svg",
    [PIECES.black | PIECES.queen]: "static/images/blackQueen.svg",
    [PIECES.black | PIECES.king]: "static/images/blackKing.svg",
  };

  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  for (let rank = 7; rank >= 0; rank--) {
    for (let file = 0; file < 8; file++) {
      const index = rank * 8 + file;

      const square = document.createElement("div");
      square.classList.add("size-22");

      const isEvenSquare = (rank + file) % 2 === 0;

      square.classList.add(isEvenSquare ? "bg-lime-50" : "bg-brielle");

      const piece = board[index];
      const pieceImageSrc = pieceToImageMap[piece];

      if (pieceImageSrc) {
        const pieceImage = document.createElement("img");
        pieceImage.src = pieceImageSrc;
        square.appendChild(pieceImage);
      }

      boardElement.appendChild(square);
    }
  }
};

const board = convertFENToBoard(STARTING_POSITION_FEN);

displayBoard(board);

console.log(board);
