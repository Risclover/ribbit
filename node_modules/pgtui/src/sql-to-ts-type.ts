export const sqlToTsType = (type: string, canBeNull: boolean): string => {
  let tsType = null
  const typeWithoutArray = type.replace(/\[\]$/, "")
  const isTypeArray = type.endsWith("[]")

  switch (typeWithoutArray) {
    case "text":
    case "uuid":
    case "varchar":
      tsType = "string"
      break

    case "int4":
    case "int":
      tsType = "number"
      break

    case "jsonb":
      tsType = "any"
      break

    case "timestamptz":
    case "timestamp":
      tsType = "Date"
      break

    case "bool":
    case "boolean":
      tsType = "boolean"
      break

    default:
      tsType = "any"
      break
  }

  if (isTypeArray) {
    tsType += "[]"
  }

  if (tsType === "any") {
    return tsType
  }

  return canBeNull ? `${tsType} | null` : tsType
}

export default sqlToTsType
