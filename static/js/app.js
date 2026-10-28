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
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var STARTING_POSITION_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
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
var CASTLING_RIGHTS = {
  whiteKingside: 1,
  whiteQueenside: 2,
  blackKingside: 4,
  blackQueenside: 8
};
var BOARD_SIZE = 64;
var game = {
  board: new Array(BOARD_SIZE).fill(PIECES.empty),
  activeColor: PIECES.white,
  castlingRights: 0,
  enPassantTarget: null,
  halfMoveClock: 0,
  fullMoveNumber: 1
};
document.addEventListener("DOMContentLoaded", function () {
  loadGameFromFEN(STARTING_POSITION_FEN);
  displayBoard();
});
var loadGameFromFEN = function loadGameFromFEN(fen) {
  var _parseFEN = parseFEN(fen),
    _parseFEN2 = _slicedToArray(_parseFEN, 6),
    piecePlacement = _parseFEN2[0],
    activeColor = _parseFEN2[1],
    castlingRights = _parseFEN2[2],
    enPassantTarget = _parseFEN2[3],
    halfMoveClock = _parseFEN2[4],
    fullMoveNumber = _parseFEN2[5];
  game.board = loadBoardFromFEN(piecePlacement);
  game.activeColor = activeColor === "w" ? PIECES.white : PIECES.black;
  game.castlingRights = calculateCastlingRights(castlingRights);
  game.enPassantTarget = enPassantTarget === "-" ? null : coordinateToIndex(enPassantTarget);
  game.halfMoveClock = halfMoveClock;
  game.fullMoveNumber = fullMoveNumber;
  console.log(game);
};
var displayBoard = function displayBoard() {
  var _PIECE_IMAGES;
  var PIECE_IMAGES = (_PIECE_IMAGES = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_PIECE_IMAGES, PIECES.pawn | PIECES.white, "static/images/whitePawn.svg"), PIECES.knight | PIECES.white, "static/images/whiteKnight.svg"), PIECES.bishop | PIECES.white, "static/images/whiteBishop.svg"), PIECES.rook | PIECES.white, "static/images/whiteRook.svg"), PIECES.queen | PIECES.white, "static/images/whiteQueen.svg"), PIECES.king | PIECES.white, "static/images/whiteKing.svg"), PIECES.pawn | PIECES.black, "static/images/blackPawn.svg"), PIECES.knight | PIECES.black, "static/images/blackKnight.svg"), PIECES.bishop | PIECES.black, "static/images/blackBishop.svg"), PIECES.rook | PIECES.black, "static/images/blackRook.svg"), _defineProperty(_defineProperty(_PIECE_IMAGES, PIECES.queen | PIECES.black, "static/images/blackQueen.svg"), PIECES.king | PIECES.black, "static/images/blackKing.svg"));
  var chessboard = document.getElementById("chessboard");
  var fragment = document.createDocumentFragment();
  for (var rank = 7; rank >= 0; rank--) {
    for (var file = 0; file < 8; file++) {
      var index = rank * 8 + file;
      var piece = game.board[index];
      var square = document.createElement("div");
      square.classList.add("flex", "aspect-square", "w-10", "md:w-20");

      // Alternate light and dark squares.
      var isLightSquare = (rank + file) % 2 === 0;
      square.classList.add(isLightSquare ? "bg-oregano" : "bg-solitude");
      square.dataset.square = index;

      // Display the piece, if one exists.
      if (piece !== PIECES.empty) {
        var img = document.createElement("img");
        img.src = PIECE_IMAGES[piece];
        img.alt = "Piece on square ".concat(index);
        square.appendChild(img);
      }
      fragment.appendChild(square);
    }
  }
  chessboard.replaceChildren(fragment);
};
var parseFEN = function parseFEN(fen) {
  var EXPECTED_FIELD_COUNT = 6;
  var EXPECTED_PIECE_PLACEMENT_ROWS = 8;
  if (typeof fen !== "string") throw new TypeError("parseFEN | FEN must be a string.");
  var fields = fen.trim().split(/\s+/);
  if (fields.length !== EXPECTED_FIELD_COUNT) throw new Error("parseFEN | Expected 6 fields, received ".concat(fields.length, "."));
  var _fields = _slicedToArray(fields, 6),
    piecePlacement = _fields[0],
    activeColor = _fields[1],
    castlingRights = _fields[2],
    enPassantTarget = _fields[3],
    halfMoveClock = _fields[4],
    fullMoveNumber = _fields[5];

  // 1. Piece placement
  // TODO: More validation here
  var rows = piecePlacement.split("/");
  if (rows.length !== EXPECTED_PIECE_PLACEMENT_ROWS) throw new Error("parseFEN | Expected 8 rows of piece placement, received ".concat(rows.length, "."));

  // 2. Active color
  if (!["w", "b"].includes(activeColor)) throw new Error("parseFEN | Invalid active color: expected \"w\" or \"b\", received \"".concat(activeColor, "\"."));

  // 3. Castling rights
  if (castlingRights !== "-" && !/^(?!.*(.).*\1)[KQkq]+$/.test(castlingRights)) throw new Error("parseFEN | Invalid castling rights: \"".concat(castlingRights, "\"."));

  // 4. En passant target
  if (enPassantTarget !== "-" && !/^[a-h][36]$/.test(enPassantTarget)) {
    throw new Error("parseFEN | Invalid en passant target: \"".concat(enPassantTarget, "\". Expected \"-\", or a square on rank 3 or 6 (e.g. \"e3\" or \"e6\")."));
  }

  // 5. Half-move clock
  if (!/^\d+$/.test(halfMoveClock)) throw new Error("parseFEN | Invalid half-move clock: \"".concat(halfMoveClock, "\". Expected a non-negative integer."));

  // 6. Full-move number
  if (!/^[1-9]\d*$/.test(fullMoveNumber)) throw new Error("parseFEN | Invalid full-move number: \"".concat(fullMoveNumber, "\". Expected a positive integer starting at 1."));
  return [piecePlacement, activeColor, castlingRights, enPassantTarget, Number(halfMoveClock), Number(fullMoveNumber)];
};
var loadBoardFromFEN = function loadBoardFromFEN(piecePlacement) {
  var board = new Array(BOARD_SIZE).fill(PIECES.empty);
  var fenToPieceType = {
    p: PIECES.pawn,
    n: PIECES.knight,
    b: PIECES.bishop,
    r: PIECES.rook,
    q: PIECES.queen,
    k: PIECES.king
  };
  var rows = piecePlacement.split("/");
  for (var row = 0; row < rows.length; row++) {
    var file = 0;
    var _iterator = _createForOfIteratorHelper(rows[row]),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _char = _step.value;
        if (/\d/.test(_char)) {
          file += Number(_char);
          continue;
        }
        var pieceType = fenToPieceType[_char.toLowerCase()];
        var pieceColor = _char === _char.toUpperCase() ? PIECES.white : PIECES.black;
        var rank = 7 - row;
        var index = rank * 8 + file;
        board[index] = pieceType | pieceColor;
        file++;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return board;
};
var calculateCastlingRights = function calculateCastlingRights(castlingRights) {
  var calculatedCastlingRights = 0;
  if (castlingRights.includes("K")) calculatedCastlingRights |= CASTLING_RIGHTS.whiteKingside;
  if (castlingRights.includes("Q")) calculatedCastlingRights |= CASTLING_RIGHTS.whiteQueenside;
  if (castlingRights.includes("k")) calculatedCastlingRights |= CASTLING_RIGHTS.blackKingside;
  if (castlingRights.includes("q")) calculatedCastlingRights |= CASTLING_RIGHTS.blackQueenside;
  return calculatedCastlingRights;
};
var coordinateToIndex = function coordinateToIndex(coordinate) {
  var _coordinate$split = coordinate.split(""),
    _coordinate$split2 = _slicedToArray(_coordinate$split, 2),
    file = _coordinate$split2[0],
    rank = _coordinate$split2[1];
  return ZERO_INDEXED_RANKS[rank] * 8 + ZERO_INDEXED_FILES[file];
};

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