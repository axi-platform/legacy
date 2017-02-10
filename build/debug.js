/*! require("source-map-support").install() */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("feathers");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("feathers-client");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("feathers-hooks");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("feathers-rest");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("feathers-socketio");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("feathers-socketio/client");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("feathers-sync");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_feathers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_feathers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_feathers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_feathers_hooks__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_feathers_hooks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_feathers_hooks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_feathers_rest__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_feathers_rest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_feathers_rest__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_feathers_socketio__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_feathers_socketio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_feathers_socketio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_feathers_sync__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_feathers_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_feathers_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_feathers_client__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_feathers_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_feathers_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_feathers_socketio_client__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_feathers_socketio_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_feathers_socketio_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_socket_io_client__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_socket_io_client__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }











var PORT = 3001;
var SERVICE = "http://localhost:3000";
var REDIS_CONN = "redis://localhost:6379";

var app = __WEBPACK_IMPORTED_MODULE_0_feathers___default()();
var worker = __WEBPACK_IMPORTED_MODULE_5_feathers_client___default()().configure(__WEBPACK_IMPORTED_MODULE_6_feathers_socketio_client___default()(__WEBPACK_IMPORTED_MODULE_7_socket_io_client___default()(SERVICE)));

app.configure(__WEBPACK_IMPORTED_MODULE_1_feathers_hooks___default()());
app.configure(__WEBPACK_IMPORTED_MODULE_2_feathers_rest___default()());
app.configure(__WEBPACK_IMPORTED_MODULE_3_feathers_socketio___default()());
app.configure(__WEBPACK_IMPORTED_MODULE_4_feathers_sync___default()({
  db: REDIS_CONN
}));

var DebugService = function DebugService() {
  var _this = this;

  _classCallCheck(this, DebugService);

  this.find = function () {
    return Promise.resolve("Resolving Promises");
  };

  this.get = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
      var debug;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.time("conn");
              _context.next = 3;
              return worker.service("debug").find();

            case 3:
              debug = _context.sent;

              console.timeEnd("conn");
              return _context.abrupt("return", debug);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

app.use("/", new DebugService());

app.listen(PORT);

/***/ })
/******/ ]);
//# sourceMappingURL=debug.js.map