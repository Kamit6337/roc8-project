import { HydrateClient } from "~/trpc/server";
import Box from "./_components/Box";
import handleUserLoggedIn from "~/actions/handleUserLoggedIn";

export default async function Home() {
  // const hello = await trpc.post.hello({ text: "from tRPC" });
  // const value = hello ? hello.greeting : "Loading tRPC query...";

  await handleUserLoggedIn();

  return (
    <HydrateClient>
      <Box title="Please mark your interests!" height={658}>
        <p>We will keep you notified.</p>
        <div className="flex flex-col self-start">
          <p>My saved interests!</p>
        </div>
      </Box>
    </HydrateClient>
  );
}
