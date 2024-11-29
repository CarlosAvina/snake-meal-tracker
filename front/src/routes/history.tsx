import { useLoaderData } from "react-router-dom";
import { formatUTCDateISO } from "../utils/date";
import styles from "./css/history.module.css";

type Record = {
  recordId: number;
  lastmeal: string;
  nextmeal: string;
  snakeId: number;
};

export default function History() {
  const history = useLoaderData() as Record[];

  if (!history || !Array.isArray(history)) return null;

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
