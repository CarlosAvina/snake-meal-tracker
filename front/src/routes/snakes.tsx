import { useState, useEffect, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./css/snakes.module.css";
import { formatDistance } from "date-fns";

type Snake = {
  snakeId: number;
  name: string;
  lastmeal: string;
  nextmeal: string;
};

const baseUrl = import.meta.env.VITE_BASE_URL;
const NEXT_IN_DAYS = 8;

export default function Snakes() {
  const [snakes, setSnakes] = useState<Snake[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const snakeId = Number(formData.get("snakeId")?.toString());

    const next = new Date();
    next.setDate(next.getDate() + NEXT_IN_DAYS);
    const nextmeal = next.toISOString();
    const lastmeal = new Date().toISOString();

    const newRequest = new Request(`${baseUrl}/feed_snake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snakeId,
        lastmeal,
        nextmeal,
      }),
    });

    const response = await fetch(newRequest);
    const data = await response.json();
    setSnakes(data);
  }

  useEffect(() => {
    async function fetchSnakes() {
      setLoading(true);
      const res = await fetch(`${baseUrl}/snakes`);
      const data = await res.json();
      setSnakes(data);
      setLoading(false);
    }
    fetchSnakes();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (snakes.length === 0 || !snakes || !Array.isArray(snakes))
    return <h1>No snakes...</h1>;

  return (
    <div className={styles.list}>
      <h1>My snakes :)</h1>
      {snakes.map((snake) => {
        return (
          <form key={snake.snakeId} className={styles.card} onSubmit={onSubmit}>
            <b>{snake.name.toUpperCase()}</b>
            <div className={styles.cardElements}>
              <input
                className={styles.snakeId}
                name="snakeId"
                defaultValue={snake.snakeId}
              />
              <div>
                <b>Last meal</b>
                <p>
                  {formatDistance(new Date(snake.lastmeal), new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div>
                <b>Next meal</b>
                <p>
                  {formatDistance(new Date(snake.nextmeal), new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.feedButton} type="submit">
                  Feed
                </button>
                <Link to={`/history/snake/${snake.snakeId}`}>
                  <button>History</button>
                </Link>
              </div>
            </div>
          </form>
        );
      })}
    </div>
  );
}
