"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _api = require("../messaging/api");

var _task = require("./task");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Router = /*#__PURE__*/function () {
  function Router() {
    var _this = this;

    _classCallCheck(this, Router);

    _defineProperty(this, "handler", void 0);

    this.handler = this["default"];
    window.addEventListener("message", function (event) {
      var d = event.data;

      if ("source" in d) {
        if (d.source == "extension") {
          d.source = 'router';
          d.origin = window.location.origin;

          _this.handler(d);
        }
      }
    });
  }

  _createClass(Router, [{
    key: "default",
    value: function _default(d) {
      if (d.body.method in _task.Task.subscriptions) {
        _task.Task.subscriptions[d.body.method]();
      }

      this.bounce(d);
    }
  }, {
    key: "bounce",
    value: function bounce(d) {
      var api = new _api.MessageApi();
      window.postMessage(d, window.location.origin, [api.mc.port2]);
    }
  }]);

  return Router;
}();

exports.Router = Router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mbi9yb3V0ZXIudHMiXSwibmFtZXMiOlsiUm91dGVyIiwiaGFuZGxlciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImQiLCJkYXRhIiwic291cmNlIiwib3JpZ2luIiwibG9jYXRpb24iLCJib2R5IiwibWV0aG9kIiwiVGFzayIsInN1YnNjcmlwdGlvbnMiLCJib3VuY2UiLCJhcGkiLCJNZXNzYWdlQXBpIiwicG9zdE1lc3NhZ2UiLCJtYyIsInBvcnQyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBVUE7O0FBQ0E7Ozs7Ozs7Ozs7SUFFYUEsTTtBQUVULG9CQUFjO0FBQUE7O0FBQUE7O0FBQUE7O0FBQ1YsU0FBS0MsT0FBTCxHQUFlLGVBQWY7QUFDQUMsSUFBQUEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixTQUF4QixFQUFrQyxVQUFDQyxLQUFELEVBQVc7QUFDekMsVUFBSUMsQ0FBQyxHQUFHRCxLQUFLLENBQUNFLElBQWQ7O0FBQ0EsVUFBRyxZQUFZRCxDQUFmLEVBQWlCO0FBQ2IsWUFBR0EsQ0FBQyxDQUFDRSxNQUFGLElBQVksV0FBZixFQUE0QjtBQUN4QkYsVUFBQUEsQ0FBQyxDQUFDRSxNQUFGLEdBQVcsUUFBWDtBQUNBRixVQUFBQSxDQUFDLENBQUNHLE1BQUYsR0FBV04sTUFBTSxDQUFDTyxRQUFQLENBQWdCRCxNQUEzQjs7QUFDQSxVQUFBLEtBQUksQ0FBQ1AsT0FBTCxDQUFhSSxDQUFiO0FBQ0g7QUFDSjtBQUNKLEtBVEQ7QUFVSDs7Ozs2QkFDT0EsQyxFQUFNO0FBQ1YsVUFBR0EsQ0FBQyxDQUFDSyxJQUFGLENBQU9DLE1BQVAsSUFBaUJDLFdBQUtDLGFBQXpCLEVBQXdDO0FBQ3BDRCxtQkFBS0MsYUFBTCxDQUFtQlIsQ0FBQyxDQUFDSyxJQUFGLENBQU9DLE1BQTFCO0FBQ0g7O0FBQ0QsV0FBS0csTUFBTCxDQUFZVCxDQUFaO0FBQ0g7OzsyQkFDTUEsQyxFQUFNO0FBQ1QsVUFBSVUsR0FBRyxHQUFHLElBQUlDLGVBQUosRUFBVjtBQUNBZCxNQUFBQSxNQUFNLENBQUNlLFdBQVAsQ0FBbUJaLENBQW5CLEVBQXNCSCxNQUFNLENBQUNPLFFBQVAsQ0FBZ0JELE1BQXRDLEVBQThDLENBQUNPLEdBQUcsQ0FBQ0csRUFBSixDQUFPQyxLQUFSLENBQTlDO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIgIFxyXG4vLyBUaGUgUm91dGVyIHJvdXRlcyBtZXNzYWdlcyBzZW50IHRvIHRoZSBkQXBwIGJhY2sgdG8gdGhlIGV4dGVuc2lvbi5cclxuLy9cclxuLy8gQnkgZGVmYXVsdCB3ZSBhcmUgcm91dGluZyBldmVyeSBtZXNzYWdlIGZyb20gdGhlIEV4dGVuc2lvbiB0byBhIGdsb2JhbCBoYW5kbGVyLlxyXG4vLyBUaGlzIGhhbmRsZXIgYm91bmNlcyBiYWNrIGEgc2lnbmFsIHRvIHRoZSBFeHRlbnNpb24gYXMgc2ltcGxlIEFDSyBtZWNoYW5pc20sIHRoYXQgd2lsbCBcclxuLy8gdWx0aW1hdGVseSByZXNvbHZlIHRoZSBQcm9taXNlIGluIHRoZSBFeHRlbnNpb24gc2lkZS5cclxuLy9cclxuLy8gSW4gdGhlIGZ1dHVyZSwgd2Ugb2J2aW91c2x5IHdhbnQgdG8gb2ZmZXIgbW9yZSBjb25maWd1cmF0aW9uLiAybmQgaXRlcmF0aW9uIHByb2JhYmx5IGFkZGluZ1xyXG4vLyBhIGRBcHAgZGVmaW5lZCBjdXN0b20gZ2xvYmFsIGhhbmRsZXIsIHN1YnNlcXVlbnQgaXRlcmF0aW9ucyBwcm9iYWJseSBiZSBhYmxlIG9mIGFkZGluZ1xyXG4vLyBjdXN0b20gaGFuZGxlciBmb3IgZGlmZmVyZW50IG1lc3NhZ2UgdHlwZXMsIGV0Yy4uXHJcbmltcG9ydCB7TWVzc2FnZUFwaX0gZnJvbSAnLi4vbWVzc2FnaW5nL2FwaSc7IFxyXG5pbXBvcnQge1Rhc2t9IGZyb20gJy4vdGFzayc7XHJcblxyXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcclxuICAgIGhhbmRsZXI6IEZ1bmN0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gdGhpcy5kZWZhdWx0O1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZCA9IGV2ZW50LmRhdGE7XHJcbiAgICAgICAgICAgIGlmKFwic291cmNlXCIgaW4gZCl7XHJcbiAgICAgICAgICAgICAgICBpZihkLnNvdXJjZSA9PSBcImV4dGVuc2lvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZC5zb3VyY2UgPSAncm91dGVyJztcclxuICAgICAgICAgICAgICAgICAgICBkLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyKGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkZWZhdWx0KGQ6YW55KXtcclxuICAgICAgICBpZihkLmJvZHkubWV0aG9kIGluIFRhc2suc3Vic2NyaXB0aW9ucykge1xyXG4gICAgICAgICAgICBUYXNrLnN1YnNjcmlwdGlvbnNbZC5ib2R5Lm1ldGhvZF0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ib3VuY2UoZCk7XHJcbiAgICB9XHJcbiAgICBib3VuY2UoZDphbnkpe1xyXG4gICAgICAgIGxldCBhcGkgPSBuZXcgTWVzc2FnZUFwaSgpO1xyXG4gICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShkLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luLCBbYXBpLm1jLnBvcnQyXSk7XHJcbiAgICB9XHJcbn0iXX0=