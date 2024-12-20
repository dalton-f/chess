export const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

export const PIECE_COLORS = {
  white: 0,
  black: 2,
};

// Set up multiple definitions here so that we avoid using magic numbers + the code is slightly easier to understand
export const PIECES = {
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
export const FILES = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};

export const RANKS = {
  1: 7,
  2: 6,
  3: 5,
  4: 4,
  5: 3,
  6: 2,
  7: 1,
  8: 0,
};

// Set up export constants for the bitwise masks so they are easier to use alongside the above piece notation
export const PIECE_COLOUR_MASK = 0b11;
export const PIECE_TYPE_MASK = 0b1111;
