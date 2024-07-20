"use server";
import { trpc } from "~/trpc/server";
import catchAsyncError from "~/utils/catchAsyncError";

const handleDeleteUserCategory = catchAsyncError(
  async (userId: string, categoryId: string) => {
    const response = await trpc.user.removeUserCategory({
      userId,
      categoryId,
    });

    return response;
  },
);

export default handleDeleteUserCategory;
