import { useLoaderData, Form, Link } from "react-router-dom";
import styles from "./css/snakes.module.css";
import { formatDistance } from "date-fns";

type Snake = {
  snakeId: number;
  name: string;
  lastmeal: string;
  nextmeal: string;
};

export default function Snakes() {
  const snakes = useLoaderData() as Snake[];

  if (!snakes || !Array.isArray(snakes)) return null;

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
                <button type="submit">Feed</button>
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
