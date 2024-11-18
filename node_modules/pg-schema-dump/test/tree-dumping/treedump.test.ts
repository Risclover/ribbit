import test from "ava"
import fs from "fs"
import os from "os"
import child_process from "child_process"
import path from "path"
import { getTestPostgresDatabaseFactory } from "ava-postgres"
import { Client } from "pg"
import { dumpTree } from "../../src"
import example1Sql from "../example1/example1.sql"

let testDir: string

test.beforeEach(() => {
  // create a temporary directory representing the filesystem
  testDir = fs.mkdtempSync(path.join(os.tmpdir(), "test-"))
})

test.afterEach(() => {
  // clean up the test directory
  // fs.rm(testDir, { recursive: true }, () => {})
})

const getTestDatabase = getTestPostgresDatabaseFactory({
  postgresVersion: "14",
})

test("dump an example schema to a test directory", async (t) => {
  const { pool, connectionString } = await getTestDatabase()

  await pool.query(example1Sql)

  process.env.DATABASE_URL = connectionString
  await dumpTree({
    schemas: ["public", "api", "super_api"],
    targetDir: testDir,
  })

  t.truthy(
    fs.existsSync(
      path.join(testDir, "public", "tables", "account", "table.sql")
    )
  )
})
