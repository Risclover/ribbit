import { getSchemaSQL } from "."
import { getTreeFromSQL } from "pgtui"

export const getTree = async ({
  defaultDatabase,
  schemas,
}: {
  defaultDatabase?: string
  schemas?: string[]
}) => {
  return getTreeFromSQL(await getSchemaSQL({ defaultDatabase, schemas }))
}
