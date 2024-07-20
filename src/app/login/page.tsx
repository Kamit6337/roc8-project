/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import Box from "../_components/Box";
import Input from "../_components/Input";
import Button from "../_components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import handleUserLogin from "~/actions/handleUserLogin";
import Toastify from "../_components/Toastify";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { ToastContainer, showErrorMessage } = Toastify();

  const onSubmit = async (data: FormData) => {
    try {
      await handleUserLogin(data);
      router.push("/");
    } catch (error) {
      showErrorMessage({ message: error?.message || "Something went wrong" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Login" height={691} gap={30}>
          <div className="space-y-1 text-center">
            <p className="text-2xl font-medium">Welcome back to ECOMMERCE</p>
            <p>The next gen business marketplace</p>
          </div>
          <Input
            name="email"
            type="email"
            title="Email"
            register={register}
            error={errors.email?.message}
          />
          <Input
            name="password"
            type="password"
            title="Password"
            register={register}
            error={errors.password?.message}
          />
          <Button title="Login" />
          <div className="mt-3 flex items-center gap-3">
            <p className="text-light_black">Don’t have an Account?</p>
            <button className="font-medium uppercase tracking-wider">
              <Link href={"/signup"}>Sign Up</Link>
            </button>
          </div>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
