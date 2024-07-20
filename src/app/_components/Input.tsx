import type { UseFormRegister } from "react-hook-form";

type InputProps = {
  title: string;
  type?: string;
  name?: "name" | "email" | "password";
  register: UseFormRegister<FormData>;
  error: string | undefined;
};

const Input = ({ title, type = "text", name, register, error }: InputProps) => {
  return (
    <div className="h-[74px] w-full space-y-1">
      <p className="">{title}</p>
      <div className="border-box_border rounded-md border shadow-sm">
        <input
          type={type}
          {...register(name)}
          placeholder="Enter"
          className="w-full rounded-md p-2 text-[#848484]"
        />
      </div>
      <p className="text-xs text-red-500">{error}</p>
    </div>
  );
};

export default Input;
