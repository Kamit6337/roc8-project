"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { trpc } from "~/trpc/server";
import catchAsyncError from "~/utils/catchAsyncError";
import { decrypt } from "~/utils/encryption/encryptAndDecrypt";

const handleUserLoggedIn = catchAsyncError(async () => {
  const data = cookies().get("_use");

  if (!data) {
    redirect("/login");
  }

  try {
    const { id } = decrypt(data.value);

    const findUser = await trpc.user.findById({ id });

    if (!findUser) {
      redirect("/login");
    }
  } catch (error) {
    redirect("/login");
  }
});

export default handleUserLoggedIn;
