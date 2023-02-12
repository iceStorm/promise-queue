import { v4 as uuidv4 } from "uuid";

import { Queue } from "./Queue";

/** A queue that will accept unique values and handle each value one by one. */
export class UniqueQueue<T> extends Queue<T> {
  append(newValue: T) {
    this.log("warn", "New value incoming to queue:", newValue);

    // unique queue need to check if an incoming value is already in the queue or not
    const sameItem = this.values.find((item) => this.differ(item, newValue));
    if (sameItem) {
      this.log(
        "log",
        `Queue already has value: ${newValue} (Current queue: ${JSON.stringify(this.values)}).`,
        `Discarded incoming value: ${newValue}`
      );

      return false;
    }

    /** indicating whether the queue is currently enpty and being added a new value */
    const isQueueJustHasValue = this._queue.length === 0;
    this._queue = this.values.concat(newValue);

    this.log("log", "New value added to queue:", newValue);

    if (isQueueJustHasValue) {
      this.handleValueCallback();
    }

    return true;
  }
}

// test
const queue = new UniqueQueue<string>({
  name: "Barcode Queue",
  differ: (a, b) => a > b,
  onNextValue: mockRequest,
});

function mockRequest(input: string) {
  return new Promise((resolve, reject) => {
    const randomRequestTimeout = Math.round(Math.random() * 3000);
    const requestSymbol = uuidv4();

    console.log(
      `[${requestSymbol}] Request start with payload "${input}", timeout: ${randomRequestTimeout}ms`
    );

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
