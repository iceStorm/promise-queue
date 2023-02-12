import { UniqueQueue } from "./UniqueQueue";

export * from "./Queue";
export * from "./UniqueQueue";

const uq = new UniqueQueue<string>({
  name: "Barcode queue",
  differ: (a, b) => a !== b,
  onNextValue(value) {
    return new Promise((resolve, reject) => {});
  },
  onHandleValueError(value, error) {},
});
