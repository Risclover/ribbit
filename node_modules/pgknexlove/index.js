// @flow

const knex = require("knex")
const fs = require("fs")
const { parse: parsePG } = require("pg-connection-string")
const debug = require("debug")("pgknexlove")

let singletonDB = null

const createDatabaseGetter = ({
  migrationFile,
  seedFile,
  migrationSQL = "",
  seedSQL = "",
  pool,
  defaults = {},
} = {}) => {
  if (migrationFile) {
    migrationSQL = fs.readFileSync(migrationFile).toString()
  }
  if (seedFile) {
    seedSQL = fs.readFileSync(seedFile).toString()
  }

  const getConnectionInfo = (database, user) => {
    if (singletonDB)
      return {
        ...singletonDB.connection,
        database: database || singletonDB.connection.database,
        user: user || singletonDB.connection.user,
      }
    const uri =
      process.env.POSTGRES_URI ||
      process.env.PG_URI ||
      process.env.DATABASE_URL ||
      process.env.DATABASE_URI

    if (uri) {
      const uriObj = parsePG(uri)
      return {
        ...uriObj,
        database: database || uriObj.database,
        user: user || uriObj.user,
        ssl: uriObj.ssl ? { ...uriObj.ssl, rejectUnauthorized: false } : false,
      }
    } else {
      return {
        host: process.env.POSTGRES_HOST || defaults.host || "localhost",
        user:
          user ||
          process.env.POSTGRES_USER ||
          process.env.POSTGRES_USERNAME ||
          defaults.user ||
          "postgres",
        port: process.env.POSTGRES_PORT || defaults.port || 5432,
        password:
          process.env.POSTGRES_PASS ||
          process.env.POSTGRES_PASSWORD ||
          defaults.password ||
          "",
        database:
          database ||
          process.env.POSTGRES_DATABASE ||
          process.env.POSTGRES_DB ||
          defaults.database ||
          defaults.databaseName ||
          "postgres",
        ssl: process.env.POSTGRES_SSL ? { rejectUnauthorized: false } : false,
      }
    }
  }

  const getConnectionString = (...args) => {
    const { host, password, port, database, user } = getConnectionInfo(...args)
    // TODO sslmode?
    return `postgresql://${user}:${password}@${host}:${port}/${database}`
  }

  const knexConfig = {
    client: "pg",
    pool,
  }

  const createDatabase = async (dbName) => {
    try {
      let conn = await knex({
        ...knexConfig,
        connection: getConnectionInfo("postgres"),
      })
      await conn.raw(`CREATE DATABASE ${dbName}`)
      await conn.destroy()
    } catch (e) {}
  }

  const deleteDatabase = async (dbName) => {
    try {
      let conn = await knex({
        ...knexConfig,
        connection: getConnectionInfo("postgres"),
      })
      await conn.raw(`DROP DATABASE ${dbName}`)
      await conn.destroy()
    } catch (e) {}
  }

  const getDB = async ({ seed, migrate, testMode, user } = {}) => {
    if (singletonDB && !testMode) return singletonDB

    testMode =
      testMode === undefined ? Boolean(process.env.USE_TEST_DB) : testMode

    const dbName = !testMode
      ? process.env.POSTGRES_DATABASE ||
        process.env.POSTGRES_DB ||
        defaults.database ||
        defaults.databaseName ||
        "postgres"
      : `testdb_${Math.random().toString(36).slice(7)}`

    if (testMode)
      debug(`\n---\nUsing Test DB: ${dbName}, User: ${user || "none"}\n---`)

    await createDatabase(dbName)

    const connection = getConnectionInfo(dbName)

    let pg = knex({
      ...knexConfig,
      connection,
    })

    // test connection
    try {
      await pg.raw("select 1+1 as result")
    } catch (e) {
      throw new Error("Could not connect to database\n\n" + e.toString())
    }

    // upload migration
    if (migrate) await pg.raw(migrationSQL)

    if (seed) await pg.raw(seedSQL)

    if (user) {
      await pg.destroy()
      pg = knex({
        ...knexConfig,
        connection: getConnectionInfo(dbName),
      })
      await pg.raw(`SET ROLE ${user};`)
      // test connection
      try {
        await pg.raw("select 1+1 as result")
      } catch (e) {
        throw new Error(
          `Could not connect to database as "${user}"\n\n${e.toString()}`
        )
      }
    }

    // override pg.destroy so we can delete the test database in test mode
    pg.destroyHooks = []

    const proxiedPg = new Proxy(pg, {
      get: (obj, prop) => {
        if (prop === "destroy") {
          return async () => {
            singletonDB = null
            for (const hook of obj.destroyHooks) {
              await hook()
            }
            await obj.destroy()
            if (testMode) await deleteDatabase(dbName)
          }
        } else if (prop === "connection") {
          return connection
        } else {
          return obj[prop]
        }
      },
    })

    if (!testMode) {
      singletonDB = proxiedPg
    }

    return proxiedPg
  }

  getDB.getConnectionInfo = getConnectionInfo
  getDB.getConnectionString = getConnectionString

  return getDB
}

module.exports = createDatabaseGetter
module.exports.default = createDatabaseGetter()
module.exports.knex = knex
