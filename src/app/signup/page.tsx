"use client";
import Box from "../_components/Box";
import Input from "../_components/Input";
import Button from "../_components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import handleUserSignup from "~/actions/handleUserSignup";
import { useRouter } from "next/navigation";
import Toastify, { ToastContainer } from "../_components/Toastify";
import Link from "next/link";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

const SignUpPage = () => {
  const router = useRouter();
  const { showErrorMessage } = Toastify();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await handleUserSignup(data);
      localStorage.setItem("email", data.email);
      router.push("/signup/verify");
    } catch (error) {
      showErrorMessage({
        message: "Something went wrong. Please try later",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Create Your Account" height={691} gap={30}>
          <Input
            name="name"
            title="Name"
            register={register}
            error={errors.name?.message}
          />
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
          <Button title="Create Account" isLoading={isSubmitting} />
          <div className="mt-3 flex items-center gap-3">
            <p className="text-light_black">Have an Account?</p>
            <button className="font-medium uppercase tracking-wider">
              <Link href={`/login`}>Login</Link>
            </button>
          </div>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
