import { HydrateClient, trpc } from "~/trpc/server";
import Box from "./_components/Box";
import handleUserLoggedIn from "~/actions/handleUserLoggedIn";
import Category from "./_components/Category";
import CategoryPagination from "./_components/CategoryPagination";

export default async function Home({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  const userId = (await handleUserLoggedIn()) as string;

  const totalCount = await trpc.category.getTotalCount();
  const userCategories = await trpc.user.findUserCategories({ userId });
  const currentPage = page ? Number(page) : 1;
  const categoryByPage = await trpc.category.getByPage({ page: currentPage });

  return (
    <HydrateClient>
      <Box title="Please mark your interests!" height={658}>
        <p>We will keep you notified.</p>
        <div className="flex flex-col self-start text-[20px] font-medium">
          <p>My saved interests!</p>
        </div>
        <Category
          list={categoryByPage}
          userCategories={userCategories}
          userId={userId}
        />
        <CategoryPagination total={totalCount} currentPage={currentPage} />
      </Box>
    </HydrateClient>
  );
}
