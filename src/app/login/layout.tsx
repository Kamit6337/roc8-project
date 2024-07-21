import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "this is the login page.",
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LoginLayout;
