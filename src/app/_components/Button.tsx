const Button = ({ title }: { title: string }) => {
  return (
    <button
      type="submit"
      className="flex h-14 w-full items-center justify-center rounded-md bg-black font-medium uppercase tracking-wider text-white"
    >
      {title}
    </button>
  );
};

export default Button;
