import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { EmailTemplate } from "~/components/email-template";
import { prisma } from "~/server/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
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
            const snakeNames = snakesToFeed.join(', ');

            const data = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: "delivered@resend.dev",
                subject: "Time to feed your snakes",
                html: "<strong>It works!</strong>",
                react: EmailTemplate({ snakeName: snakeNames }),
            });

            res.status(200).json(data);
        }

        res.status(200).json({ message: 'Not sending email' });
    } catch (error) {
        res.status(400).json(error);
    }
}