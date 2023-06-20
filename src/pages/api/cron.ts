import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = await prisma.snake.findMany({
        select: {
            name: true, lastMeal: true
        }
    });

    const snakesToFeed: string[] = [];

    data.forEach((snake) => {
        const nextMeal = moment(snake.lastMeal).add(10, 'days');
        const daysToNextMeal = nextMeal.diff(moment(), 'days');

        if (daysToNextMeal < 3) {
            snakesToFeed.push(snake.name);
        }
    });

    if (snakesToFeed.length > 0) {
        console.log('Sending email to ', snakesToFeed.join(','));
        res.status(200).end('Send email!');
    }

    console.log('Not sending email');
}