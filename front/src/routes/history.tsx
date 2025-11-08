import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatUTCDateISO } from "../utils/date";
import styles from "./css/history.module.css";

type Record = {
  recordId: number;
  lastmeal: string;
  nextmeal: string;
  snakeId: number;
};

export default function History() {
  const [history, setHistory] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      setIsLoading(true);
      const snakeId = params.snakeId;

      if (!snakeId) {
        const error = new Error("Missing param: snakeId");
        setError(error);
        setIsLoading(false);
        return;
      }

      const res = await fetch(`/api/meal_history?snakeId=${snakeId}`);

      if (!res.ok && res.status === 403) {
        return navigate("/");
      }

      const data = await res.json();
      setHistory(data);
      setIsLoading(false);
    }
    fetchHistory();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;
  if (history.length === 0 || !history || !Array.isArray(history))
    return <h1>No items</h1>;

  return (
    <div className={styles.layout}>
      <h1>History of your snake meals</h1>
      <table className={styles.table}>
        <tr>
          <th>Id</th>
          <th>Last meal</th>
          <th>Next meal</th>
        </tr>
        {history.map((record) => {
          return (
            <tr key={record.recordId}>
              <td>{record.recordId}</td>
              <td>{formatUTCDateISO(new Date(record.lastmeal))}</td>
              <td>{formatUTCDateISO(new Date(record.nextmeal))}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
