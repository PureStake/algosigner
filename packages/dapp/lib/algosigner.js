"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlgoSigner = void 0;

var _task = require("./fn/task");

var _router = require("./fn/router");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Wrapper = /*#__PURE__*/function () {
  function Wrapper() {
    _classCallCheck(this, Wrapper);

    _defineProperty(this, "task", new _task.Task());

    _defineProperty(this, "router", new _router.Router());

    _defineProperty(this, "connect", this.task.connect);

    _defineProperty(this, "sign", this.task.sign);

    _defineProperty(this, "query", this.task.query);

    _defineProperty(this, "subscribe", this.task.subscribe);
  }

  _createClass(Wrapper, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!Wrapper.instance) {
        Wrapper.instance = new Wrapper();
      }

      return Wrapper.instance;
    }
  }]);

  return Wrapper;
}();

_defineProperty(Wrapper, "instance", void 0);

var AlgoSigner = Wrapper.getInstance();
exports.AlgoSigner = AlgoSigner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGdvc2lnbmVyLnRzIl0sIm5hbWVzIjpbIldyYXBwZXIiLCJUYXNrIiwiUm91dGVyIiwidGFzayIsImNvbm5lY3QiLCJzaWduIiwicXVlcnkiLCJzdWJzY3JpYmUiLCJpbnN0YW5jZSIsIkFsZ29TaWduZXIiLCJnZXRJbnN0YW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7O0lBRU1BLE87Ozs7a0NBRW1CLElBQUlDLFVBQUosRTs7b0NBQ0ksSUFBSUMsY0FBSixFOztxQ0FFRSxLQUFLQyxJQUFMLENBQVVDLE87O2tDQUNiLEtBQUtELElBQUwsQ0FBVUUsSTs7bUNBQ1QsS0FBS0YsSUFBTCxDQUFVRyxLOzt1Q0FDTixLQUFLSCxJQUFMLENBQVVJLFM7Ozs7O2tDQUVGO0FBQ2pDLFVBQUksQ0FBQ1AsT0FBTyxDQUFDUSxRQUFiLEVBQXVCO0FBQ25CUixRQUFBQSxPQUFPLENBQUNRLFFBQVIsR0FBbUIsSUFBSVIsT0FBSixFQUFuQjtBQUNIOztBQUNELGFBQU9BLE9BQU8sQ0FBQ1EsUUFBZjtBQUNIOzs7Ozs7Z0JBZkNSLE87O0FBa0JDLElBQU1TLFVBQVUsR0FBR1QsT0FBTyxDQUFDVSxXQUFSLEVBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUYXNrfSBmcm9tICcuL2ZuL3Rhc2snO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnLi9mbi9yb3V0ZXInO1xyXG5cclxuY2xhc3MgV3JhcHBlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogV3JhcHBlcjtcclxuICAgIHByaXZhdGUgdGFzazogVGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY29ubmVjdDogRnVuY3Rpb24gPSB0aGlzLnRhc2suY29ubmVjdDtcclxuICAgIHB1YmxpYyBzaWduOiBGdW5jdGlvbiA9IHRoaXMudGFzay5zaWduO1xyXG4gICAgcHVibGljIHF1ZXJ5OiBGdW5jdGlvbiA9IHRoaXMudGFzay5xdWVyeTtcclxuICAgIHB1YmxpYyBzdWJzY3JpYmU6IEZ1bmN0aW9uID0gdGhpcy50YXNrLnN1YnNjcmliZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFdyYXBwZXIge1xyXG4gICAgICAgIGlmICghV3JhcHBlci5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBXcmFwcGVyLmluc3RhbmNlID0gbmV3IFdyYXBwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFdyYXBwZXIuaW5zdGFuY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBbGdvU2lnbmVyID0gV3JhcHBlci5nZXRJbnN0YW5jZSgpOyJdfQ==