About

This project was initially designed in order just to create the classic game of chess, using basic event listeners and the draggable attribute.

Eventually, after reworking the project and wanting to expand it to include puzzles, I decided to make a chess engine.

When making an engine, there are lots of parts to consider. This file acts as a more detailed look into how the project works, and a general place for me to keep track of the finer details.

Project Roadmap:

- FEN to Bitboard (functions)
- Bitboard to FEN (functions)
- Coordinate to index (functions)
- Psuedo-legal move generation
- Computer to make random moves
- Generating a random legal FEN string
- Evaluation of a position

--

Board Representation

In the project, the board is represented by an array of numerical values. In theory, you could use an array of length 64 to directly map to the 64 squares of chess.
We will use an array of length 120 however, as it allows us to include extra files and ranks to represent the out of bounds of the board, which saves on some calculation
and logic dring the move generation.

The chess board will be represented in a portion of this array starting at index 21 (a1) and ending at index 98 (h8). We can convert from a more typical chess coordinate
into its coressponding index using the formula

    index = (21 + fileNumber) + (10 x rankNumber)

Of course, the files are letters so we have to convert them (and the rank numbers) into a zero-indexed system.

In this board represenation, the values we use to represent certain states are described below:

Empty = 0

Out of bounds/board = -1

The piece values are set in a way where they can be represented as a 6 bit binary number. The first two bits represent the piece color and the remaining four bits represent the piece type. This allows us to use some bitwise shifts and masks to extract this information from an otherwise arbitrary number.

White pawn = 1 (000001)
White knight = 2 (000010)
White bishop = 3 (000011)
White rook = 4 (000100)
White queen = 5 (000101)
White king = 6 (000110)

Black pawn = 33 (100001)
Black knight = 34 (100010)
Black bishop = 35 (100011)
Black rook = 36 (100100)
Black queen = 37 (100101)
Black king = 38 (100110)

A typical and easy way to describe a chess position is often done using Forsyth-Edwards Notation. FEN strings begin with describing the pieces on the 8th rank and moving down. Lowercase letters describe black pieces and uppercase letters describe white pieces. Empty squares are described by numbers 1 to 8. The FEN of the starting chess position looks like this: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

Within this project, there will be ways to use FEN strings in the GUI to upload your own chess positions, and these will get converted into the board representation above. You can find out more about FEN here: https://www.chess.com/terms/fen-chess

--

Evaluation

--
