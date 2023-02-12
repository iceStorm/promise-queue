"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueQueue = void 0;
const uuid_1 = require("uuid");
const Queue_1 = require("./Queue");
/** A queue that will accept unique values and handle each value one by one. */
class UniqueQueue extends Queue_1.Queue {
    append(newValue) {
        this.log("warn", "New value incoming to queue:", newValue);
        // unique queue need to check if an incoming value is already in the queue or not
        const sameItem = this.values.find((item) => this.differ(item, newValue));
        if (sameItem) {
            this.log("log", `Queue already has value: ${newValue} (Current queue: ${JSON.stringify(this.values)}).`, `Discarded incoming value: ${newValue}`);
            return;
        }
        /** indicating whether the queue is currently enpty and being added a new value */
        const isQueueJustHasValue = this._queue.length === 0;
        this._queue = this.values.concat(newValue);
        this.log("log", "New value added to queue:", newValue);
        if (isQueueJustHasValue) {
            this.startHandleValueCallback();
        }
    }
}
exports.UniqueQueue = UniqueQueue;
// test
const queue = new UniqueQueue({
    name: "Barcode Queue",
    differ: (a, b) => a > b,
    onNextValue: mockRequest,
});
function mockRequest(input) {
    return new Promise((resolve, reject) => {
        const randomRequestTimeout = Math.round(Math.random() * 3000);
        const requestSymbol = (0, uuid_1.v4)();
        console.log(`[${requestSymbol}] Request start with payload "${input}", timeout: ${randomRequestTimeout}ms`);
        setTimeout(() => {
            console.log(`[${requestSymbol}] Request end`);
            resolve(undefined);
        }, randomRequestTimeout);
    });
}
queue.append("a");
queue.append("a");
queue.append("a");
queue.append("b");
queue.append("c");
setTimeout(() => {
    queue.append("f");
    queue.append("f");
}, 10000);
