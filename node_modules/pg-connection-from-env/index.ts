import { parse as parsePg } from "pg-connection-string"

interface Options {
  /* If provided, overrides user */
  user?: string
  /* If provided, overrides database*/
  database?: string
  /* If provided, overrides process.env */
  env?: any
  /* fallback defaults are used when the environment doesn't have a value */
  fallbackDefaults?: {
    user?: string
    host?: string
    port?: number
    database?: string
    databaseName?: string
    password?: string
  }
}

export const getPgConnectionFromEnv = (opts: Options = {}) => {
  const {
    user,
    env = process.env,
    database,
    fallbackDefaults: defaults = {},
  } = opts

  const uri =
    env.POSTGRES_URI || env.PG_URI || env.DATABASE_URL || env.DATABASE_URI

  if (uri) {
    const uriObj = parsePg(uri)
    return {
      ...uriObj,
      database: database || uriObj.database,
      user: user || uriObj.user,
      ssl: uriObj.ssl
        ? { ...(uriObj as any).ssl, rejectUnauthorized: false }
        : false,
    }
  } else {
    return {
      host: env.POSTGRES_HOST || defaults.host || "localhost",
      user:
        user ||
        env.POSTGRES_USER ||
        env.POSTGRES_USERNAME ||
        defaults.user ||
        "postgres",
      port: env.POSTGRES_PORT || defaults.port || 5432,
      password:
        env.POSTGRES_PASS || env.POSTGRES_PASSWORD || defaults.password || "",
      database:
        database ||
        env.POSTGRES_DATABASE ||
        env.POSTGRES_DB ||
        defaults.database ||
        defaults.databaseName ||
        "postgres",
      // TODO more refined ssl handling
      ssl: env.POSTGRES_SSL ? { rejectUnauthorized: false } : false,
    }
  }
}

export const getConnectionStringFromEnv = (opts: Options = {}) => {
  const env = opts.env || process.env
  const uri =
    env.POSTGRES_URI || env.PG_URI || env.DATABASE_URL || env.DATABASE_URI

  const uriParams = (uri || "").split("?")?.[1] || ""

  const { host, password, port, database, user } = getPgConnectionFromEnv(opts)
  // TODO sslmode?
  return `postgresql://${user}:${password}@${host}:${port}/${database}${
    uriParams ? `?${uriParams}` : ""
  }`
}

export default getPgConnectionFromEnv
