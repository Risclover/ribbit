const avaTest = require("ava")
const pgknexlove = require("../")

const test = process.env.DIGITALOCEAN_PG_URI ? avaTest : avaTest.skip

test("be able to connect to a digital ocean instance", async (t) => {
  process.env.PG_URI = process.env.DIGITALOCEAN_PG_URI
  process.env.USE_TEST_DB = ""

  const getDB = pgknexlove({})

  const db = await getDB()

  const res = await db.select(db.raw("1")).first()

  t.truthy(res)

  await db.destroy()
})
