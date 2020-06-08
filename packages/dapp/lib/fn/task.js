"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = void 0;

var _builder = require("../messaging/builder");

var _types = require("@algosigner/common/types");

var _types2 = require("@algosigner/common/messaging/types");

var _runtime = require("@algosigner/common/runtime/runtime");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Task = /*#__PURE__*/function (_Runtime) {
  _inherits(Task, _Runtime);

  var _super = _createSuper(Task);

  function Task() {
    _classCallCheck(this, Task);

    return _super.apply(this, arguments);
  }

  _createClass(Task, [{
    key: "connect",
    value: function connect() {
      return _builder.MessageBuilder.promise(_types2.JsonRpcMethod.Authorization, {});
    }
  }, {
    key: "accounts",
    value: function accounts() {} // TODO needs json and raw payload support and complete argument support

  }, {
    key: "sign",
    value: function sign(params) {
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types.RequestErrors.None;

      if (!_get(_getPrototypeOf(Task.prototype), "requiredArgs", this).call(this, Task.inPayloadSign, Object.keys(params))) {
        error = _types.RequestErrors.InvalidTransactionParams;
      }

      return _builder.MessageBuilder.promise(_types2.JsonRpcMethod.SignTransaction, params, error);
    }
  }, {
    key: "query",
    value: function query(method, params) {
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _types.RequestErrors.None;
      var request = {
        method: method,
        params: params
      };
      return _builder.MessageBuilder.promise(_types2.JsonRpcMethod.Algod, request, error);
    }
  }, {
    key: "subscribe",
    value: function subscribe(eventName, callback) {
      Task.subscriptions[eventName] = callback;
    }
  }], [{
    key: "inPayloadSign",
    get: function get() {
      return ['amount', 'to'];
    }
  }]);

  return Task;
}(_runtime.Runtime);

exports.Task = Task;

