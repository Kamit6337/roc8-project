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

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //       },
  //     });
  //   }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });
  // }),
});
