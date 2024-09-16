import React from "react";
import SnakeCardContent from "./components/SnakeCardContent";
import { getSnakes } from "@/drizzle/db";

function toTitleCase(text: string): string {
  return text[0].toUpperCase() + text.slice(1);
}

export default async function Home() {
  const snakes = await getSnakes();

  return (
    <main className="flex min-h-screen flex-col items-center p-3 lg:p-24 gap-6">
      <h1 className="text-4xl font-bold mb-10 text-center lg:text-left">
        Welcome to snake meal tracker!
      </h1>
      {snakes.map((snake) => {
        return (
          <div
            key={snake.id}
            className="flex flex-col gap-4 border border-black rounded-lg p-6 w-9/12 lg:w-4/12"
          >
            <b className="text-2xl">{toTitleCase(snake.name)}</b>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <SnakeCardContent
                id={snake.id}
                lastmeal={snake.lastmeal}
                mealdayinterval={snake.mealdayinterval}
              />
            </div>
          </div>
        );
      })}
    </main>
  );
}
