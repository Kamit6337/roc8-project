"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { trpc } from "~/trpc/server";
import catchAsyncError from "~/utils/catchAsyncError";
import { decrypt } from "~/utils/encryption/encryptAndDecrypt";

type DecryptData = {
  id: string;
};

const handleUserLoggedIn = catchAsyncError(async () => {
  const data = cookies().get("_use");

  if (!data?.value) {
    redirect("/login");
  }

  try {
    const { id }: DecryptData = JSON.parse(decrypt(data.value)) as DecryptData;

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
