import Link from "next/link";
import ReactIcons from "~/assets/icons";

function CategoryPagination({
  total,
  currentPage,
}: {
  total: number;
  currentPage: number;
}) {
  const perPage = 6;
  const isRemainder = total % perPage === 0;

  const totalPages = isRemainder
    ? total / perPage
    : Math.trunc(total / perPage) + 1;

  const maxPagesToShow = 7;

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, currentPage + 3);

    if (currentPage <= 4) {
      endPage = Math.min(totalPages, maxPagesToShow);
    }

    if (currentPage > totalPages - 4) {
      startPage = Math.max(1, totalPages - 6);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <main className="flex w-[293px] items-center justify-between self-start">
      <div className="flex items-center gap-1">
        <Link scroll={false} href={`/`}>
          <ReactIcons.leftDoubleAngle className="text-pagination_gray" />
        </Link>
        <Link
          scroll={false}
          href={`${currentPage > 2 ? `/?page=${currentPage - 1}` : "/"}`}
        >
          <ReactIcons.leftAngle className="text-pagination_gray" />
        </Link>
      </div>

      {currentPage > 4 && (
        <p className="self-end">
          <ReactIcons.threeDot className="text-pagination_gray" />
        </p>
      )}

      {pages.map((page) => (
        <Link
          scroll={false}
          key={page}
          href={page === 1 ? "/" : `/?page=${page}`}
          className={`${currentPage === page ? "font-semibold text-black" : "text-pagination_gray"} flex w-max items-center justify-between text-[20px]`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages - 3 && (
        <p className="self-end">
          <ReactIcons.threeDot className="text-pagination_gray" />
        </p>
      )}

      <div className="flex items-center gap-1">
        <Link
          scroll={false}
          href={`${currentPage !== totalPages ? `/?page=${currentPage + 1}` : `/?page=${totalPages}`}`}
        >
          <ReactIcons.rightAngle className="text-pagination_gray" />
        </Link>
        <Link scroll={false} href={`/?page=${totalPages}`}>
          <ReactIcons.rightDoubleAngle className="text-pagination_gray" />
        </Link>
      </div>
    </main>
  );
}

export default CategoryPagination;
