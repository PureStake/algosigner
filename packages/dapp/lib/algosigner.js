function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Task } from './fn/task';
import { Router } from './fn/router';

class Wrapper {
  constructor() {
    _defineProperty(this, "task", new Task());

    _defineProperty(this, "router", new Router());

    _defineProperty(this, "connect", this.task.connect);

    _defineProperty(this, "sign", this.task.sign);

    _defineProperty(this, "accounts", this.task.accounts);

    _defineProperty(this, "algod", this.task.algod);

    _defineProperty(this, "indexer", this.task.indexer);

    _defineProperty(this, "subscribe", this.task.subscribe);
  }

  static getInstance() {
    if (!Wrapper.instance) {
      Wrapper.instance = new Wrapper();
    }

    return Wrapper.instance;
  }

}

_defineProperty(Wrapper, "instance", void 0);

export const AlgoSigner = Wrapper.getInstance();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGdvc2lnbmVyLnRzIl0sIm5hbWVzIjpbIlRhc2siLCJSb3V0ZXIiLCJXcmFwcGVyIiwidGFzayIsImNvbm5lY3QiLCJzaWduIiwiYWNjb3VudHMiLCJhbGdvZCIsImluZGV4ZXIiLCJzdWJzY3JpYmUiLCJnZXRJbnN0YW5jZSIsImluc3RhbmNlIiwiQWxnb1NpZ25lciJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFRQSxJQUFSLFFBQW1CLFdBQW5CO0FBQ0EsU0FBUUMsTUFBUixRQUFxQixhQUFyQjs7QUFFQSxNQUFNQyxPQUFOLENBQWM7QUFBQTtBQUFBLGtDQUVXLElBQUlGLElBQUosRUFGWDs7QUFBQSxvQ0FHZSxJQUFJQyxNQUFKLEVBSGY7O0FBQUEscUNBS2lCLEtBQUtFLElBQUwsQ0FBVUMsT0FMM0I7O0FBQUEsa0NBTWMsS0FBS0QsSUFBTCxDQUFVRSxJQU54Qjs7QUFBQSxzQ0FPa0IsS0FBS0YsSUFBTCxDQUFVRyxRQVA1Qjs7QUFBQSxtQ0FRZSxLQUFLSCxJQUFMLENBQVVJLEtBUnpCOztBQUFBLHFDQVNpQixLQUFLSixJQUFMLENBQVVLLE9BVDNCOztBQUFBLHVDQVVtQixLQUFLTCxJQUFMLENBQVVNLFNBVjdCO0FBQUE7O0FBWVYsU0FBY0MsV0FBZCxHQUFxQztBQUNqQyxRQUFJLENBQUNSLE9BQU8sQ0FBQ1MsUUFBYixFQUF1QjtBQUNuQlQsTUFBQUEsT0FBTyxDQUFDUyxRQUFSLEdBQW1CLElBQUlULE9BQUosRUFBbkI7QUFDSDs7QUFDRCxXQUFPQSxPQUFPLENBQUNTLFFBQWY7QUFDSDs7QUFqQlM7O2dCQUFSVCxPOztBQW9CTixPQUFPLE1BQU1VLFVBQVUsR0FBR1YsT0FBTyxDQUFDUSxXQUFSLEVBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUYXNrfSBmcm9tICcuL2ZuL3Rhc2snO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnLi9mbi9yb3V0ZXInO1xyXG5cclxuY2xhc3MgV3JhcHBlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogV3JhcHBlcjtcclxuICAgIHByaXZhdGUgdGFzazogVGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY29ubmVjdDogRnVuY3Rpb24gPSB0aGlzLnRhc2suY29ubmVjdDtcclxuICAgIHB1YmxpYyBzaWduOiBGdW5jdGlvbiA9IHRoaXMudGFzay5zaWduO1xyXG4gICAgcHVibGljIGFjY291bnRzOiBGdW5jdGlvbiA9IHRoaXMudGFzay5hY2NvdW50cztcclxuICAgIHB1YmxpYyBhbGdvZDogRnVuY3Rpb24gPSB0aGlzLnRhc2suYWxnb2Q7XHJcbiAgICBwdWJsaWMgaW5kZXhlcjogRnVuY3Rpb24gPSB0aGlzLnRhc2suaW5kZXhlcjtcclxuICAgIHB1YmxpYyBzdWJzY3JpYmU6IEZ1bmN0aW9uID0gdGhpcy50YXNrLnN1YnNjcmliZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFdyYXBwZXIge1xyXG4gICAgICAgIGlmICghV3JhcHBlci5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBXcmFwcGVyLmluc3RhbmNlID0gbmV3IFdyYXBwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFdyYXBwZXIuaW5zdGFuY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBbGdvU2lnbmVyID0gV3JhcHBlci5nZXRJbnN0YW5jZSgpOyJdfQ==