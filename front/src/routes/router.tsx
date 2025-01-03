import { createBrowserRouter } from "react-router-dom";
import Login from "./login";
import Snakes from "./snakes";
import History from "./history";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/snakes",
    element: <Snakes />,
    loader: async () => {
      return fetch("http://localhost:3000/snakes");
    },
    action: async ({ request }) => {
      const formData = await request.formData();
      const snakeId = Number(formData.get("snakeId")?.toString());

      const NEXT_IN_DAYS = 8;
      const next = new Date();
      next.setDate(next.getDate() + NEXT_IN_DAYS);
      const nextmeal = next.toISOString().slice(0, 19).replace("T", " ");
      const lastmeal = new Date().toISOString().slice(0, 19).replace("T", " ");

      const newRequest = new Request("http://localhost:3000/feed_snake", {
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

      const response = fetch(newRequest);
      return response;
    },
    errorElement: <h1>Error :(</h1>,
  },
  {
    path: "/history/snake/:snakeId",
    element: <History />,
    loader: ({ params }) => {
      const snakeId = params.snakeId;

      if (!snakeId) throw Error("Missing param");

      const url = new URL("http:localhost:3000/meal_history");
      url.searchParams.append("snakeId", snakeId);

      return fetch(url);
    },
    errorElement: <h1>Error :(</h1>,
  },
]);

export default router;
