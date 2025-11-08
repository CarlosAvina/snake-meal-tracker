const { turso } = require("./db.js");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const {
  getSnakesQuery,
  getSnakeHistory,
  insertRecord,
} = require("./queries.js");
const port = process.env.API_PORT;

app.use(
  express.json(),
  cors({
    origin: ["http://localhost:5173", "https://snakes.carlosavina.dev"],
    credentials: true,
  }),
  cookieParser(),
);

app.listen(port, () => {
  console.log("Starting server in port: ", port);
});

app.get("/api/snakes", async (_, res) => {
  try {
    const { rows } = await turso.execute(getSnakesQuery);
    return res.send(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.post("/api/feed_snake", async (req, res) => {
  const { lastmeal, nextmeal, snakeId } = req.body;

  if (!lastmeal || !nextmeal || !snakeId) {
    return res.status(400).json({ message: "Send mandatory fields" });
  }

  try {
    const [_, snakeResponse] = await turso.batch(
      [
        {
          sql: insertRecord,
          args: [lastmeal, nextmeal, snakeId],
        },
        {
          sql: getSnakesQuery,
          args: [],
        },
      ],
      "write",
    );
    return res.send(snakeResponse.rows);
  } catch (error) {
    return res.status(500).json({ error, message: "Unexpected error" });
  }
});

app.get("/api/meal_history", async (req, res) => {
  const { snakeId } = req.query;

  if (!snakeId)
    return res.status(400).json({ message: "snakeId is a mandatory param" });

  try {
    const { rows } = await turso.execute({
      sql: getSnakeHistory,
      args: [snakeId],
    });
    res.status(200).send(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
});
