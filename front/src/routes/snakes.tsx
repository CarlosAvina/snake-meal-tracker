import { useState, useEffect } from "react";
import { Form, Link } from "react-router-dom";
import styles from "./css/snakes.module.css";
import { formatDistance } from "date-fns";

type Snake = {
  snakeId: number;
  name: string;
  lastmeal: string;
  nextmeal: string;
};

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function Snakes() {
  const [snakes, setSnakes] = useState<Snake[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
          <Form key={snake.snakeId} className={styles.card} method="post">
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
          </Form>
        );
      })}
    </div>
  );
}
