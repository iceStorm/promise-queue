"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    name;
    onNextValue;
    differ;
    _queue = [];
    constructor(props) {
        Object.assign(this, props);
    }
    /** Current queue values. */
    get values() {
        return this._queue;
    }
    /** Current queue first value. */
    get first() {
        return this.values.slice(0, 1)[0];
    }
    /** Current queue last value. */
    get last() {
        return this.values.slice(-1)[0];
    }
    /** Remove the queue's first value.
     * Returns a copy of the queue's remaining values after removed.
     */
    clearFirst() {
        const remainingQueueValues = this.values.slice(1);
        this._queue = remainingQueueValues;
        return remainingQueueValues;
    }
    log(level, ...messages) {
        console[level](`[${this.name}]`, ...messages);
    }
    startHandleValueCallback() {
        this.onNextValue(this.first).finally(() => {
            console.log(`Finished handle for: ${this.first}`);
            console.log(`Remaining queue: [${this.clearFirst()}]`);
            // handle the remaining values in the queue recursively.
            if (this.values.length) {
                this.startHandleValueCallback();
            }
        });
    }
}
exports.Queue = Queue;
