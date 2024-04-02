"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export default async function updateLastMeal(snakeId: number, newDate: string) {
  console.log(newDate);
  await sql`UPDATE snakes SET lastmeal = ${newDate} WHERE snakes.id = ${snakeId}`;
  revalidatePath("/");
}