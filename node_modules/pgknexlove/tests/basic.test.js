const test = require("ava")
const getDB = require("../")({
  migrationFile: require.resolve("./migrate.sql"),
})

test("should create an account", async (t) => {
  const db = await getDB({ migrate: true, testMode: true })

  const [id] = await db("person").insert({ name: "jerry" }).returning("id")

  t.assert(id === 1)

  const jerry = await db("person").first()

  t.assert(jerry.name === "jerry")

  await db.destroy()
})
