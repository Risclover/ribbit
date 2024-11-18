import { Knex as KnexJS } from "knex"

export declare type Knex = KnexJS

type DatabaseGetter = {
  getConnectionInfo: (
    database?: string,
    user?: string
  ) => {
    host: string
    user: string
    port: number
    password: string
    database: string
    ssl: boolean
  }
  getConnectionString: (database?: string, user?: string) => string
  (params?: {
    seed?: boolean
    migrate?: boolean
    testMode?: boolean
    user?: string
  }): Promise<Knex>
}

type GetDatabaseGetter = {
  default: DatabaseGetter
  (params?: {
    migrationFile?: string
    seedFile?: string
    migrationSQL?: string
    seedSQL?: string
    pool?: { min: number; max: number }
    defaults?: any
  }): DatabaseGetter
}

export declare const getDatabaseGetter: GetDatabaseGetter
export declare const knex: Knex

export default getDatabaseGetter
