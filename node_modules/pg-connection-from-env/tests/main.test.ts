import test from "ava"
import { getConnectionStringFromEnv } from "../index"

test("connection string with env", (t) => {
  const connStr = getConnectionStringFromEnv({
    database: "test",
    env: {},
  })
  t.is(connStr, "postgresql://postgres:@localhost:5432/test")
})

test('connection string "postgres" with env', async (t) => {
  const connStr = getConnectionStringFromEnv({
    database: "postgres",
    env: {
      DATABASE_URL: "postgres://test:@localhost:5432/test",
    },
  })
  t.is(connStr, "postgresql://test:@localhost:5432/postgres")
})
