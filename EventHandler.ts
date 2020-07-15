/**
 * Event handler wrapper to handle an event and set multiple handler.
 */
export default class EventHandler {
    /** Handler array */
    private handlers = new Array<Function>();
    /** Debouncing delay */
    private delay = 0;
    /** Timedout id */
    private timeout: any = -1;

    /**
     * Initialise EventHandler
     * @param delay This will ensure that your function will only be called once after the event has stopped firing for a certain amount of delay time. If 0 every event will be handled.
     */
    constructor(delay: number = 250) {
        this.delay = delay;
    }

    /**
     * Fire event
     * @param props Parameter to passed to the handler functions
     */
    private event(props: any): void {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() =>
            this.handlers.forEach(
                handler => handler.call(props)),
            this.delay);
    }

    /**
     * Add event handler function for the event.
     * Needs a unique callback function as argument.
     * @param f unique handler callback function 
     */
    public on(f: Function): void {
        this.handlers.push(f);
    }

    /**
     * Remove event handler function.
     * The function must be the exact same as the added one.
     * @param f handler callback function 
     */
    public off(f: Function): void {
        this.handlers = this.handlers.filter(
            (i: Function) => (i !== f) ? i : undefined);
    }
}


