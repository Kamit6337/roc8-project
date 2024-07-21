"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import handleCreateUser from "~/actions/handleCreateUser";
import Box from "~/app/_components/Box";
import OtpInput from "~/app/_components/OtpInput";
import Toastify, { ToastContainer } from "~/app/_components/Toastify";
import modifyEmail from "~/utils/javascript/modifyEmail";

const VerifySignUp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const email = typeof window !== "undefined" && localStorage.getItem("email");

  const { showErrorMessage } = Toastify();

  const handleSubmit = async () => {
    try {
      const modifyOtp = otp.join("");
      await handleCreateUser(modifyOtp);
      localStorage.removeItem("email");
      router.push("/");
    } catch (error) {
      showErrorMessage({
        message: "Something went wrong. Please try later",
      });
    }
  };

  return (
    <>
      <Box title="Verify your email" height={453}>
        <div className="text-center">
          <p>Enter the 8 digit code you have received on</p>
          <p className="font-medium">{email ? modifyEmail(email) : ""}</p>
        </div>
        <OtpInput otp={otp} cb={(value: string[]) => setOtp(value)} />
        <button
          onClick={handleSubmit}
          className="mt-12 flex h-14 w-full items-center justify-center rounded-md bg-black font-medium uppercase tracking-wider text-white"
        >
          Verify
        </button>
      </Box>
      <ToastContainer />
    </>
  );
};

export default VerifySignUp;
