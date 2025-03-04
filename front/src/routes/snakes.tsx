import { useState, useEffect, SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./css/snakes.module.css";
import { formatDistance } from "date-fns";

type Snake = {
  snakeId: number;
  name: string;
  lastmeal: string;
  nextmeal: string;
};

type State = {
  snakes: Snake[];
  loading: boolean;
  error: Error | null;
  feedingSnakes: number[];
};

const baseUrl = import.meta.env.VITE_BASE_URL;
const NEXT_IN_DAYS = 8;

const initialState: State = {
  snakes: [],
  loading: false,
  error: null,
  feedingSnakes: [],
};

export default function Snakes() {
  const [state, setState] = useState<State>(initialState);
  const { snakes, loading, feedingSnakes } = state;
  const navigate = useNavigate();

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const snakeId = Number(formData.get("snakeId")?.toString());

    const next = new Date();
    next.setDate(next.getDate() + NEXT_IN_DAYS);
    const nextmeal = next.toISOString();
    const lastmeal = new Date().toISOString();

    setState((prev) => ({
      ...prev,
      feedingSnakes: prev.feedingSnakes.concat(snakeId),
    }));
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
      credentials: "include",
    });

    const response = await fetch(newRequest);
    const data = await response.json();
    setState((prev) => ({
      ...prev,
      snakes: data,
      feedingSnakes: prev.feedingSnakes.filter((id) => id !== snakeId),
    }));
  }

  useEffect(() => {
    async function fetchSnakes() {
      setState((prev) => ({ ...prev, loading: true }));
      const res = await fetch(`${baseUrl}/snakes`, { credentials: "include" });

      if (!res.ok && res.status === 403) {
        return navigate("/");
      }

      const data = await res.json();
      setState((prev) => ({ ...prev, snakes: data, loading: false }));
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
                  {feedingSnakes.some((id) => id === snake.snakeId)
                    ? "Feeding..."
                    : "Feed"}
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
