import { ExtractPieceData } from "../../utils/helpers";

import { PIECES, PIECE_COLORS } from "../../utils/defs";

// eslint-disable-next-line prefer-const
let colorToMove = PIECE_COLORS.white;

const IsFriendlyPiece = (piece1, piece2) => {
  const [colour1] = ExtractPieceData(piece1);
  const [colour2] = ExtractPieceData(piece2);

  return colour1 === colour2;
};

export const GenerateLegalMoves = (board) => {
  // Each item of this array is an object that represents a piece on the board, which stores the piece, its starting square and an array of its target squares
  const pieces = [];

  const PIECE_TYPES = {
    PAWN: 1,
    KNIGHT: 2,
    BISHOP: 3,
    ROOK: 4,
    QUEEN: 5,
    KING: 6,
  };

  // Loop over the board
  // TODO: Optimise by maintaing seperate arrays of white and black piece indexes instead of looping the board
  for (let i = 0; i < board.length; i++) {
    const tile = board[i];

    // If a tile is not empty and not out of bounds this means it has a piece
    if (tile !== PIECES.empty && tile !== PIECES.outOfBounds) {
      // Get the piece type
      const [pieceColor, pieceType] = ExtractPieceData(tile);

      // Ignore pieces of the opposite color
      if (pieceColor !== colorToMove) continue;

      switch (pieceType) {
        case PIECE_TYPES.PAWN:
          pieces.push(GeneratePawnMoves(board, i));
          break;
        case PIECE_TYPES.KNIGHT:
          pieces.push(GenerateKnightMoves(board, i));
          break;
        case PIECE_TYPES.BISHOP:
          pieces.push(GenerateSlidingMoves(board, i, "diagonal"));
          break;
        case PIECE_TYPES.ROOK:
          pieces.push(GenerateSlidingMoves(board, i, "orthogonal"));
          break;
        case PIECE_TYPES.QUEEN:
          pieces.push(GenerateSlidingMoves(board, i, "octolinear"));
          break;
        case PIECE_TYPES.KING:
          pieces.push(GenerateKingMoves(board, i));
          break;
        default:
          break;
      }
    }
  }

  return pieces;
};

const GenerateSlidingMoves = (board, index, pieceType) => {
  // Store different offsets for the sliding pieces
  const offsets = {
    diagonal: [11, -11, 9, -9],
    orthogonal: [10, -10, 1, -1],
    octolinear: [11, -11, 9, -9, 10, -10, 1, -1],
  };

  const startingIndex = index;

  // Generate the object to be returned
  const piece = {
    piece: board[startingIndex],
    startSquare: index,
    targetSquares: [],
  };

  // For every one of the offsets
  for (const offset of offsets[pieceType]) {
    let newIndex = startingIndex;

    // While we are still inside the board
    while (board[newIndex] >= 0) {
      // Add the offset
      newIndex += offset;

      // If out of bounds, break
      if (board[newIndex] === PIECES.outOfBounds) break;

      // If empty, consider it a legal move
      if (board[newIndex] === PIECES.empty) {
        piece.targetSquares.push(newIndex);
        continue;
      }

      // A friendly piece is blocking the movement in this direction so we cannot go any further
      if (IsFriendlyPiece(board[startingIndex], board[newIndex])) break;

      // We would capture an enemy piece and cannot go any further
      if (!IsFriendlyPiece(board[startingIndex], board[newIndex])) {
        piece.targetSquares.push(newIndex);
        break;
      }
    }
  }

  return piece;
};

// TODO: En passant
const GeneratePawnMoves = (board, index) => {
  const startingIndex = index;

  // If white pawn is between 81 - 88 it is on the starting rank, and if black is between 31 and 38 it is - this will be important for en passant rules later
  const startingRanks = {
    [PIECE_COLORS.white]: Array(8)
      .fill(0)
      .map((_, i) => 81 + i),
    [PIECE_COLORS.black]: Array(8)
      .fill(0)
      .map((_, i) => 31 + i),
  };

  const isStartingRank = startingRanks[colorToMove].includes(startingIndex);

  // Generate the object to be returned
  const piece = {
    piece: board[startingIndex],
    startSquare: index,
    targetSquares: [],
  };

  // Ensure the direction is set correctly based on the color to move
  const offsetAdjustment = colorToMove === PIECE_COLORS.white ? -1 : 1;

  const offset = 10 * offsetAdjustment;

  const newIndex = startingIndex + offset;

  const doubledIndex = newIndex + offset;

  // If empty, consider it a legal move
  if (board[newIndex] === PIECES.empty) {
    piece.targetSquares.push(newIndex);
  }

  // The pawn hasn't moved yet so it can move two squares forward - if both squares are unobstructed
  if (
    board[newIndex] === PIECES.empty &&
    board[doubledIndex] === PIECES.empty &&
    isStartingRank
  ) {
    piece.targetSquares.push(doubledIndex);
  }

  // Check to see if an enemy piece is offset diagonally (11 or 9)
  const diagonalOne = startingIndex + 11 * offsetAdjustment;
  const diagonalTwo = startingIndex + 9 * offsetAdjustment;

  // Ensure a pawn is not trying to capture outside of the board
  if (
    board[diagonalOne] !== PIECES.outOfBounds &&
    !IsFriendlyPiece(board[startingIndex], board[diagonalOne])
  ) {
    piece.targetSquares.push(diagonalOne);
  }

  if (
    board[diagonalTwo] !== PIECES.outOfBounds &&
    !IsFriendlyPiece(board[startingIndex], board[diagonalTwo])
  ) {
    piece.targetSquares.push(diagonalTwo);
  }

  return piece;
};

const GenerateKnightMoves = (board, index) => {
  // Offsets based on the L-shaped movement
  const offsets = [21, -21, 19, -19, 12, -12, 8, -8];

  const startingIndex = index;

  // Generate the object to be returned
  const piece = {
    piece: board[startingIndex],
    startSquare: index,
    targetSquares: [],
  };

  for (const offset of offsets) {
    // Knights can only move to one square at any point, so we don't need to loop here
    let newIndex = startingIndex;

    newIndex += offset;

    // If out of bounds, skip to the next direction
    if (board[newIndex] === PIECES.outOfBounds) continue;

    // If empty, consider it a legal move
    if (board[newIndex] === PIECES.empty) {
      piece.targetSquares.push(newIndex);
      continue;
    }

    // We would capture an enemy piece (otherwise assume it is a friendly piece so we cannot go to that square)
    if (!IsFriendlyPiece(board[startingIndex], board[newIndex])) {
      piece.targetSquares.push(newIndex);
    }
  }

  return piece;
};

const GenerateKingMoves = (board, index) => {
  const offsets = [-10, 10, 1, -1, 11, -11, 9, -9];

  const startingIndex = index;

  // Generate the object to be returned
  const piece = {
    piece: board[startingIndex],
    startSquare: index,
    targetSquares: [],
  };

  for (const offset of offsets) {
    let newIndex = startingIndex;

    newIndex += offset;

    // If out of bounds, skip to the next direction
    if (board[newIndex] === PIECES.outOfBounds) continue;

    // If empty, consider it a legal move
    if (board[newIndex] === PIECES.empty) {
      piece.targetSquares.push(newIndex);
      continue;
    }

    // We would capture an enemy piece (otherwise assume it is a friendly piece so we cannot go to that square)
    if (!IsFriendlyPiece(board[startingIndex], board[newIndex])) {
      piece.targetSquares.push(newIndex);
    }
  }

  return piece;
};