_defineProperty(Task, "subscriptions", {});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mbi90YXNrLnRzIl0sIm5hbWVzIjpbIlRhc2siLCJNZXNzYWdlQnVpbGRlciIsInByb21pc2UiLCJKc29uUnBjTWV0aG9kIiwiQXV0aG9yaXphdGlvbiIsInBhcmFtcyIsImVycm9yIiwiUmVxdWVzdEVycm9ycyIsIk5vbmUiLCJpblBheWxvYWRTaWduIiwiT2JqZWN0Iiwia2V5cyIsIkludmFsaWRUcmFuc2FjdGlvblBhcmFtcyIsIlNpZ25UcmFuc2FjdGlvbiIsIm1ldGhvZCIsInJlcXVlc3QiLCJBbGdvZCIsImV2ZW50TmFtZSIsImNhbGxiYWNrIiwic3Vic2NyaXB0aW9ucyIsIlJ1bnRpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLEk7Ozs7Ozs7Ozs7Ozs7OEJBUXVCO0FBQzVCLGFBQU9DLHdCQUFlQyxPQUFmLENBQ0hDLHNCQUFjQyxhQURYLEVBRUgsRUFGRyxDQUFQO0FBSUg7OzsrQkFFUyxDQUFFLEMsQ0FFWjs7Ozt5QkFFSUMsTSxFQUVvQjtBQUFBLFVBRHBCQyxLQUNvQix1RUFER0MscUJBQWNDLElBQ2pCOztBQUNwQixVQUFHLHdFQUFvQlIsSUFBSSxDQUFDUyxhQUF6QixFQUF1Q0MsTUFBTSxDQUFDQyxJQUFQLENBQVlOLE1BQVosQ0FBdkMsQ0FBSCxFQUErRDtBQUMzREMsUUFBQUEsS0FBSyxHQUFHQyxxQkFBY0ssd0JBQXRCO0FBQ0g7O0FBQ0QsYUFBT1gsd0JBQWVDLE9BQWYsQ0FDSEMsc0JBQWNVLGVBRFgsRUFFSFIsTUFGRyxFQUdIQyxLQUhHLENBQVA7QUFLSDs7OzBCQUdHUSxNLEVBQ0FULE0sRUFFbUI7QUFBQSxVQURuQkMsS0FDbUIsdUVBRElDLHFCQUFjQyxJQUNsQjtBQUVuQixVQUFJTyxPQUFvQixHQUFHO0FBQ3ZCRCxRQUFBQSxNQUFNLEVBQUVBLE1BRGU7QUFFdkJULFFBQUFBLE1BQU0sRUFBRUE7QUFGZSxPQUEzQjtBQUtBLGFBQU9KLHdCQUFlQyxPQUFmLENBQ0hDLHNCQUFjYSxLQURYLEVBRUhELE9BRkcsRUFHSFQsS0FIRyxDQUFQO0FBS0g7Ozs4QkFHR1csUyxFQUNBQyxRLEVBQ0Y7QUFDRWxCLE1BQUFBLElBQUksQ0FBQ21CLGFBQUwsQ0FBbUJGLFNBQW5CLElBQWdDQyxRQUFoQztBQUNIOzs7d0JBbkR5QztBQUN0QyxhQUFPLENBQUMsUUFBRCxFQUFVLElBQVYsQ0FBUDtBQUNIOzs7O0VBTnFCRSxnQjs7OztnQkFBYnBCLEksbUJBRXlDLEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lUYXNrfSBmcm9tICcuL2ludGVyZmFjZXMnO1xyXG5cclxuaW1wb3J0IHtNZXNzYWdlQnVpbGRlcn0gZnJvbSAnLi4vbWVzc2FnaW5nL2J1aWxkZXInOyBcclxuXHJcbmltcG9ydCB7QWxnb2RSZXF1ZXN0LFRyYW5zYWN0aW9uLFJlcXVlc3RFcnJvcnN9IGZyb20gJ0BhbGdvc2lnbmVyL2NvbW1vbi90eXBlcyc7XHJcbmltcG9ydCB7SnNvblJwY01ldGhvZCxKc29uUGF5bG9hZCxTdXBwb3J0ZWRBbGdvZH0gZnJvbSAnQGFsZ29zaWduZXIvY29tbW9uL21lc3NhZ2luZy90eXBlcyc7XHJcbmltcG9ydCB7UnVudGltZX0gZnJvbSAnQGFsZ29zaWduZXIvY29tbW9uL3J1bnRpbWUvcnVudGltZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFzayBleHRlbmRzIFJ1bnRpbWUgaW1wbGVtZW50cyBJVGFzayB7XHJcblxyXG4gICAgc3RhdGljIHN1YnNjcmlwdGlvbnM6IHtba2V5OiBzdHJpbmddOiBGdW5jdGlvbn0gPSB7fTtcclxuXHJcbiAgICBzdGF0aWMgZ2V0IGluUGF5bG9hZFNpZ24oKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIFsnYW1vdW50JywndG8nXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3QoKTogUHJvbWlzZTxKc29uUGF5bG9hZD4ge1xyXG4gICAgICAgIHJldHVybiBNZXNzYWdlQnVpbGRlci5wcm9taXNlKFxyXG4gICAgICAgICAgICBKc29uUnBjTWV0aG9kLkF1dGhvcml6YXRpb24sIFxyXG4gICAgICAgICAgICB7fVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgYWNjb3VudHMoKXt9XHJcblxyXG4gICAgLy8gVE9ETyBuZWVkcyBqc29uIGFuZCByYXcgcGF5bG9hZCBzdXBwb3J0IGFuZCBjb21wbGV0ZSBhcmd1bWVudCBzdXBwb3J0XHJcbiAgICBzaWduKFxyXG4gICAgICAgIHBhcmFtczogVHJhbnNhY3Rpb24sIFxyXG4gICAgICAgIGVycm9yOiBSZXF1ZXN0RXJyb3JzID0gUmVxdWVzdEVycm9ycy5Ob25lXHJcbiAgICApOiBQcm9taXNlPEpzb25QYXlsb2FkPiB7XHJcbiAgICAgICAgaWYoIXN1cGVyLnJlcXVpcmVkQXJncyhUYXNrLmluUGF5bG9hZFNpZ24sT2JqZWN0LmtleXMocGFyYW1zKSkpe1xyXG4gICAgICAgICAgICBlcnJvciA9IFJlcXVlc3RFcnJvcnMuSW52YWxpZFRyYW5zYWN0aW9uUGFyYW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWVzc2FnZUJ1aWxkZXIucHJvbWlzZShcclxuICAgICAgICAgICAgSnNvblJwY01ldGhvZC5TaWduVHJhbnNhY3Rpb24sIFxyXG4gICAgICAgICAgICBwYXJhbXMsXHJcbiAgICAgICAgICAgIGVycm9yXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBxdWVyeShcclxuICAgICAgICBtZXRob2Q6IFN1cHBvcnRlZEFsZ29kLFxyXG4gICAgICAgIHBhcmFtczogSnNvblBheWxvYWQsXHJcbiAgICAgICAgZXJyb3I6IFJlcXVlc3RFcnJvcnMgPSBSZXF1ZXN0RXJyb3JzLk5vbmVcclxuICAgICk6IFByb21pc2U8SnNvblBheWxvYWQ+e1xyXG5cclxuICAgICAgICBsZXQgcmVxdWVzdDogSnNvblBheWxvYWQgPSB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBNZXNzYWdlQnVpbGRlci5wcm9taXNlKFxyXG4gICAgICAgICAgICBKc29uUnBjTWV0aG9kLkFsZ29kLCBcclxuICAgICAgICAgICAgcmVxdWVzdCBhcyBKc29uUGF5bG9hZCxcclxuICAgICAgICAgICAgZXJyb3JcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHN1YnNjcmliZShcclxuICAgICAgICBldmVudE5hbWU6IHN0cmluZyxcclxuICAgICAgICBjYWxsYmFjazogRnVuY3Rpb25cclxuICAgICkge1xyXG4gICAgICAgIFRhc2suc3Vic2NyaXB0aW9uc1tldmVudE5hbWVdID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcbn0iXX0=