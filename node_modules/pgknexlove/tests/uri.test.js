const test = require("ava")
const pgknexlove = require("../")

test("be able to connect with a URI connection string", async (t) => {
  process.env.PG_URI = "postgres://postgres@localhost:5432/postgres"

  const getDB = pgknexlove({
    migrationFile: require.resolve("./migrate.sql"),
  })

  const db = await getDB({ migrate: true, testMode: true })

  const [id] = await db("person").insert({ name: "jerry" }).returning("id")

  t.is(id, 1)

  const jerry = await db("person").first()

  t.is(jerry.name, "jerry")

  await db.destroy()
})

test("be able to return a pg connection string", async (t) => {
  const dbString = pgknexlove.default.getConnectionString()

  t.is(dbString, "postgresql://postgres:@localhost:5432/postgres")
})
