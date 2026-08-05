/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/app.pcss":
/*!**************************!*\
  !*** ./src/css/app.pcss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var STARTING_POSITION_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
var PIECES = {
  empty: 0,
  pawn: 1,
  knight: 2,
  bishop: 3,
  rook: 4,
  queen: 5,
  king: 6,
  white: 8,
  black: 16
};
var ZERO_INDEXED_FILES = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
};
var ZERO_INDEXED_RANKS = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7
};
var CASTLING_RIGHTS = {
  whiteKingside: 1,
  whiteQueenside: 2,
  blackKingside: 4,
  blackQueenside: 8
};

// state.board gets used for the UI, and the occupancy bitboards get used for the internal calculation
var state = {
  activeColor: PIECES.white,
  castlingRights: 15,
  enPassantSquare: null,
  halfMoveClock: 0,
  fullMoveNumber: 1,
  board: [],
  occupancyBitboards: {
    white: {
      pawns: 0n,
      knights: 0n,
      bishops: 0n,
      rooks: 0n,
      queens: 0n,
      king: 0n
    },
    black: {
      pawns: 0n,
      knights: 0n,
      bishops: 0n,
      rooks: 0n,
      queens: 0n,
      king: 0n
    }
  }
};
var algebraicCoordinateToIndex = function algebraicCoordinateToIndex(coordinate) {
  if (typeof coordinate !== "string") throw new TypeError("algebraicCoordinateToIndex | Coordinate must be a string.");
  if (coordinate.length !== 2) {
    throw new Error("algebraicCoordinateToIndex | Coordinate \"".concat(coordinate, "\" must be exactly 2 characters long."));
  }
  var _coordinate$split = coordinate.split(""),
    _coordinate$split2 = _slicedToArray(_coordinate$split, 2),
    file = _coordinate$split2[0],
    rank = _coordinate$split2[1];
  if (!(file in ZERO_INDEXED_FILES)) {
    throw new Error("algebraicCoordinateToIndex | Invalid file \"".concat(file, "\". Expected a-h."));
  }
  if (!(rank in ZERO_INDEXED_RANKS)) {
    throw new Error("algebraicCoordinateToIndex | Invalid rank \"".concat(rank, "\". Expected 1-8."));
  }
  var zeroIndexedFile = ZERO_INDEXED_FILES[file];
  var zeroIndexedRank = ZERO_INDEXED_RANKS[rank];
  var index = zeroIndexedRank * 8 + zeroIndexedFile;
  return index;
};
var indexToAlgebraicCoordinate = function indexToAlgebraicCoordinate(index) {
  if (typeof index !== "number") throw new TypeError("indexToAlgebraicCoordinate | Index must be a number.");
  if (index < 0 || index > 63) {
    throw new Error("indexToAlgebraicCoordinate | Index must be a non-negative number between 0 and 63.");
  }
  var files = "abcdefgh";
  var zeroIndexedFile = index % 8;
  var zeroIndexedRank = Math.floor(index / 8);
  var file = files[zeroIndexedFile];
  var rank = zeroIndexedRank + 1;
  return "".concat(file).concat(rank);
};
var convertFENToBoard = function convertFENToBoard(fenString) {
  var fenSymbolToPieceMap = {
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
    K: PIECES.king | PIECES.white
  };
  var pieceTypeToBitboardName = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, PIECES.pawn, "pawns"), PIECES.knight, "knights"), PIECES.bishop, "bishops"), PIECES.rook, "rooks"), PIECES.queen, "queens"), PIECES.king, "king");
  var board = new Array(64).fill(PIECES.empty);
  var index = algebraicCoordinateToIndex("a8");
  var ranks = fenString.split("/");
  var _iterator = _createForOfIteratorHelper(ranks),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rank = _step.value;
      var _iterator2 = _createForOfIteratorHelper(rank),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _char = _step2.value;
          var emptySquares = Number(_char);
          if (!Number.isNaN(emptySquares)) {
            index += emptySquares;
            continue;
          }
          var piece = fenSymbolToPieceMap[_char];
          board[index] = piece;

          // Update occupancy bitboards as part of looping through each piece on the board
          var color = piece & PIECES.white ? "white" : "black";
          var type = piece & 7;
          state.occupancyBitboards[color][pieceTypeToBitboardName[type]] |= 1n << BigInt(index);
          index++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      index -= 16;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return board;
};
var displayBoard = function displayBoard(board) {
  var _pieceToImageMap;
  if (!Array.isArray(board)) throw new TypeError("displayBoard | board must be an array.");
  if (board.length !== 64) throw new Error("displayBoard | expected board length of 64, received ".concat(board.length, "."));
  var pieceToImageMap = (_pieceToImageMap = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_pieceToImageMap, PIECES.white | PIECES.pawn, "static/images/whitePawn.svg"), PIECES.white | PIECES.knight, "static/images/whiteKnight.svg"), PIECES.white | PIECES.bishop, "static/images/whiteBishop.svg"), PIECES.white | PIECES.rook, "static/images/whiteRook.svg"), PIECES.white | PIECES.queen, "static/images/whiteQueen.svg"), PIECES.white | PIECES.king, "static/images/whiteKing.svg"), PIECES.black | PIECES.pawn, "static/images/blackPawn.svg"), PIECES.black | PIECES.knight, "static/images/blackKnight.svg"), PIECES.black | PIECES.bishop, "static/images/blackBishop.svg"), PIECES.black | PIECES.rook, "static/images/blackRook.svg"), _defineProperty(_defineProperty(_pieceToImageMap, PIECES.black | PIECES.queen, "static/images/blackQueen.svg"), PIECES.black | PIECES.king, "static/images/blackKing.svg"));
  var boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  if (!boardElement) throw new Error('displayBoard | element with id "board" not found.');
  var fragment = document.createDocumentFragment();
  for (var rank = 7; rank >= 0; rank--) {
    for (var file = 0; file < 8; file++) {
      var index = rank * 8 + file;
      var square = document.createElement("div");
      square.classList.add("size-22");
      var isEvenSquare = (rank + file) % 2 === 0;
      square.classList.add(isEvenSquare ? "bg-lime-50" : "bg-brielle");
      var piece = board[index];
      var pieceImageSrc = pieceToImageMap[piece];
      if (pieceImageSrc) {
        var pieceImage = document.createElement("img");
        pieceImage.src = pieceImageSrc;
        square.appendChild(pieceImage);
      }
      fragment.appendChild(square);
    }
  }
  boardElement.appendChild(fragment);
};
var printBitboard = function printBitboard(bitboard) {
  var stringBitboard = "";
  for (var rank = 7; rank >= 0; rank--) {
    for (var file = 0; file < 8; file++) {
      var square = BigInt(rank * 8 + file);
      stringBitboard += bitboard & 1n << square ? "1 " : ". ";
    }
    stringBitboard += "\n";
  }
  console.log(stringBitboard);
};
var debugState = function debugState(state) {
  var _pieceSymbols, _state$enPassantSquar;
  var pieceSymbols = (_pieceSymbols = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_pieceSymbols, PIECES.white | PIECES.pawn, "P"), PIECES.white | PIECES.knight, "N"), PIECES.white | PIECES.bishop, "B"), PIECES.white | PIECES.rook, "R"), PIECES.white | PIECES.queen, "Q"), PIECES.white | PIECES.king, "K"), PIECES.black | PIECES.pawn, "p"), PIECES.black | PIECES.knight, "n"), PIECES.black | PIECES.bishop, "b"), PIECES.black | PIECES.rook, "r"), _defineProperty(_defineProperty(_pieceSymbols, PIECES.black | PIECES.queen, "q"), PIECES.black | PIECES.king, "k"));
  console.log("=".repeat(70));
  console.log("GAME STATE");
  console.log("=".repeat(70));
  console.log("Side to move: ".concat(state.activeColor === PIECES.white ? "White" : "Black"));
  console.log("Castling: ".concat((state.castlingRights & 8 ? "K" : "") + (state.castlingRights & 4 ? "Q" : "") + (state.castlingRights & 2 ? "k" : "") + (state.castlingRights & 1 ? "q" : "") || "-"));
  console.log("En Passant: ".concat((_state$enPassantSquar = state.enPassantSquare) !== null && _state$enPassantSquar !== void 0 ? _state$enPassantSquar : "-"));
  console.log("Half Moves: ".concat(state.halfMoveClock));
  console.log("Full Moves: ".concat(state.fullMoveNumber));
  console.log("=".repeat(70));
  console.log("BOARD");
  console.log("=".repeat(70));
  var boardString = "";
  for (var rank = 7; rank >= 0; rank--) {
    boardString += "".concat(rank + 1, " ");
    for (var file = 0; file < 8; file++) {
      var _pieceSymbols$piece;
      var square = rank * 8 + file;
      var piece = state.board[square];
      boardString += ((_pieceSymbols$piece = pieceSymbols[piece]) !== null && _pieceSymbols$piece !== void 0 ? _pieceSymbols$piece : ".") + " ";
    }
    boardString += "\n";
  }
  boardString += "  a b c d e f g h";
  console.log(boardString);
  console.log("=".repeat(70));
  console.log("WHITE BITBOARDS");
  console.log("=".repeat(70));
  for (var _i = 0, _Object$entries = Object.entries(state.occupancyBitboards.white); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      name = _Object$entries$_i[0],
      bb = _Object$entries$_i[1];
    console.log("\n".concat(name.toUpperCase()));
    printBitboard(bb);
  }
  console.log("=".repeat(70));
  console.log("BLACK BITBOARDS");
  console.log("=".repeat(70));
  for (var _i2 = 0, _Object$entries2 = Object.entries(state.occupancyBitboards.black); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
      _name = _Object$entries2$_i[0],
      _bb = _Object$entries2$_i[1];
    console.log("\n".concat(_name.toUpperCase()));
    printBitboard(_bb);
  }
  var whiteOccupancy = state.occupancyBitboards.white.pawns | state.occupancyBitboards.white.knights | state.occupancyBitboards.white.bishops | state.occupancyBitboards.white.rooks | state.occupancyBitboards.white.queens | state.occupancyBitboards.white.king;
  var blackOccupancy = state.occupancyBitboards.black.pawns | state.occupancyBitboards.black.knights | state.occupancyBitboards.black.bishops | state.occupancyBitboards.black.rooks | state.occupancyBitboards.black.queens | state.occupancyBitboards.black.king;
  console.log("=".repeat(70));
  console.log("WHITE OCCUPANCY");
  console.log("=".repeat(70));
  printBitboard(whiteOccupancy);
  console.log("=".repeat(70));
  console.log("BLACK OCCUPANCY");
  console.log("=".repeat(70));
  printBitboard(blackOccupancy);
  console.log("=".repeat(70));
  console.log("ALL OCCUPANCY");
  console.log("=".repeat(70));
  printBitboard(whiteOccupancy | blackOccupancy);
};
state.board = convertFENToBoard(STARTING_POSITION_FEN);
displayBoard(state.board);
debugState(state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/static/js/app": 0,
/******/ 			"static/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkchess"] = self["webpackChunkchess"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["static/css/app"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["static/css/app"], () => (__webpack_require__("./src/css/app.pcss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;