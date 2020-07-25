///
// Central error handling.
///
export class Logging
{
    log(error: string): void {
        // TODO: BC - How should we handle errors?
        console.log(error);
    }
}
export var logging = new Logging();
export default logging;