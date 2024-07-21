type AsyncFunction<Args extends unknown[], Return> = (
  ...args: Args
) => Promise<Return>;

const catchAsyncError = <Args extends unknown[], Return>(
  func: AsyncFunction<Args, Return>,
) => {
  return async (...args: Args): Promise<Return> => {
    try {
      return await func(...args);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };
};

export default catchAsyncError;
