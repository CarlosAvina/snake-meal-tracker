import { createBrowserRouter } from "react-router-dom";
import Login from "./login";
import Snakes from "./snakes";
import History from "./history";

const baseUrl = import.meta.env.VITE_BASE_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/snakes",
    element: <Snakes />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const snakeId = Number(formData.get("snakeId")?.toString());

      const NEXT_IN_DAYS = 8;
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

      const response = fetch(newRequest);
      return response;
    },
    errorElement: <h1>Error :(</h1>,
  },
  {
    path: "/history/snake/:snakeId",
    element: <History />,
  },
]);

export default router;
