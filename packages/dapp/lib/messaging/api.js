"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageApi = void 0;

var _types = require("@algosigner/common/messaging/types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MessageApi = /*#__PURE__*/function () {
  function MessageApi() {
    _classCallCheck(this, MessageApi);

    _defineProperty(this, "mc", void 0);

    this.mc = new MessageChannel();
  }

  _createClass(MessageApi, [{
    key: "listen",
    value: function listen(handler) {
      this.mc.port1.onmessage = handler;
    }
  }, {
    key: "send",
    value: function send(body) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types.MessageSource.DApp;
      var msg = {
        source: source,
        body: body
      };
      window.postMessage(msg, window.location.origin, [this.mc.port2]);
    }
  }]);

  return MessageApi;
}();

exports.MessageApi = MessageApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdpbmcvYXBpLnRzIl0sIm5hbWVzIjpbIk1lc3NhZ2VBcGkiLCJtYyIsIk1lc3NhZ2VDaGFubmVsIiwiaGFuZGxlciIsInBvcnQxIiwib25tZXNzYWdlIiwiYm9keSIsInNvdXJjZSIsIk1lc3NhZ2VTb3VyY2UiLCJEQXBwIiwibXNnIiwid2luZG93IiwicG9zdE1lc3NhZ2UiLCJsb2NhdGlvbiIsIm9yaWdpbiIsInBvcnQyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFYUEsVTtBQUVULHdCQUFjO0FBQUE7O0FBQUE7O0FBQ1YsU0FBS0MsRUFBTCxHQUFVLElBQUlDLGNBQUosRUFBVjtBQUNIOzs7OzJCQUVNQyxPLEVBQTRCO0FBQy9CLFdBQUtGLEVBQUwsQ0FBUUcsS0FBUixDQUFjQyxTQUFkLEdBQTBCRixPQUExQjtBQUNIOzs7eUJBRUlHLEksRUFBK0Q7QUFBQSxVQUE1Q0MsTUFBNEMsdUVBQXBCQyxxQkFBY0MsSUFBTTtBQUNoRSxVQUFJQyxHQUFnQixHQUFHO0FBQ25CSCxRQUFBQSxNQUFNLEVBQUVBLE1BRFc7QUFFbkJELFFBQUFBLElBQUksRUFBRUE7QUFGYSxPQUF2QjtBQUlBSyxNQUFBQSxNQUFNLENBQUNDLFdBQVAsQ0FBbUJGLEdBQW5CLEVBQXdCQyxNQUFNLENBQUNFLFFBQVAsQ0FBZ0JDLE1BQXhDLEVBQWdELENBQUMsS0FBS2IsRUFBTCxDQUFRYyxLQUFULENBQWhEO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09uTWVzc2FnZUxpc3RlbmVyfSBmcm9tICcuL3R5cGVzJzsgXHJcbmltcG9ydCB7SnNvblJwY0JvZHksTWVzc2FnZUJvZHksTWVzc2FnZVNvdXJjZX0gZnJvbSAnQGFsZ29zaWduZXIvY29tbW9uL21lc3NhZ2luZy90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUFwaSB7XHJcbiAgICBtYzogTWVzc2FnZUNoYW5uZWw7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1jID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVuKGhhbmRsZXI6IE9uTWVzc2FnZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5tYy5wb3J0MS5vbm1lc3NhZ2UgPSBoYW5kbGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmQoYm9keTogSnNvblJwY0JvZHksIHNvdXJjZTogTWVzc2FnZVNvdXJjZSA9IE1lc3NhZ2VTb3VyY2UuREFwcCkge1xyXG4gICAgICAgIGxldCBtc2c6IE1lc3NhZ2VCb2R5ID0ge1xyXG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgICAgICAgICAgYm9keTogYm9keVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UobXNnLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luLCBbdGhpcy5tYy5wb3J0Ml0pO1xyXG4gICAgfVxyXG59Il19