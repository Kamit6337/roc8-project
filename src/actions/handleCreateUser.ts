"use server";

import catchAsyncError from "~/utils/catchAsyncError";
import { trpc } from "~/trpc/server";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "~/utils/encryption/encryptAndDecrypt";

const handleCreateUser = catchAsyncError(async (givenOtp) => {
  const data = cookies().get("_sig");

  if (!data) {
    throw new Error("Something went wrong");
  }

  const decryptedValue = decrypt(data.value);

  console.log("decryptedValue", decryptedValue);

  const { otp, name, email, password } = decryptedValue;

  if (Number(givenOtp) !== otp) {
    throw new Error("OTP is incorrect");
  }

  const userCreated = await trpc.user.create({
    name,
    email,
    password,
  });

  const encryptUser = encrypt({ id: userCreated.id, name: userCreated.name });

  cookies().set("_use", encryptUser, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  cookies().delete("_sig");

  return userCreated.name;
});

export default handleCreateUser;
