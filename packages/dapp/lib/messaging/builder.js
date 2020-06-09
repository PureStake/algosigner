"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBuilder = void 0;

var _types = require("@algosigner/common/types");

var _jsonrpc = require("@algosigner/common/messaging/jsonrpc");

var _api = require("./api");

var _handler = require("./handler");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageBuilder = /*#__PURE__*/function () {
  function MessageBuilder() {
    _classCallCheck(this, MessageBuilder);
  }

  _createClass(MessageBuilder, null, [{
    key: "promise",
    value: function promise(method, params) {
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _types.RequestErrors.None;
      return new Promise(function (resolve, reject) {
        if (error == _types.RequestErrors.None) {
          var api = new _api.MessageApi();
          api.listen(_handler.OnMessageHandler.promise(resolve, reject));
          api.send(_jsonrpc.JsonRpc.getBody(method, params));
        } else {
          reject(error);
        }
      });
    }
  }]);

  return MessageBuilder;
}();

exports.MessageBuilder = MessageBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdpbmcvYnVpbGRlci50cyJdLCJuYW1lcyI6WyJNZXNzYWdlQnVpbGRlciIsIm1ldGhvZCIsInBhcmFtcyIsImVycm9yIiwiUmVxdWVzdEVycm9ycyIsIk5vbmUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImFwaSIsIk1lc3NhZ2VBcGkiLCJsaXN0ZW4iLCJPbk1lc3NhZ2VIYW5kbGVyIiwicHJvbWlzZSIsInNlbmQiLCJKc29uUnBjIiwiZ2V0Qm9keSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUdBOztBQUVBOztBQUNBOzs7Ozs7OztJQUVhQSxjOzs7Ozs7OzRCQUVMQyxNLEVBQ0FDLE0sRUFFb0I7QUFBQSxVQURwQkMsS0FDb0IsdUVBREdDLHFCQUFjQyxJQUNqQjtBQUVwQixhQUFPLElBQUlDLE9BQUosQ0FBeUIsVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQW9CO0FBQ2hELFlBQUdMLEtBQUssSUFBSUMscUJBQWNDLElBQTFCLEVBQWdDO0FBQzVCLGNBQUlJLEdBQUcsR0FBRyxJQUFJQyxlQUFKLEVBQVY7QUFDQUQsVUFBQUEsR0FBRyxDQUFDRSxNQUFKLENBQVdDLDBCQUFpQkMsT0FBakIsQ0FBeUJOLE9BQXpCLEVBQWlDQyxNQUFqQyxDQUFYO0FBQ0FDLFVBQUFBLEdBQUcsQ0FBQ0ssSUFBSixDQUFTQyxpQkFBUUMsT0FBUixDQUNMZixNQURLLEVBRUxDLE1BRkssQ0FBVDtBQUlILFNBUEQsTUFPTztBQUNITSxVQUFBQSxNQUFNLENBQUNMLEtBQUQsQ0FBTjtBQUNIO0FBQ0osT0FYTSxDQUFQO0FBYUgiLCJzb3VyY2VzQ29udGVudCI6WyIgIFxyXG5pbXBvcnQge1JlcXVlc3RFcnJvcnN9IGZyb20gJ0BhbGdvc2lnbmVyL2NvbW1vbi90eXBlcyc7XHJcbmltcG9ydCB7SnNvblJwY01ldGhvZCxKc29uUGF5bG9hZH0gZnJvbSAnQGFsZ29zaWduZXIvY29tbW9uL21lc3NhZ2luZy90eXBlcyc7XHJcblxyXG5pbXBvcnQge0pzb25ScGN9IGZyb20gJ0BhbGdvc2lnbmVyL2NvbW1vbi9tZXNzYWdpbmcvanNvbnJwYyc7XHJcblxyXG5pbXBvcnQge01lc3NhZ2VBcGl9IGZyb20gJy4vYXBpJzsgXHJcbmltcG9ydCB7T25NZXNzYWdlSGFuZGxlcn0gZnJvbSAnLi9oYW5kbGVyJzsgXHJcblxyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJ1aWxkZXIge1xyXG4gICAgc3RhdGljIHByb21pc2UoXHJcbiAgICAgICAgbWV0aG9kOiBKc29uUnBjTWV0aG9kLFxyXG4gICAgICAgIHBhcmFtczogSnNvblBheWxvYWQsXHJcbiAgICAgICAgZXJyb3I6IFJlcXVlc3RFcnJvcnMgPSBSZXF1ZXN0RXJyb3JzLk5vbmVcclxuICAgICk6IFByb21pc2U8SnNvblBheWxvYWQ+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEpzb25QYXlsb2FkPigocmVzb2x2ZSxyZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3IgPT0gUmVxdWVzdEVycm9ycy5Ob25lKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXBpID0gbmV3IE1lc3NhZ2VBcGkoKTtcclxuICAgICAgICAgICAgICAgIGFwaS5saXN0ZW4oT25NZXNzYWdlSGFuZGxlci5wcm9taXNlKHJlc29sdmUscmVqZWN0KSk7XHJcbiAgICAgICAgICAgICAgICBhcGkuc2VuZChKc29uUnBjLmdldEJvZHkoXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLCBcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXNcclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufSJdfQ==