const { turso } = require("./db.js");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

const {
  getSnakesQuery,
  getSnakeHistory,
  insertRecord,
  authUser,
} = require("./queries.js");
const port = process.env.API_PORT;

app.use(express.json(), cors());
app.listen(port, () => {
  console.log("Starting server in port: ", port);
});

app.get("/snakes", async (_, res) => {
  try {
    const { rows } = await turso.execute(getSnakesQuery);
    return res.send(rows);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.post("/feed_snake", async (req, res) => {
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

app.get("/meal_history", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Send mandatory fields" });

  try {
    const { rows } = await turso.execute({
      sql: authUser,
      args: [username],
    });

    if (rows.length === 0) {
      return res.status(400).json({ message: "Wrong user or password" });
    }

    const hash = rows[0].password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err || result === false) {
        return res.status(400).json({ message: "Wrong user or password" });
      }

      return res.status(200).json({ status: result });
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
