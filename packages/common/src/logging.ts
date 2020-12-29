///
// Central error handling.
///
export class Logging
{
    log(error: string): void {
        // TODO: BC - How should we handle errors? 
        // Should likely use a logging packackage here to send errors to the user or backend logging.
        console.log(error);
    }
}
export var logging = new Logging();
export default logging;