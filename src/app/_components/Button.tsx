import Loading from "./Loading";

const Button = ({
  title,
  isLoading = false,
}: {
  title: string;
  isLoading?: boolean;
}) => {
  return (
    <button
      type="submit"
      className="flex h-14 w-full items-center justify-center rounded-md bg-black font-medium uppercase tracking-wider text-white"
    >
      {isLoading ? <Loading /> : title}
    </button>
  );
};

export default Button;
