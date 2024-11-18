import test from "ava"
import fs from "fs"
import { getTestPostgresDatabaseFactory } from "ava-postgres"
import exampleSQL from "./example1.sql"
import { getSchemaSQL } from "../../src"

const getTestDatabase = getTestPostgresDatabaseFactory({
  postgresVersion: "14",
})

test("dump an example sql schema, should be the same when re-uploading and re-dumping", async (t) => {
  const [
    { pool: pool1, connectionString: conn1 },
    { pool: pool2, connectionString: conn2 },
  ] = await Promise.all([getTestDatabase(), getTestDatabase()])

  // await pool1.query(fs.readFileSync("./example1.testing.sql").toString())

  await pool1.query(exampleSQL)

  process.env.DATABASE_URL = conn1
  const sql1 = await getSchemaSQL({
    schemas: ["public", "api", "super_api"],
  })

  // fs.writeFileSync("example1.testing.sql", sql1)

  await pool2.query(sql1)

  const sql2 = await getSchemaSQL({
    schemas: ["public", "api", "super_api"],
  })

  // fs.writeFileSync("example1-2.testing.sql", sql2)

  t.is(sql1, sql2)
})
