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
