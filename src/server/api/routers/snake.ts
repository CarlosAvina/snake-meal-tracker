import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const snakeRouter = createTRPCRouter({
    getAllSnakes: publicProcedure.query(async ({ ctx }) => {

        const snakes = await ctx.prisma.snake.findMany();
        return {
            snakes,
        }
    }),
    getSnakeById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const { id } = input;
        const snake = await ctx.prisma.snake.findUnique({ where: { id } });

        if (!snake) return { snake: null, message: 'No snake found' }

        return { snake };
    }),
    createSnake: publicProcedure.input(z.object({ name: z.string(), species: z.string() })).mutation(async ({ input, ctx }) => {
        const { name, species } = input;
        const snake = await ctx.prisma.snake.create({ data: { name, species } });

        return { snake }
    }),
    registerLastMeal: publicProcedure.input(z.object({ id: z.string(), lastMeal: z.date() })).mutation(async ({ input, ctx }) => {
        const { id, lastMeal } = input;
        const snake = await ctx.prisma.snake.update({ data: { lastMeal }, where: { id } });

        return { snake }
    })
});
