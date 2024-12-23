import { FILES, RANKS, PIECE_COLOUR_MASK, PIECE_TYPE_MASK } from "./defs";

/**
 * Calculates the index of a chessboard square from its coordinate label.
 *
 * @param {string} coordinate - Traditional square coordinate (e.g., "a1", "h8")
 * @returns {number} Index of the cell starting from 21 and ending at 98
 */
export const FetchIndexFromCoordinate = (coordinate) => {
  if (typeof coordinate !== "string") {
    throw new Error("Coordinate must be a string");
  }

  const [file, rank] = coordinate.split("");

  if (FILES[file] === undefined || RANKS[rank] === undefined) {
    throw new Error(`Invalid coordinate: ${coordinate}`);
  }

  return 21 + FILES[file] + 10 * RANKS[rank];
};

/**
 * Extracts color and type information from a given chess piece.
 *
 * @description
 *
 * This using some bitwise operations and masks to extract the relevant data from the piece.
 * This works because each piece is represented by an integer that can be represented as a 6 bit binary number where the first two bits represent the colour and the last four bits represent the piece type.
 *
 * @param {number} piece - An integer representing the chess piece.
 * @returns {Array<number>} An array containing two elements:
 *   1. pieceColour: The color of the piece (0 or 1).
 *   2. pieceType: The type of the piece (color independent).
 */
export const ExtractPieceData = (piece) => {
  const pieceColour = (piece >> 4) & PIECE_COLOUR_MASK;

  const pieceType = piece & PIECE_TYPE_MASK;

  return [pieceColour, pieceType];
};
