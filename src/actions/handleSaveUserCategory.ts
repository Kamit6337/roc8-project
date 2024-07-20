"use server";
import { trpc } from "~/trpc/server";
import catchAsyncError from "~/utils/catchAsyncError";

const handleSaveUserCategory = catchAsyncError(
  async (userId: string, categoryId: string) => {
    const response = await trpc.user.saveUserCategory({
      userId,
      categoryId,
    });

    return response;
  },
);

export default handleSaveUserCategory;
