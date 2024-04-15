import { sql } from "@vercel/postgres";
import moment from "moment";
import { formatToIsoDate } from "./utils";

import Button from "./components/button";

function toTitleCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const snakes = await sql`SELECT * FROM snakes ORDER BY id ASC`;

  return (
    <main className="flex flex-col text-center items-center justify-center">
      <h1 className="text-4xl font-bold m-10">Snakes</h1>
      <ul className="flex flex-col md:flex-row gap-10">
        {snakes.rows.map((snake) => {
          const lastMeal = formatToIsoDate(snake.lastmeal);
          const nextMeal = formatToIsoDate(snake.lastmeal).add(
            snake.mealdayinterval,
            "days",
          );

          const lastMealDate = lastMeal.format("dddd, MMMM Do YYYY");
          const nextMealDate = nextMeal.format("dddd, MMMM Do YYYY");

          const datesDurationDiff = moment.duration(nextMeal.diff(moment()));
          const diff = Math.floor(datesDurationDiff.asDays());
          return (
            <li
              key={snake.id}
              className="flex flex-col gap-4 border-black rounded-md border p-5"
            >
              <h3 className="text-2xl font-bold">{toTitleCase(snake.name)}</h3>
              <b className="flex flex-col items-start">
                Last meal: <span className="font-normal">{lastMealDate}</span>
              </b>
              <b className="flex flex-col items-start">
                Next meal: <span className="font-normal">{nextMealDate}</span>
              </b>
              <b className="flex flex-col items-start">
                Next meal in:{" "}
                <span className="font-normal">
                  {diff === 1 ? `${diff} day` : `${diff} days`}
                </span>
              </b>
              <Button id={snake.id} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
