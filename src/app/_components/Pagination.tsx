import Link from "next/link";
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

  return (
    <main className="self-start">
      <Pagination className="">
        <PaginationContent className="">
          <PaginationItem>
            <Link href={`/`}>
              <ReactIcons.leftDoubleAngle />
            </Link>
          </PaginationItem>
          <PaginationItem>
            <Link
              href={`${currentPage > 2 ? `/?page=${currentPage - 1}` : "/"}`}
            >
              <ReactIcons.leftAngle />
            </Link>
          </PaginationItem>

          {new Array(totalPages).fill("").map((_, i) => {
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  href={i === 0 ? "/" : `/?page=${i + 1}`}
                  className={`${currentPage === i + 1 ? "font-semibold" : ""} text-[20px]`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Link
              href={`${currentPage !== totalPages ? `/?page=${currentPage + 1}` : ""}`}
            >
              <ReactIcons.rightAngle />
            </Link>
          </PaginationItem>
          <PaginationItem>
            <Link href={`/?page=${totalPages}`}>
              <ReactIcons.rightDoubleAngle />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}

export default CategoryPagination;
