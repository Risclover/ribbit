import fs from "fs/promises"
import test from "ava"
import pgknexlove from "pgknexlove"
import getTreeFromSQL from "get-tree-from-sql"
import loadStructureSQL from "load-structure-sql"
import getSQLFromTree from "get-sql-from-tree"
import treeToTypescriptModels from "tree-to-typescript-models"

test("check that structure is identical if sql created from tree is dumped from db", async (t) => {
  const initialSQL = (await fs.readFile("./tests/structure.sql")).toString()
  const db1 = await pgknexlove.default({ testMode: true })
  await db1.raw(initialSQL)
  const sql1 = await loadStructureSQL()
  await db1.destroy()

  const dbTree = getTreeFromSQL(sql1)
  const typescriptFS = await treeToTypescriptModels(dbTree)
  t.truthy(typescriptFS)
})
