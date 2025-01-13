const getSnakesQuery = `
    select r.recordId, r.snakeId, r.lastmeal, r.nextmeal, s.name from records as r
    inner join (
      select snakeId, max(lastmeal) as max_lastmeal
      from records
      group by snakeId
    ) max_dates
    on r.snakeId = max_dates.snakeId
    and r.lastmeal = max_dates.max_lastmeal
    inner join snakes as s
    on s.snakeId = r.snakeId;
  `;

const insertRecord = `insert into records (lastmeal, nextmeal, snakeId) values (?, ?, ?);`;

const getSnakeHistory = `select * from records where snakeId = ? order by recordId desc;`;

const authUser = `select * from users where name = ?;`;

module.exports = {
  getSnakesQuery,
  getSnakeHistory,
  insertRecord,
  authUser,
};
