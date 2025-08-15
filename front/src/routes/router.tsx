import { createBrowserRouter } from "react-router-dom";
import Snakes from "./snakes";
import History from "./history";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Snakes />,
  },
  {
    path: "/history/snake/:snakeId",
    element: <History />,
  },
]);

export default router;
