import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp | Verify",
  description: "this is the signup verify page.",
};

const SignUpVerifyLoayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SignUpVerifyLoayout;
