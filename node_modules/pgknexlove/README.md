# pgknexlove

[![pgknexlove npm](https://badge.fury.io/js/pgknexlove.svg)](https://www.npmjs.com/package/pgknexlove)

Don't you love postgres + knex? Now love it even more with an easy way to create
temporary databases for unit tests, automatic singleton, an initial connection test,
and standard environment variables defaults (POSTGRES_HOST, etc.).

## Usage

```bash
# Installation
npm install pgknexlove
```

```javascript
const pgknexlove = require("pgknexlove")

module.exports = async (req, res) => {
  const db = await pgknexlove.default()

  const myUsers = await db("users").select("first_name")

  res.send(
    "Here's a random user's name:" +
      myUsers[Math.floor(Math.random() * myUsers.length)].first_name
  )
}
```

## Setting Defaults

```ts
import pgknexlove from "pgknexlove"

const getDB = pgknexlove({
  defaults: { database: "products" },
})

async function main() {
  const db = await getDB()

  const myProducts = await db("product").select("name")
}
```

## Usage in Unit Tests

`testMode: true` creates a temporary database. This allows you to run database
tests in parallel.

```javascript
const getDB = require("pgknexlove")({
  // Your migration file will automatically be run on the test database (optional)
  migrationFile: require.resolve("./migrate.sql"),

  // A file that will seed the database, great for quick testing (optional)
  seedFile: require.resolve("./seed.sql"),
})

test("some test that uses the database", async (t) => {
  const db = await getDB({ testMode: true, migrate: true, seed: true })

  // a test database was created and migrate with a random name, do whatever you
  // want!
  await db("user").del()

  // ... test creating users with endpoints or whatever
})
```

## getConnectionInfo & getConnectionString

You can use these methods to compute what database should be used from the
environment and/or your defaults.

> NOTE: The defaults are overridden by the environment. The environment can
> be overriden by arguments passed into the `GetDatabase` function (e.g.
> `pgknexlove.default` or what's returned by `pgknexlove()`)

```ts
import pgknexlove from "pgknexlove"

pgknexlove.default.getConnectionInfo()
// { host: "localhost", "password": "", port: 5432, database: "postgres", user: "postgres" }

pgknexlove.default.getConnectionString()
// postgresql://postgres:@localhost:5432/postgres

let modifiedConn = pgknexlove({
  defaults: { database: "myproduct" },
}).getConnectionInfo()
// { host: "localhost", "password": "", port: 5432, database: "myproduct", user: "postgres" }
```

## Environment Variables

The following environment variables are used (basically standard postgres env variables)

| Var Name                         | Description                     |
| -------------------------------- | ------------------------------- |
| POSTGRES_HOST                    | Postgres Host                   |
| POSTGRES_PASS, POSTGRES_PASSWORD | Postgres Password               |
| POSTGRES_DATABASE, POSTGRES_DB   | Postgres Database               |
| POSTGRES_USER, POSTGRES_USERNAME | Postgres User                   |
| POSTGRES_PORT                    | Postgres Port                   |
| POSTGRES_URI, POSTGRES_URL       | Postgres URI `postgresql://...` |
| POSTGRES_SSL                     | If set, true                    |
| USE_TEST_DB                      | `testMode` will default to true |

## Viewing Debug Logs

Set `DEBUG=pgknexlove` to see debug logs.
