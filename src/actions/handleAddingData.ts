"use server";
import { trpc } from "~/trpc/server";

const handleAddingData = async () => {
  await trpc.category.addList();
};

export default handleAddingData;
