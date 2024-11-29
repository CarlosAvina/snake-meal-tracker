const connection = require("./db.js");
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
  connection.query("use snakes;");
});

app.get("/snakes", (_, res) => {
  connection.query(getSnakesQuery, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.send(rows);
  });
});

app.post("/feed_snake", (req, res) => {
  const { lastmeal, nextmeal, snakeId } = req.body;

  if (!lastmeal || !nextmeal || !snakeId) {
    return res.status(400).json({ message: "Send mandatory fields" });
  }

  connection.query(insertRecord, [lastmeal, nextmeal, snakeId], (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    connection.query(getSnakesQuery, (err, rows) => {
      if (err) return res.status(500).json({ error: err });
      res.send(rows);
    });
  });
});

app.get("/meal_history", (req, res) => {
  const { snakeId } = req.query;

  if (!snakeId)
    return res.status(400).json({ message: "snakeId is a mandatory param" });

  connection.query(getSnakeHistory, [snakeId], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).send(rows);
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Send mandatory fields" });

  connection.query(authUser, [username], (err, rows) => {
    if (err) return res.status(400).json({ message: err.message });

    if (rows.length === 0)
      return res.status(400).json({ message: "Wrong user or password" });

    const hash = rows[0].password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err || result === false) {
        return res.status(400).json({ message: "Wrong user or password" });
      }

      res.status(200).json({ status: result });
    });
  });
});
