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
  const [file, rank] = coordinate.split("");

  const zeroIndexedFile = ZERO_INDEXED_FILES[file];
  const zeroIndexedRank = ZERO_INDEXED_RANKS[rank];

  const index = zeroIndexedRank * 8 + zeroIndexedFile;

  return index;
};

const indexToAlgebraicCoordinate = (index) => {
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
