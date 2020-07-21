function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Task } from './fn/task';
import { Router } from './fn/router';

class Wrapper {
  constructor() {
    _defineProperty(this, "task", new Task());

    _defineProperty(this, "router", new Router());

    _defineProperty(this, "connect", this.task.connect);

    _defineProperty(this, "sign", this.task.sign);

    _defineProperty(this, "query", this.task.query);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hbGdvc2lnbmVyLnRzIl0sIm5hbWVzIjpbIlRhc2siLCJSb3V0ZXIiLCJXcmFwcGVyIiwidGFzayIsImNvbm5lY3QiLCJzaWduIiwicXVlcnkiLCJzdWJzY3JpYmUiLCJnZXRJbnN0YW5jZSIsImluc3RhbmNlIiwiQWxnb1NpZ25lciJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFRQSxJQUFSLFFBQW1CLFdBQW5CO0FBQ0EsU0FBUUMsTUFBUixRQUFxQixhQUFyQjs7QUFFQSxNQUFNQyxPQUFOLENBQWM7QUFBQTtBQUFBLGtDQUVXLElBQUlGLElBQUosRUFGWDs7QUFBQSxvQ0FHZSxJQUFJQyxNQUFKLEVBSGY7O0FBQUEscUNBS2lCLEtBQUtFLElBQUwsQ0FBVUMsT0FMM0I7O0FBQUEsa0NBTWMsS0FBS0QsSUFBTCxDQUFVRSxJQU54Qjs7QUFBQSxtQ0FPZSxLQUFLRixJQUFMLENBQVVHLEtBUHpCOztBQUFBLHVDQVFtQixLQUFLSCxJQUFMLENBQVVJLFNBUjdCO0FBQUE7O0FBVVYsU0FBY0MsV0FBZCxHQUFxQztBQUNqQyxRQUFJLENBQUNOLE9BQU8sQ0FBQ08sUUFBYixFQUF1QjtBQUNuQlAsTUFBQUEsT0FBTyxDQUFDTyxRQUFSLEdBQW1CLElBQUlQLE9BQUosRUFBbkI7QUFDSDs7QUFDRCxXQUFPQSxPQUFPLENBQUNPLFFBQWY7QUFDSDs7QUFmUzs7Z0JBQVJQLE87O0FBa0JOLE9BQU8sTUFBTVEsVUFBVSxHQUFHUixPQUFPLENBQUNNLFdBQVIsRUFBbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Rhc2t9IGZyb20gJy4vZm4vdGFzayc7XHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICcuL2ZuL3JvdXRlcic7XHJcblxyXG5jbGFzcyBXcmFwcGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBXcmFwcGVyO1xyXG4gICAgcHJpdmF0ZSB0YXNrOiBUYXNrID0gbmV3IFRhc2soKTtcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBjb25uZWN0OiBGdW5jdGlvbiA9IHRoaXMudGFzay5jb25uZWN0O1xyXG4gICAgcHVibGljIHNpZ246IEZ1bmN0aW9uID0gdGhpcy50YXNrLnNpZ247XHJcbiAgICBwdWJsaWMgcXVlcnk6IEZ1bmN0aW9uID0gdGhpcy50YXNrLnF1ZXJ5O1xyXG4gICAgcHVibGljIHN1YnNjcmliZTogRnVuY3Rpb24gPSB0aGlzLnRhc2suc3Vic2NyaWJlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogV3JhcHBlciB7XHJcbiAgICAgICAgaWYgKCFXcmFwcGVyLmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIFdyYXBwZXIuaW5zdGFuY2UgPSBuZXcgV3JhcHBlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gV3JhcHBlci5pbnN0YW5jZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFsZ29TaWduZXIgPSBXcmFwcGVyLmdldEluc3RhbmNlKCk7Il19