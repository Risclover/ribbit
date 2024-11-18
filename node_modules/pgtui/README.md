# pgtui - Readable pg_dump and Terminal Interface for Postgres

pgtui is a command line interface for viewing a postgres schema or outputing a readable directory representation of a postgres schema

## Installation

You can install pgtui globally like so:

`npm install -g pgtui`

but `pgtui` can also be added as a script to your `package.json` to help
developers more easily preview your database...

```
npm install --save-dev pgtui
```

```javascript
{
  "name": "my-package",
  // ...
  "scripts": {
    // ...
    "db:view": "pgtui",
    "db:dump": "pgtui --dump-to-dir ./db/structure",
  }
}
```

## CLI Usage

```bash
pgtui <command>

Commands:
  pgtui dump-to-dir             Dump database structure into directory
  pgtui dump-typescript-models  Dump typescript models for db into directory

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --host      Postgres Host
  --password  Postgres Password
  --user      Postgres User
  --port      Postgres Port
  --database  Postgres Database
```

## Docker Usage

When run in docker, if a host is not provided the docker container will attempt
to find the IP address of the host within docker and use it instead of localhost.

For a mac computer this is `host.docker.internal`, on linux it's `172.17.0.1`
by default.

### Dumping Database structure

To dump database structure you need to mount a volume on the host machine.

```bash
docker run -it -u "$(id -u):$(id -g)" -v $(pwd)/dump:/dump seveibar/pgtui dump-to-dir /dump
```

## Tips

I'd also recommend adding `npm run db:dump` as a step after your migration, that way anyone reviewing a migration can see the change in the database structure!

> Looking for a good node migration framework? Try [node-pg-migrate](https://github.com/salsita/node-pg-migrate)
