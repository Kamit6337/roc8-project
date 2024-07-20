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

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });
  // }),
});
