"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnMessageHandler = void 0;

var _types = require("@algosigner/common/types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OnMessageHandler = /*#__PURE__*/function () {
  function OnMessageHandler() {
    _classCallCheck(this, OnMessageHandler);
  }

  _createClass(OnMessageHandler, null, [{
    key: "promise",
    value: function promise(resolve, reject) {
      return function (event) {
        if (event.data.error) {
          reject(event.data.error);
        } else if (event.data.response) {
          resolve(event.data.response);
        } else {
          reject(_types.RequestErrors.Undefined);
        }
      };
    }
  }]);

  return OnMessageHandler;
}();

exports.OnMessageHandler = OnMessageHandler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdpbmcvaGFuZGxlci50cyJdLCJuYW1lcyI6WyJPbk1lc3NhZ2VIYW5kbGVyIiwicmVzb2x2ZSIsInJlamVjdCIsImV2ZW50IiwiZGF0YSIsImVycm9yIiwicmVzcG9uc2UiLCJSZXF1ZXN0RXJyb3JzIiwiVW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7O0lBRWFBLGdCOzs7Ozs7OzRCQUNNQyxPLEVBQWtCQyxNLEVBQXFDO0FBQ2xFLGFBQU8sVUFBQ0MsS0FBRCxFQUFXO0FBQ2QsWUFBSUEsS0FBSyxDQUFDQyxJQUFOLENBQVdDLEtBQWYsRUFBc0I7QUFDbEJILFVBQUFBLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDQyxJQUFOLENBQVdDLEtBQVosQ0FBTjtBQUNILFNBRkQsTUFFTyxJQUFJRixLQUFLLENBQUNDLElBQU4sQ0FBV0UsUUFBZixFQUF5QjtBQUM1QkwsVUFBQUEsT0FBTyxDQUFDRSxLQUFLLENBQUNDLElBQU4sQ0FBV0UsUUFBWixDQUFQO0FBQ0gsU0FGTSxNQUVBO0FBQ0hKLFVBQUFBLE1BQU0sQ0FBQ0sscUJBQWNDLFNBQWYsQ0FBTjtBQUNIO0FBQ0osT0FSRDtBQVNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPbk1lc3NhZ2VMaXN0ZW5lcn0gZnJvbSAnLi90eXBlcyc7IFxyXG5pbXBvcnQge1JlcXVlc3RFcnJvcnN9IGZyb20gJ0BhbGdvc2lnbmVyL2NvbW1vbi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgT25NZXNzYWdlSGFuZGxlciB7XHJcbiAgICBzdGF0aWMgcHJvbWlzZShyZXNvbHZlOiBGdW5jdGlvbixyZWplY3Q6IEZ1bmN0aW9uKTogT25NZXNzYWdlTGlzdGVuZXIge1xyXG4gICAgICAgIHJldHVybiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChldmVudC5kYXRhLmVycm9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5kYXRhLnJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGV2ZW50LmRhdGEucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KFJlcXVlc3RFcnJvcnMuVW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==