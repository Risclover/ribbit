import { getSchemaSQL } from "./"

export const dumpSql = async ({
  defaultDatabase,
  schemas,
}: {
  defaultDatabase?: string
  schemas?: string[]
}) => {
  // TODO format
  return await getSchemaSQL({
    defaultDatabase,
    schemas,
  })
}
