export interface QueueParams<T> {
  /** Queue name */
  readonly name: string;

  /** A callback function to call when the queue starts emitting a new value. */
  readonly onNextValue: (value: T) => Promise<unknown>;

  /** A callback function to define the different between 2 elements of the queue. */
  readonly differ: (a: T, b: T) => boolean;

  enableDefaultLogging?: boolean;

  resetOnError?: boolean;
}

export interface QueueHooks<T> {
  readonly onBeforeHandleNextValue?: (disposingValue: T) => unknown;
  readonly onHandleValueError?: (value: T, error: Error) => unknown;
}

export interface QueueProps<T> extends QueueParams<T>, QueueHooks<T> {}
