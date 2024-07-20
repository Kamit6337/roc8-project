/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
  findById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  findByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          email: input.email,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const hashPassword = bcrypt.hashSync(input.password, 12);

      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashPassword,
        },
      });
    }),

  // Save categories related to a user
  saveUserCategory: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, categoryId } = input;

      await ctx.db.userCategory.create({
        data: {
          userId,
          categoryId,
        },
      });
      return {
        message: `Categories processed for user ${userId} in category ${categoryId}`,
      };
    }),

  removeUserCategory: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, categoryId } = input;

      await ctx.db.userCategory.delete({
        where: {
          userId_categoryId: {
            userId,
            categoryId,
          },
        },
      });
      
      return {
        message: `Category deleted for user ${userId} in category ${categoryId}`,
      };
    }),

  // Find categories related to a specific user
  findUserCategories: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      return ctx.db.userCategory.findMany({
        where: {
          userId: userId,
        },
      });
    }),
});
