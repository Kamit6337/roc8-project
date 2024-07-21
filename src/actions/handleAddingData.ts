"use server";
import { trpc } from "~/trpc/server";
import catchAsyncError from "~/utils/catchAsyncError";

const handleAddingData = catchAsyncError(async () => {
  await trpc.category.addList();
});

export default handleAddingData;
