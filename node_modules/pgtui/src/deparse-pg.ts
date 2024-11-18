import * as pgParser from "pgsql-parser"
import { pg } from "./types/pg"

export const deparsePg = (exp: pg.Statement | pg.Expression) => {
  if ("DefElem" in exp) {
    if (exp.DefElem.defname === "owned_by") {
      return `OWNED BY ${
        "List" in exp.DefElem.arg
          ? exp.DefElem.arg.List.items.map(deparsePg).join(".")
          : deparsePg(exp.DefElem.arg)
      }`
    } else {
      throw new Error(`Unsupported DefElem: ${JSON.stringify(exp)}`)
    }
  }
  if ("String" in exp) {
    return exp.String.str
  }
  if ("AlterSeqStmt" in exp) {
    const { sequence, options } = exp.AlterSeqStmt
    console.log({
      // sequence: deparsePg(sequence),
      sequence: ``,
      options: options.map(deparsePg),
    })
    return `ALTER SEQUENCE ${sequence.schemaname}.${sequence.relname} ${options
      .map(deparsePg)
      .join(" ")}`
  }
  return pgParser.deparse(exp)
}

export default deparsePg
