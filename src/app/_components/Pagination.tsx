import ReactIcons from "~/assets/icons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "~/components/ui/pagination";

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
    <main className="w-[293px] self-start">
      <Pagination className="">
        <PaginationContent className="flex w-full items-center justify-between">
          <PaginationItem>
            <PaginationLink href={`/`} className="w-4">
              <ReactIcons.leftDoubleAngle className="text-pagination_gray" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`${currentPage > 2 ? `/?page=${currentPage - 1}` : "/"}`}
              className="w-3"
            >
              <ReactIcons.leftAngle className="text-pagination_gray" />
            </PaginationLink>
          </PaginationItem>

          {currentPage > 4 && (
            <>
              <PaginationItem>
                <PaginationEllipsis className="text-pagination_gray" />
              </PaginationItem>
            </>
          )}

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={page === 1 ? "/" : `/?page=${page}`}
                className={`${currentPage === page ? "font-semibold text-black" : "text-pagination_gray"} flex w-max items-center justify-between text-[20px]`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < totalPages - 3 && (
            <>
              <PaginationItem>
                <PaginationEllipsis className="text-pagination_gray" />
              </PaginationItem>
              {/* <PaginationItem>
                <PaginationLink href={`/?page=${totalPages}`}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem> */}
            </>
          )}

          <PaginationItem>
            <PaginationLink
              href={`${currentPage !== totalPages ? `/?page=${currentPage + 1}` : `/?page=${totalPages}`}`}
              className="w-3"
            >
              <ReactIcons.rightAngle className="text-pagination_gray" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={`/?page=${totalPages}`} className="w-4">
              <ReactIcons.rightDoubleAngle className="text-pagination_gray" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}

export default CategoryPagination;
