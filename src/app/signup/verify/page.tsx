"use client";

import { useState } from "react";
import Box from "~/app/_components/Box";
import OtpInput from "~/app/_components/OtpInput";

const modifyEmail = (email: string): string => {
  const splitEmail = email.split("@");
  const emailProvider = splitEmail.at(-1);
  const slice = splitEmail.slice(0, -1);
  const joined = slice.join("@");
  const firstThree = joined.slice(0, 3);
  return `${firstThree}***@${emailProvider}`;
};

const VerifySignUp = () => {
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const email = "kamit6337@gmail.com";

  return (
    <Box title="Verify your email" height={453}>
      <div className="text-center">
        <p>Enter the 8 digit code you have received on</p>
        <p className="font-medium">{modifyEmail(email)}</p>
      </div>
      <OtpInput otp={otp} cb={(value: string[]) => setOtp(value)} />
      <button className="mt-12 flex h-14 w-full items-center justify-center rounded-md bg-black font-medium uppercase tracking-wider text-white">
        Verify
      </button>
    </Box>
  );
};

export default VerifySignUp;
