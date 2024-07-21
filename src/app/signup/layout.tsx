import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
  description: "this is the signup page.",
};

const SignUpLoayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SignUpLoayout;
