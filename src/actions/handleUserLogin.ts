"use server";
import { trpc } from "~/trpc/server";
import catchAsyncError from "~/utils/catchAsyncError";
import bcrypt from "bcryptjs";
import { encrypt } from "~/utils/encryption/encryptAndDecrypt";
import { cookies } from "next/headers";

type Props = {
  email: string;
  password: string;
};

const handleUserLogin = catchAsyncError(async (data: Props) => {
  const getUser = await trpc.user.findByEmail({ email: data.email });

  if (!getUser) {
    throw new Error("Email is incorrect");
  }

  const bool = bcrypt.compareSync(data.password, getUser.password);

  console.log("bool", bool);

  if (!bool) {
    throw new Error("Password is incorrect");
  }

  const encryptUser = encrypt({ id: getUser.id, name: getUser.name });

  cookies().set("_use", encryptUser, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return getUser.name;
});

export default handleUserLogin;
