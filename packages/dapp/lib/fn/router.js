function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// The Router routes messages sent to the dApp back to the extension.
//
// By default we are routing every message from the Extension to a global handler.
// This handler bounces back a signal to the Extension as simple ACK mechanism, that will 
// ultimately resolve the Promise in the Extension side.
//
// In the future, we obviously want to offer more configuration. 2nd iteration probably adding
// a dApp defined custom global handler, subsequent iterations probably be able of adding
// custom handler for different message types, etc..
import { MessageApi } from '../messaging/api';
import { Task } from './task';
export class Router {
  constructor() {
    _defineProperty(this, "handler", void 0);

    this.handler = this.default;
    window.addEventListener("message", event => {
      var d = event.data;

      if ("source" in d) {
        if (d.source == "extension") {
          d.source = 'router';
          d.origin = window.location.origin;
          this.handler(d);
        }
      }
    });
  }

  default(d) {
    if (d.body.method in Task.subscriptions) {
      Task.subscriptions[d.body.method]();
    }

    this.bounce(d);
  }

  bounce(d) {
    let api = new MessageApi();
    window.postMessage(d, window.location.origin, [api.mc.port2]);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mbi9yb3V0ZXIudHMiXSwibmFtZXMiOlsiTWVzc2FnZUFwaSIsIlRhc2siLCJSb3V0ZXIiLCJjb25zdHJ1Y3RvciIsImhhbmRsZXIiLCJkZWZhdWx0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZCIsImRhdGEiLCJzb3VyY2UiLCJvcmlnaW4iLCJsb2NhdGlvbiIsImJvZHkiLCJtZXRob2QiLCJzdWJzY3JpcHRpb25zIiwiYm91bmNlIiwiYXBpIiwicG9zdE1lc3NhZ2UiLCJtYyIsInBvcnQyIl0sIm1hcHBpbmdzIjoiOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVFBLFVBQVIsUUFBeUIsa0JBQXpCO0FBQ0EsU0FBUUMsSUFBUixRQUFtQixRQUFuQjtBQUVBLE9BQU8sTUFBTUMsTUFBTixDQUFhO0FBRWhCQyxFQUFBQSxXQUFXLEdBQUc7QUFBQTs7QUFDVixTQUFLQyxPQUFMLEdBQWUsS0FBS0MsT0FBcEI7QUFDQUMsSUFBQUEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQ0MsS0FBRCxJQUFXO0FBQ3pDLFVBQUlDLENBQUMsR0FBR0QsS0FBSyxDQUFDRSxJQUFkOztBQUNBLFVBQUcsWUFBWUQsQ0FBZixFQUFpQjtBQUNiLFlBQUdBLENBQUMsQ0FBQ0UsTUFBRixJQUFZLFdBQWYsRUFBNEI7QUFDeEJGLFVBQUFBLENBQUMsQ0FBQ0UsTUFBRixHQUFXLFFBQVg7QUFDQUYsVUFBQUEsQ0FBQyxDQUFDRyxNQUFGLEdBQVdOLE1BQU0sQ0FBQ08sUUFBUCxDQUFnQkQsTUFBM0I7QUFDQSxlQUFLUixPQUFMLENBQWFLLENBQWI7QUFDSDtBQUNKO0FBQ0osS0FURDtBQVVIOztBQUNESixFQUFBQSxPQUFPLENBQUNJLENBQUQsRUFBTztBQUNWLFFBQUdBLENBQUMsQ0FBQ0ssSUFBRixDQUFPQyxNQUFQLElBQWlCZCxJQUFJLENBQUNlLGFBQXpCLEVBQXdDO0FBQ3BDZixNQUFBQSxJQUFJLENBQUNlLGFBQUwsQ0FBbUJQLENBQUMsQ0FBQ0ssSUFBRixDQUFPQyxNQUExQjtBQUNIOztBQUNELFNBQUtFLE1BQUwsQ0FBWVIsQ0FBWjtBQUNIOztBQUNEUSxFQUFBQSxNQUFNLENBQUNSLENBQUQsRUFBTztBQUNULFFBQUlTLEdBQUcsR0FBRyxJQUFJbEIsVUFBSixFQUFWO0FBQ0FNLElBQUFBLE1BQU0sQ0FBQ2EsV0FBUCxDQUFtQlYsQ0FBbkIsRUFBc0JILE1BQU0sQ0FBQ08sUUFBUCxDQUFnQkQsTUFBdEMsRUFBOEMsQ0FBQ00sR0FBRyxDQUFDRSxFQUFKLENBQU9DLEtBQVIsQ0FBOUM7QUFDSDs7QUF4QmUiLCJzb3VyY2VzQ29udGVudCI6WyIgIFxyXG4vLyBUaGUgUm91dGVyIHJvdXRlcyBtZXNzYWdlcyBzZW50IHRvIHRoZSBkQXBwIGJhY2sgdG8gdGhlIGV4dGVuc2lvbi5cclxuLy9cclxuLy8gQnkgZGVmYXVsdCB3ZSBhcmUgcm91dGluZyBldmVyeSBtZXNzYWdlIGZyb20gdGhlIEV4dGVuc2lvbiB0byBhIGdsb2JhbCBoYW5kbGVyLlxyXG4vLyBUaGlzIGhhbmRsZXIgYm91bmNlcyBiYWNrIGEgc2lnbmFsIHRvIHRoZSBFeHRlbnNpb24gYXMgc2ltcGxlIEFDSyBtZWNoYW5pc20sIHRoYXQgd2lsbCBcclxuLy8gdWx0aW1hdGVseSByZXNvbHZlIHRoZSBQcm9taXNlIGluIHRoZSBFeHRlbnNpb24gc2lkZS5cclxuLy9cclxuLy8gSW4gdGhlIGZ1dHVyZSwgd2Ugb2J2aW91c2x5IHdhbnQgdG8gb2ZmZXIgbW9yZSBjb25maWd1cmF0aW9uLiAybmQgaXRlcmF0aW9uIHByb2JhYmx5IGFkZGluZ1xyXG4vLyBhIGRBcHAgZGVmaW5lZCBjdXN0b20gZ2xvYmFsIGhhbmRsZXIsIHN1YnNlcXVlbnQgaXRlcmF0aW9ucyBwcm9iYWJseSBiZSBhYmxlIG9mIGFkZGluZ1xyXG4vLyBjdXN0b20gaGFuZGxlciBmb3IgZGlmZmVyZW50IG1lc3NhZ2UgdHlwZXMsIGV0Yy4uXHJcbmltcG9ydCB7TWVzc2FnZUFwaX0gZnJvbSAnLi4vbWVzc2FnaW5nL2FwaSc7IFxyXG5pbXBvcnQge1Rhc2t9IGZyb20gJy4vdGFzayc7XHJcblxyXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcclxuICAgIGhhbmRsZXI6IEZ1bmN0aW9uO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gdGhpcy5kZWZhdWx0O1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZCA9IGV2ZW50LmRhdGE7XHJcbiAgICAgICAgICAgIGlmKFwic291cmNlXCIgaW4gZCl7XHJcbiAgICAgICAgICAgICAgICBpZihkLnNvdXJjZSA9PSBcImV4dGVuc2lvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZC5zb3VyY2UgPSAncm91dGVyJztcclxuICAgICAgICAgICAgICAgICAgICBkLm9yaWdpbiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyKGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkZWZhdWx0KGQ6YW55KXtcclxuICAgICAgICBpZihkLmJvZHkubWV0aG9kIGluIFRhc2suc3Vic2NyaXB0aW9ucykge1xyXG4gICAgICAgICAgICBUYXNrLnN1YnNjcmlwdGlvbnNbZC5ib2R5Lm1ldGhvZF0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ib3VuY2UoZCk7XHJcbiAgICB9XHJcbiAgICBib3VuY2UoZDphbnkpe1xyXG4gICAgICAgIGxldCBhcGkgPSBuZXcgTWVzc2FnZUFwaSgpO1xyXG4gICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShkLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luLCBbYXBpLm1jLnBvcnQyXSk7XHJcbiAgICB9XHJcbn0iXX0=