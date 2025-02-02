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
  },
  {
    path: "/history/snake/:snakeId",
    element: <History />,
  },
]);

export default router;
