import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { faker } from "@faker-js/faker";

export const categoryRouter = createTRPCRouter({
  addList: publicProcedure.mutation(async ({ ctx }) => {
    const array100 = new Array(100).fill("");

    for (const _ of array100) {
      const categoryTitle = faker.commerce.product();

      const findCategory = await ctx.db.category.findFirst({
        where: {
          title: categoryTitle,
        },
      });

      if (!findCategory) {
        await ctx.db.category.create({
          data: {
            title: categoryTitle,
          },
        });
      }
    }
  }),

  getByPage: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(({ ctx, input }) => {
      const { page = 1 } = input; // Default page size is 6 entries

      const perPage = 6;
      const skip = (page - 1) * perPage;

      return ctx.db.category.findMany({
        orderBy: { createdAt: "desc" },
        take: perPage,
        skip: skip,
      });
    }),

  getTotalCount: publicProcedure.query(({ ctx }) => {
    return ctx.db.category.count();
  }),
});
