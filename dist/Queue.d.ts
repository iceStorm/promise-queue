export interface QueueProps<T> {
    /** Queue name */
    readonly name: string;
    /** A callback function to call when the queue starts emitting a new value. */
    readonly onNextValue: (value: T) => Promise<unknown>;
    /** A callback function to define the different between 2 elements of the queue. */
    readonly differ: (a: T, b: T) => boolean;
}
export declare abstract class Queue<T> implements QueueProps<T> {
    readonly name: string;
    readonly onNextValue: (value: T) => Promise<unknown>;
    readonly differ: (a: T, b: T) => boolean;
    protected _queue: Array<T>;
    constructor(props: QueueProps<T>);
    /** Current queue values. */
    get values(): T[];
    /** Current queue first value. */
    get first(): T;
    /** Current queue last value. */
    get last(): T;
    /** Remove the queue's first value.
     * Returns a copy of the queue's remaining values after removed.
     */
    protected clearFirst(): T[];
    protected log(level: "log" | "warn" | "error", ...messages: unknown[]): void;
    protected startHandleValueCallback(): void;
    /** Append a new value to the end of the queue. */
    abstract append(newValue: T): void;
}
//# sourceMappingURL=Queue.d.ts.map