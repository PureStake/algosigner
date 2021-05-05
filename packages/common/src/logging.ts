///
// Central error handling.
///
export class Logging {
  log(error: string): void {
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
