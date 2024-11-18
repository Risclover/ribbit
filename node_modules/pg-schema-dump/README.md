# Node PG Schema Dump

This is an alternative to `pg_dump` written in node. You can use this to get
all the SQL to recreate a schema.

![](https://user-images.githubusercontent.com/1910070/257036161-8a17dc4a-1457-4756-9ad3-52bce0445392.gif)

## Installation

`npm add -D pg-schema-dump`

## Usage

### `schema.sql` dumping

```bash
# By default, pg-dump knows POSTGRES_HOST, DATABASE_URL, etc.
pg-schema-dump dump

# Dump schema.sql to stdout for public schema on default database "postgres"
pg-schema-dump dump -h localhost -U postgres

# With postgres URL
pg-schema-dump dump psql://user:1234@localhost:5432/my_db
```

### Tree Dumping

"Tree Dumps" are great for code reviews. They use a directory structure to
easily diff database changes. For example, a table definition goes into a file
in `<schema>/<table>/table.sql`. This makes it easy to find and examine different
parts of your database in a structured way.

```bash
pg-schema-dump dump-tree /path/to/dir

# You can use the same environment variables or specify the host etc.
pg-schema-dump dump-tree -h localhost -U postgres /path/to/dir
```

### As a Library

```ts
import { getSchemaSQL, getTree } from "pg-schema-dump"

// Uses environment variables, DATABASE_URL etc.
await getSchemaSQL({
  schemas: ["public"],
})

await getTree({
  schemas: ["public"],
})
```
