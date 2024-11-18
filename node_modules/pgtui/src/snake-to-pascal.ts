import { camelCase } from "lodash"

export const snakeToPascal = (string: string): string => {
  const camelCased = camelCase(string)

  return camelCased[0].toUpperCase() + camelCased.slice(1)
}

export default snakeToPascal
