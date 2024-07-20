/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import Box from "../_components/Box";
import Input from "../_components/Input";
import Button from "../_components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("data", data);
  };

  return (
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
        <Button title="Create Account" />
        <div className="mt-3 flex items-center gap-3">
          <p className="text-light_black">Have an Account?</p>
          <button className="font-medium uppercase tracking-wider">
            Login
          </button>
        </div>
      </Box>
    </form>
  );
};

export default SignUpPage;
