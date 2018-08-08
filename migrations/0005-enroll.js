const sqlQueries = [
  `CREATE TABLE enroll (
    enroll_id SERIAL PRIMARY KEY,
    enroll_data JSONB NOT NULL DEFAULT '{}'
  )`
]

const sqlQueriesDown = [
  'DROP TABLE enroll'
]

module.exports = {
  up: (applyInTransaction) =>
    applyInTransaction(sqlQueries),
  down: (applyInTransaction) =>
    applyInTransaction(sqlQueriesDown)
}
