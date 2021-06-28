/* eslint-disable no-unused-vars */
///
// Central error handling.
///
export enum LogLevel {
  None = 0,
  Normal = 1,
  Debug = 2,
}

class Logging {
  // Raise to Debug to show additional messages, or lower to None to ignore all
  logThreshold = LogLevel.Normal;

  log(error: string, level?: LogLevel): void {
    // Set the default to Normal for backwards compatibility
    level = level || LogLevel.Normal;

    // If we area below the current threshold then return
    if (this.logThreshold === LogLevel.None || level < this.logThreshold) {
      return;
    }

    // TODO: BC - How should we handle errors?
    // Should likely use a logging packackage here to send errors to the user or backend logging.
    try {
      console.log(error);
    } catch {
      // If we failed above, just try one more time with a stringify in case JSON was sent
      console.log(JSON.stringify(error));
    }
  }
}
export var logging = new Logging();
export default logging;
