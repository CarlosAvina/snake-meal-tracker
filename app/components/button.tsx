"use client";
import moment from "moment";
import updateLastMeal from "../actions/updateLastMeal";

export default function Button({ id }: { id: string }) {
  return (
    <button
      id={id}
      className="border-black rounded-md bg-blue-200 p-3 border-2"
      onClick={async (e) => {
        const snakeId = Number(e.currentTarget.id);
        const currentDate = moment().format();
        await updateLastMeal(snakeId, currentDate);
      }}
    >
      Feed
    </button>
  );
}
