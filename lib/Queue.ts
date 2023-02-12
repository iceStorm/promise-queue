import {  QueueProps } from "./types";

export abstract class Queue<T> implements QueueProps<T> {
  protected _queue: Array<T> = [];

  // props
  name!: string;
  onNextValue!: (value: T) => Promise<unknown>;
  differ!: (a: T, b: T) => boolean;

  constructor(private params: QueueProps<T>) {
    Object.assign(this, params);
  }

  /** Current queue values. */
  get values() {
    return this._queue;
  }

  /** Current queue first value. */
  get first() {
    return this._queue.slice(0, 1)[0];
  }

  /** Current queue last value. */
  get last() {
    return this._queue.slice(-1)[0];
  }

  /** Remove the queue's first value.
   * Returns a copy of the queue's removed value.
   */
  protected clearFirst() {
    const queueRemovedFirstValue = this.first;
    this._queue = this._queue.slice(1);
    return queueRemovedFirstValue;
  }

  protected log(level: "log" | "warn" | "error", ...messages: unknown[]) {
    console[level](`[${this.name}]`, ...messages);
  }

  protected handleValueCallback() {
    this.onNextValue(this.first)
      .catch(error => {
        this.onHandleValueError(this.first, error)
      });
      .finally(() => {
        if (this.onBeforeHandleNextValue instanceof Function) {
          this.onBeforeHandleNextValue(this.clearFirst());
        }

        // handle the remaining values in the queue recursively.
        if (this.values.length) {
          this.handleValueCallback();
        }
      });
  }

  /** Append a new value to the end of the queue. */
  abstract append(newValue: T): unknown;
}
