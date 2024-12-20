import { FILES, RANKS, PIECE_COLOUR_MASK, PIECE_TYPE_MASK } from "./defs";

// a8 = 21, a1 = 91, h8 = 28, h1 = 98
export const FetchIndexFromCoordinate = (coordinate) => {
  const [file, rank] = coordinate.split("");

  return 21 + FILES[file] + 10 * RANKS[rank];
};

export const ExtractPieceData = (piece) => {
  const pieceColour = (piece >> 4) & PIECE_COLOUR_MASK;

  const pieceType = piece & PIECE_TYPE_MASK;

  return [pieceColour, pieceType];
};
