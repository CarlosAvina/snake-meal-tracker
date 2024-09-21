"use client";
import { useState, useEffect } from "react";
import moment from "moment";
import FeedButton from "./FeedButton";

type Props = {
  id: number;
  lastmeal: Date;
  mealdayinterval: number;
};

function SnakeCardContent({ id, lastmeal, mealdayinterval }: Props) {
  const [lastMealDate, setLastMealDate] = useState(lastmeal);
  const [selectedInterval, setSelectedInterval] = useState(mealdayinterval);

  useEffect(() => {
    setLastMealDate(lastmeal);
  }, [lastmeal]);

  return (
    <>
      <label className="border-black border rounded-lg p-6 w-full">
        <b>Last meal:</b>
        <p>{moment(lastMealDate).fromNow()}</p>
      </label>
      <label className="border-black border rounded-lg p-6 w-full">
        <b>Next meal:</b>
        <p>{moment(lastMealDate).add(mealdayinterval, "days").fromNow()}</p>
      </label>
      <div className="w-max">
        <FeedButton
          id={id}
          mealInterval={selectedInterval}
          setLastMeal={setLastMealDate}
          setSelectedInterval={setSelectedInterval}
        />
      </div>
    </>
  );
}

export default SnakeCardContent;
