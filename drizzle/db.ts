import "@/drizzle/envConfig";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

export const db = drizzle(sql, { schema });

export const getSnakes = async () => {
  return db.query.snakes.findMany();
};

export const feedSnake = async (
  id: number,
  currentDate: Date,
  newMealInterval?: number,
) => {
  return db
    .update(schema.snakes)
    .set({
      id,
      lastmeal: currentDate,
      mealdayinterval: newMealInterval,
    })
    .where(eq(schema.snakes.id, id))
    .returning();
};
