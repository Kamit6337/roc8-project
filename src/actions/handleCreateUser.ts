"use server";

import catchAsyncError from "~/utils/catchAsyncError";
import { trpc } from "~/trpc/server";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "~/utils/encryption/encryptAndDecrypt";

type DecryptData = {
  otp: number;
  name: string;
  email: string;
  password: string;
};

const handleCreateUser = catchAsyncError(
  async (givenOtp: string): Promise<string> => {
    const data = cookies().get("_sig");

    if (!data?.value) {
      throw new Error("Something went wrong");
    }

    const decryptedValue: DecryptData = JSON.parse(
      decrypt(data.value),
    ) as DecryptData;

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
  },
);

export default handleCreateUser;
