"use server";
import { sql } from "@vercel/postgres";

export default async function updateLastMeal(snakeId: number, newDate: string) {
  await sql`UPDATE snakes SET lastmeal = ${newDate} WHERE snakes.id = ${snakeId}`;
}
