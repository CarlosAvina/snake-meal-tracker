import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const snakes = pgTable(
  "snakes",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    lastmeal: timestamp("lastmeal").notNull(),
    mealdayinterval: integer("mealdayinterval").notNull(),
  },
  (snakes) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(snakes.name),
    };
  },
);
