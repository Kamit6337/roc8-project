const Box = ({
  children,
  gap = 20,
  title,
  height = null,
  padding = 40,
}: {
  children: React.ReactNode;
  gap?: number;
  title: string;
  height?: number | null;
  padding?: number;
}) => {
  return (
    <main className="my-10 flex justify-center">
      <div
        className={`border-box_border flex w-[576px] flex-col items-center rounded-[20px] border`}
        style={{
          gap: `${gap}px`,
          height: `${height ? height + "px" : "max-content"}`,
          padding: `${padding}px`,
        }}
      >
        <p className="text-[32px] font-semibold">{title}</p>
        {children}
      </div>
    </main>
  );
};

export default Box;
