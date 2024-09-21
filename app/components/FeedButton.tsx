"use client";
import { feedOnClick } from "../actions/actions";

type Props = {
  id: number;
  mealInterval: number;
  setLastMeal: (newDate: Date) => void;
  setSelectedInterval: (interval: number) => void;
};

function getSelectOptions(currentInterval: number) {
  const numberOfOptions = 5;
  const options = [];

  for (let i = -2; i < numberOfOptions - 2; i++) {
    options.push(currentInterval + i);
  }

  return options;
}

function FeedButton({
  id,
  mealInterval,
  setLastMeal,
  setSelectedInterval,
}: Props) {
  const options = getSelectOptions(mealInterval);

  return (
    <div className="flex gap-1">
      <button
        className="bg-red-600 text-white p-3 rounded-l-md"
        onClick={async () => {
          const result = await feedOnClick(id, mealInterval);
          setLastMeal(result[0].lastmeal);
        }}
      >
        Feed in
      </button>
      <select
        className="bg-red-600 text-white p-3 rounded-r-md"
        onChange={(event) => {
          const newInterval = parseInt(event.currentTarget.value);
          setSelectedInterval(newInterval);
        }}
        value={mealInterval}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value} day(s)
          </option>
        ))}
      </select>
    </div>
  );
}

export default FeedButton;
