import ReactIcons from "~/assets/icons";

const list: string[] = [
  "Categories",
  "Sale",
  "Clearance",
  "New stock",
  "Trending",
];

const topList = ["Help", "Orders & Return", "Hi, John"];

const Header = () => {
  return (
    <header className="flex h-[130px] w-full flex-col">
      <div className="flex h-8 items-center justify-between gap-5 self-end px-10 text-xs">
        {topList.map((txt, i) => {
          return <p key={i}>{txt}</p>;
        })}
      </div>
      <div className="flex h-full w-full flex-1 items-center justify-between px-10">
        <p className="text-[32px] font-bold">ECOMMERCE</p>
        <div className="flex items-center gap-7 font-medium">
          {list.map((txt, i) => {
            return <p key={i}>{txt}</p>;
          })}
        </div>
        <div className="flex items-center gap-8">
          <p className="text-[32px]">
            <ReactIcons.search />
          </p>
          <p className="text-[32px]">
            <ReactIcons.cart />
          </p>
        </div>
      </div>
      <div className="bg-header_gray flex h-8 items-center justify-center gap-5 text-sm">
        <p>
          <ReactIcons.leftAngle />
        </p>
        <p>Get 10% off on business sign up</p>
        <p>
          <ReactIcons.rightAngle />
        </p>
      </div>
    </header>
  );
};

export default Header;
