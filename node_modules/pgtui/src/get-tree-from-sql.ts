import { DatabaseTree, Table } from "./types/tree"
import { pg } from "./types"
import * as pgParser from "pgsql-parser"
import fs from "fs"
import path from "path"
import deparsePg from "./deparse-pg"

export const getTreeFromSQL = (
  content: string,
  opts: { ignoreErrors?: boolean } = {}
): DatabaseTree => {
  const statements: Array<pg.Statement> = pgParser
    .parse(content)
    .map((s) => s.RawStmt.stmt)

  const db: DatabaseTree = {
    schemas: {},
    extensions: [],
    misc: [],
  }

  const unassignedSequences = []

  function createSchemaIfNotExists(schemaname: string) {
    if (!db.schemas[schemaname])
      db.schemas[schemaname] = {
        name: schemaname,
        tables: {},
        views: {},
        functions: {},
        domains: {},
        grants: [],
        _tablelessSequences: {},
        owner: "",
      }
  }

  function createTableIfNotExists(schemaname: string, tablename: string) {
    const schema = db.schemas[schemaname]
    if (!schema.tables[tablename])
      schema.tables[tablename] = {
        name: tablename,
        columns: [],
        indexes: {},
        triggers: {},
        grants: [],
        owner: "",
        sequences: [],
        query: "",
        policies: {},
        rules: {},
        alterations: [],
      }
  }

  function findSequence(schemaname: string, sequencename: string) {
    const schema = db.schemas[schemaname]
    if (schema._tablelessSequences[sequencename])
      return schema._tablelessSequences[sequencename]
    for (const tableName in schema.tables) {
      const table = schema.tables[tableName]
      const seq = table.sequences.find((s) => s.name === sequencename)
      if (seq) return seq
    }
    throw new Error(`Couldn't find sequence: ${schemaname}.${sequencename}`)
  }

  for (const stmt of statements) {
    try {
      if ("CreateSchemaStmt" in stmt) {
        createSchemaIfNotExists(stmt.CreateSchemaStmt.schemaname)
        continue
      }

      if ("AlterOwnerStmt" in stmt) {
        const { objectType, object, newowner } = stmt.AlterOwnerStmt
        const targets = (object as any).List
          ? (object as any).List.items.map((item) => deparsePg(item))
          : [deparsePg(object)]

        const targetName = targets[0]
        if (objectType === "OBJECT_SCHEMA") {
          createSchemaIfNotExists(targetName)
          db.schemas[targetName].owner = newowner.rolename
        } else if (objectType === "OBJECT_FUNCTION") {
          const [schemaname, funcname_raw] = targetName.split(".")
          const funcname = funcname_raw.split("(")[0].trim()
          db.schemas[schemaname].functions[funcname].owner = newowner.rolename
        } else if (objectType === "OBJECT_DOMAIN") {
          if (targetName.includes("\n")) {
            const [schema, domainname] = targetName
              .split("\n")
              .map((t) => t.trim())
              .filter((t) => t.length > 0)
            db.schemas[schema].domains[domainname].owner = newowner.rolename
          } else {
            const schema = targetName
            const domainname = targets[1]

            db.schemas[schema].domains[domainname].owner = newowner.rolename
          }
        } else {
          throw new Error(
            `Unsupported object type in AlterOwnerStmt: ${objectType}`
          )
        }
        continue
      }

      if ("AlterSeqStmt" in stmt) {
        const { sequence, options } = stmt.AlterSeqStmt
        const ownedByDef = options.find((o) => o.DefElem.defname === "owned_by")
        if (!ownedByDef)
          throw new Error(
            "Only ownernership change alter sequences are implemented"
          )
        const newowner =
          "List" in ownedByDef.DefElem.arg
            ? ownedByDef.DefElem.arg.List.items.map(deparsePg).join(".")
            : deparsePg(ownedByDef.DefElem.arg)

        const seq = findSequence(sequence.schemaname, sequence.relname)

        if (seq.owner)
          throw new Error(
            "Sequence owner has been set more than once (not implemented)"
          )

        seq.owner = newowner

        delete db.schemas[sequence.schemaname]._tablelessSequences[
          sequence.relname
        ]

        const [, ownerTableName] = newowner.split(".")

        db.schemas[sequence.schemaname].tables[ownerTableName].sequences.push(
          seq
        )

        continue
      }

      if ("CreateStmt" in stmt) {
        const { schemaname, relname } = stmt.CreateStmt.relation
        const table: Table = {
          name: relname,
          columns: stmt.CreateStmt.tableElts
            .filter((a) => "ColumnDef" in a)
            .map((a) => {
              const { colname, typeName } = a.ColumnDef
              let type = typeName.names.map(deparsePg).pop() as string
              if ((typeName as any).arrayBounds) {
                type += "[]"
              }
              // if (colname === "accepted_providers" || type === "text") {
              //   console.dir(a, { depth: null })
              // }
              return { name: colname, type, query: deparsePg(a), comments: [] }
            }),
          query: deparsePg(stmt),
          alterations: [],
          policies: {},
          triggers: {},
          rules: {},
          indexes: {},
          sequences: [],
          grants: [],
          owner: "",
        }
        createSchemaIfNotExists(schemaname)
        createTableIfNotExists(schemaname, relname)
        db.schemas[schemaname].tables[relname] = {
          ...db.schemas[schemaname].tables[relname],
          ...table,
        }
        continue
      }

      if ("CreateFunctionStmt" in stmt) {
        const {
          funcname: fullFuncName,
          returnType,
          options,
        } = stmt.CreateFunctionStmt
        const [schemaname, funcname] = deparsePg(fullFuncName)
          // TODO this replace may be due to a pgsql-parser bug, PR to fix it
          .replace("\n\n", ".")
          .split(".")
        createSchemaIfNotExists(schemaname)
        db.schemas[schemaname].functions[funcname] = {
          name: funcname,
          query: deparsePg(stmt),
          owner: "",
        }
        continue
      }

      if ("CreateTrigStmt" in stmt) {
        const {
          relation: { schemaname, relname },
          trigname,
          funcname,
          row,
          timing,
          events,
        } = stmt.CreateTrigStmt

        db.schemas[schemaname].tables[relname].triggers[trigname] = {
          name: trigname,
          functionName: deparsePg(funcname),
          query: deparsePg(stmt),
        }
        continue
      }

      if ("CreatePolicyStmt" in stmt) {
        const { policy_name, table, cmd_name, permissive, roles, qual } =
          stmt.CreatePolicyStmt

        db.schemas[table.schemaname].tables[table.relname].policies[
          policy_name
        ] = {
          name: policy_name,
          query: deparsePg(stmt),
        }

        continue
      }

      if ("ViewStmt" in stmt) {
        const { view, query } = stmt.ViewStmt
        createSchemaIfNotExists(view.schemaname)
        db.schemas[view.schemaname].views[view.relname] = {
          name: view.relname,
          columns: [],
          grants: [],
          triggers: {},
          alterations: [],
          query: deparsePg(query),
          owner: "",
        }
        continue
      }

      if ("CreateSeqStmt" in stmt) {
        const { schemaname, relname } = stmt.CreateSeqStmt.sequence
        createSchemaIfNotExists(schemaname)
        db.schemas[schemaname]._tablelessSequences[relname] = {
          name: relname,
          grants: [],
          alterations: [],
          owner: "",
          query: deparsePg(stmt),
        }
        continue
      }

      if ("AlterTableStmt" in stmt) {
        const { schemaname, relname } = stmt.AlterTableStmt.relation
        createSchemaIfNotExists(schemaname)
        createTableIfNotExists(schemaname, relname)

        const target =
          db.schemas[schemaname].tables[relname] ||
          db.schemas[schemaname].views[relname] ||
          db.schemas[schemaname]._tablelessSequences[relname]

        try {
          target.alterations.push({
            query: deparsePg(stmt),
          })
        } catch (error) {}

        continue
      }

      if ("GrantStmt" in stmt) {
        const { is_grant, targtype, objtype, objects, grantees } =
          stmt.GrantStmt
        const targetName = deparsePg(objects)
        if (objtype === "OBJECT_SCHEMA") {
          db.schemas[targetName]?.grants.push({
            query: deparsePg(stmt),
          })
        } else if (objtype === "OBJECT_TABLE") {
          const [schemaname, tablename] = targetName.split(".")
          const target =
            db.schemas[schemaname]?.tables[tablename] ??
            db.schemas[schemaname]?.views[tablename]

          target?.grants.push({
            query: deparsePg(stmt),
          })
        } else if (objtype === "OBJECT_SEQUENCE") {
          const [schemaname, seqname] = targetName.split(".")
          findSequence(schemaname, seqname).grants.push({
            query: deparsePg(stmt),
          })
        } else {
          throw new Error(`Unhandled objtype in GrantStmt: "${objtype}"`)
        }
        continue
      }

      if ("CreateExtensionStmt" in stmt) {
        db.extensions.push({
          query: deparsePg(stmt),
          name: stmt.CreateExtensionStmt.extname,
        })
        continue
      }

      if ("IndexStmt" in stmt) {
        const { idxname, relation } = stmt.IndexStmt
        db.schemas[relation.schemaname].tables[relation.relname].indexes[
          idxname
        ] = {
          name: idxname,
          query: deparsePg(stmt),
        }
        continue
      }

      if (
        "VariableSetStmt" in stmt ||
        "SelectStmt" in stmt ||
        "CompositeTypeStmt" in stmt
      ) {
        db.misc.push({ query: deparsePg(stmt) })
        continue
      }

      if ("CommentStmt" in stmt) {
        if ((stmt.CommentStmt.objtype as string) === "OBJECT_COLUMN") {
          try {
            const [schema, table, columnName] = (
              stmt as any
            ).CommentStmt.object.List.items.map((item) => item.String.str)
            const column = db.schemas[schema].tables[table].columns.find(
              (col) => col.name === columnName
            )
            column.comments.push({
              comment: stmt.CommentStmt.comment,
              query: deparsePg(stmt),
            })
          } catch (e) {
            db.misc.push({ query: deparsePg(stmt) })
          }
        } else {
          db.misc.push({ query: deparsePg(stmt) })
        }
        continue
      }

      if ("CreateDomainStmt" in stmt) {
        const [schemaname, domainname] = deparsePg(
          stmt.CreateDomainStmt.domainname
        )
          // TODO this replace may be due to a pgsql-parser bug, PR to fix it
          .replace("\n\n", ".")
          .split(".")

        if (typeof domainname === "undefined") {
          continue
        }

        createSchemaIfNotExists(schemaname)
        db.schemas[schemaname].domains[domainname] = {
          name: domainname,
          type: deparsePg(stmt.CreateDomainStmt.typeName.names),
          owner: "",
        }

        continue
      }

      if ("RuleStmt" in stmt) {
        const schemaname = stmt.RuleStmt.relation.schemaname
        const relname = stmt.RuleStmt.relation.relname

        createSchemaIfNotExists(schemaname)
        createTableIfNotExists(schemaname, relname)

        db.schemas[schemaname].tables[relname].rules[stmt.RuleStmt.rulename] = {
          name: stmt.RuleStmt.rulename,
          query: deparsePg(stmt),
        }

        continue
      }

      throw new Error(`Unhandled stmt: "${Object.keys(stmt)[0]}"`)
    } catch (e) {
      if (!opts.ignoreErrors) {
        throw e
      }
      console.log(e.toString())
    }
  }

  return db
}

export default getTreeFromSQL
