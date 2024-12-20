import { LoadPositionFromFEN } from "./components/core/BoardRepresentation/BoardRepresentation.js";

import {
  InitalizeGraphicalBoard,
  VisualizeLegalMoves,
} from "./components/core/BoardRendering/BoardRenderer.js";

import { GenerateLegalMoves } from "./components/core/MoveGeneration/MoveGenerator.js";

const fen = "r1bqkb1r/ppp1pppp/2n2n2/3p4/6P1/2N2P2/PPPPP2P/R1BQKBNR";

// Convert FEN to board representation
const board = LoadPositionFromFEN(fen);

// Given the board representation, display the board
InitalizeGraphicalBoard(board);

// Generate the legal moves in this position
const pieceMoves = GenerateLegalMoves(board);

// Visualize them on the graphical board
VisualizeLegalMoves(pieceMoves);

// ------- Temporary code below ------------
const totalLegalMoves = pieceMoves.reduce(
  (acc, curr) => acc + curr.targetSquares.length,
  0,
);

console.log(`Total legal moves in the position ${fen} is ${totalLegalMoves}`);
