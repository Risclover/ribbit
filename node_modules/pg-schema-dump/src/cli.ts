#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { dumpSql, dumpTree } from "./"

const dumpOptionsFn = (yargs) => {
  return yargs
    .option("host", {
      alias: "h",
      type: "string",
      description: "Host of the PostgreSQL server",
      default: "localhost",
    })
    .option("port", {
      alias: "p",
      type: "number",
      description: "Port of the PostgreSQL server",
      default: 5432,
    })
    .option("user", {
      alias: "U",
      type: "string",
      description: "Username for the PostgreSQL server",
      default: "postgres",
    })
    .option("password", {
      alias: "W",
      type: "string",
      description: "Password for the PostgreSQL server",
    })
    .option("database", {
      alias: "d",
      type: "string",
      description: "Database to dump",
    })
    .option("schemas", {
      alias: "s",
      type: "string",
      description: "Schemas to dump, comma-separated",
    })
}

yargs(hideBin(process.argv))
  .command(
    "dump",
    "Dumps a PostgreSQL database to a SQL file",
    dumpOptionsFn,
    async (argv: any) => {
      if (argv.host) process.env.POSTGRES_HOST = argv.host
      if (argv.port) process.env.POSTGRES_PORT = argv.port.toString()
      if (argv.user) process.env.POSTGRES_USER = argv.user
      if (argv.password) process.env.POSTGRES_PASSWORD = argv.password
      if (argv.database) process.env.POSTGRES_DATABASE = argv.database

      console.log(
        await dumpSql({
          schemas: argv.schemas ? argv.schemas.split(",") : ["public"],
        })
      )
    }
  )
  .command(
    "dump-tree target-dir",
    "Dumps a PostgreSQL database into a friendly directory structure suitable for code reviews",
    (yargs) =>
      dumpOptionsFn(
        yargs.positional("target-dir", {
          type: "string",
          description: "Target directory to dump tree to",
        })
      ),
    async (argv: any) => {
      if (argv.host) process.env.POSTGRES_HOST = argv.host
      if (argv.port) process.env.POSTGRES_PORT = argv.port.toString()
      if (argv.user) process.env.POSTGRES_USER = argv.user
      if (argv.password) process.env.POSTGRES_PASSWORD = argv.password
      if (argv.database) process.env.POSTGRES_DATABASE = argv.database

      await dumpTree({
        targetDir: argv["target-dir"],
        schemas: argv.schemas ? argv.schemas.split(",") : ["public"],
      })
    }
  )
  .help()
  .alias("help", "h")
  .parse()
