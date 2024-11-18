import fs from "fs/promises"
import test from "ava"
import pgknexlove from "pgknexlove"
import getTreeFromSQL from "get-tree-from-sql"
import loadStructureSQL from "load-structure-sql"
import getSQLFromTree from "get-sql-from-tree"

test("check that structure is identical if sql created from tree is dumped from db", async (t) => {
  const initialSQL = (await fs.readFile("./tests/structure.sql")).toString()
  const db1 = await pgknexlove.default({ testMode: true })
  await db1.raw(initialSQL)
  const sql1 = await loadStructureSQL()
  await db1.destroy()

  const dbTree = getTreeFromSQL(sql1)
  t.truthy(dbTree.schemas)
  // TODO check for other things, it looks like this:
  /*
  {
    schemas: {
      api: {
        name: 'api',
        tables: {},
        views: [Object],
        functions: {},
        grants: [],
        _tablelessSequences: {},
        owner: 'api_user'
      },
      super_api: {
        name: 'super_api',
        tables: {},
        views: [Object],
        functions: {},
        grants: [Array],
        _tablelessSequences: {},
        owner: 'postgres'
      },
      public: {
        name: 'public',
        tables: [Object],
        views: {},
        functions: [Object],
        grants: [Array],
        _tablelessSequences: {},
        owner: ''
      }
    },
    extensions: [
      {
        query: 'CREATE EXTENSION IF NOT EXISTS pgcrypto',
        name: 'pgcrypto'
      }
    ],
    misc: [
      { query: 'SET statement_timeout = 0' },
      { query: 'SET lock_timeout = 0' },
      { query: 'SET idle_in_transaction_session_timeout = 0' },
      { query: "SET client_encoding = 'UTF8'" },
      { query: "SET standard_conforming_strings = 'on'" },
      { query: "SELECT pg_catalog.set_config('search_path', '', FALSE)" },
      { query: "SET check_function_bodies = 'false'" },
      { query: "SET xmloption = 'content'" },
      { query: "SET client_min_messages = 'warning'" },
      { query: "SET row_security = 'off'" },
      {
        query: "COMMENT ON EXTENSION pgcrypto IS E'cryptographic functions'"
      },
      { query: "SET default_tablespace = ''" },
      { query: "SET default_table_access_method = 'heap'" }
    ]
  }
  */
})
