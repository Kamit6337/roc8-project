"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { trpc } from "~/trpc/server";
import catchAsyncError from "~/utils/catchAsyncError";
import { decrypt } from "~/utils/encryption/encryptAndDecrypt";

const handleUserLoggedIn = catchAsyncError(async () => {
  const data = cookies().get("_use");

  if (!data?.value) {
    redirect("/login");
  }

  console.log("data", data);
  console.log("is comes here ...............................................");

  try {
    const { id } = decrypt(data.value);

    const findUser = await trpc.user.findById({ id });

    if (!findUser) {
      redirect("/login");
    }

    return id;
  } catch (error) {
    redirect("/login");
  }
});

export default handleUserLoggedIn;
