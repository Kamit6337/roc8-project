import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { HydrateClient, trpc } from "~/trpc/server";
import Box from "./_components/Box";
import { faker } from "@faker-js/faker";

export default async function Home() {
  const hello = await trpc.post.hello({ text: "from tRPC" });
  const value = hello ? hello.greeting : "Loading tRPC query...";

  const category = faker.commerce.product();

  void trpc.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Box title="Please mark your interests!" height={658}>
        <p>We will keep you notified.</p>
        <div className="flex flex-col self-start">
          <p>My saved interests!</p>
        </div>
        <p>{category}</p>
      </Box>
    </HydrateClient>
  );
}
