import test from "ava"
import pgknexlove from "pgknexlove"
import loadStructureSQL from "load-structure-sql"

test("loadStructureSQL", async (t) => {
  const db = await pgknexlove.default({ testMode: true })
  await db.raw(`
    CREATE TABLE users (
      id serial PRIMARY KEY,
      name text NOT NULL
    );
  `)
  const structureSQL = await loadStructureSQL((db as any).connection)

  t.truthy(structureSQL.includes("CREATE TABLE public.users ("))
  t.truthy(structureSQL.includes("id integer NOT NULL,"))
})
