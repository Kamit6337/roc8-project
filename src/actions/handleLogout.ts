"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import catchAsyncError from "~/utils/catchAsyncError";

const handleLogout = catchAsyncError(async () => {
  cookies().delete("_use");
  redirect("/login");
});

export default handleLogout;
