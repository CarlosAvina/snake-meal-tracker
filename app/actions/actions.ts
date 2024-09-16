"use server";
import { feedSnake } from "@/drizzle/db";

export async function feedOnClick(id: number, mealInterval?: number) {
  return await feedSnake(id, new Date(), mealInterval);
}
