/**
 * Converts database into types similar to kanel.js
 *
 * There are a couple different types of files.
 *
 * Each schema has a subdirectory.
 *
 **/

import { DatabaseTree } from "types"
import { Project, ModuleDeclarationKind } from "ts-morph"
import snakeToPascal from "snake-to-pascal"
import sqlToTsType from "sql-to-ts-type"
import prettier from "prettier"

interface TreeToTypescriptOptions {
  primarySchemaName?: string
  injectedTypesDirectory?: string
}

export const treeToTypescriptModels = (
  db: DatabaseTree,
  {
    primarySchemaName = "public",
    injectedTypesDirectory = "injected-types",
  }: TreeToTypescriptOptions = {}
): { [filePath: string]: string } => {
  const project = new Project({
    useInMemoryFileSystem: true,
  })

  project.addSourceFilesAtPaths("**/*ts")
  const indexFile = project.createSourceFile("index.ts", "")
  indexFile.addImportDeclaration({
    moduleSpecifier: "./knex",
  })
  const isPrimarySchemaNameValid = Object.keys(db.schemas).includes(
    primarySchemaName
  )

  if (isPrimarySchemaNameValid) {
    indexFile.addExportDeclaration({
      moduleSpecifier: `./${primarySchemaName}`,
    })
  }

  for (const [schemaName, schema] of Object.entries(db.schemas)) {
    if (Object.keys(schema.tables).length === 0) continue

    indexFile.addExportDeclaration({
      moduleSpecifier: `./${schemaName}`,
      namespaceExport: schemaName !== "public" ? schemaName : "public_",
    })
  }

  const knexFile = project.createSourceFile("knex.ts", "")
  const prefixedKnexFileImportAliases = []

  for (const schema of Object.values(db.schemas)) {
    const schemaName = schema.name

    if (Object.keys(schema.tables).length === 0) continue

    project.createSourceFile(`${schemaName}`, "")
    const schemaIndexFile = project.createSourceFile(
      `${schemaName}/index.ts`,
      ""
    )

    const modelTypeMapName = "ModelTypeMap"
    const InitializerTypeMapName = "InitializerTypeMap"
    const modelTypeMapDeclaration = schemaIndexFile.addInterface({
      name: modelTypeMapName,
    })
    const initializermodelTypeMapDeclaration = schemaIndexFile.addInterface({
      name: InitializerTypeMapName,
    })
    const schemaIndexFileExportDeclaration =
      schemaIndexFile.addExportDeclaration({
        isTypeOnly: true,
        namedExports: [modelTypeMapName, InitializerTypeMapName],
      })

    const knexFileImportAlias = snakeToPascal(schemaName) + modelTypeMapName
    const prefixedKnexFileImportAlias = `Prefixed${knexFileImportAlias}`
    prefixedKnexFileImportAliases.push(prefixedKnexFileImportAlias)

    const knexFileExportDeclaration = knexFile.insertImportDeclaration(0, {
      moduleSpecifier: `./${schemaName}`,
    })
    knexFileExportDeclaration.addNamedImport({
      name: modelTypeMapName,
      alias: knexFileImportAlias,
    })

    knexFile.addTypeAlias({
      name: prefixedKnexFileImportAlias,
      type: `{\n[K in keyof ${knexFileImportAlias} as \`${schemaName}.\${K}\`]: ${knexFileImportAlias}[K]\n}`,
    })

    for (const [tableName, tableData] of Object.entries(schema.tables)) {
      const pascaledTableName = snakeToPascal(tableName)
      const initializerName = `${pascaledTableName}Initializer`
      const tableFile = project.createSourceFile(
        `${schemaName}/${pascaledTableName}.ts`,
        ""
      )

      for (const column of tableData.columns) {
        if (column.name.endsWith("_id")) {
          const columnTypeName = snakeToPascal(column.name)
          tableFile.addTypeAlias({
            name: columnTypeName,
            type: "string",
            isExported: true,
          })
        }
      }

      const tableInterfaceDeclaration = tableFile.addInterface({
        name: pascaledTableName,
        isDefaultExport: true,
      })

      const tableInterfaceInitializerDeclaration = tableFile.addInterface({
        name: initializerName,
        isExported: true,
      })

      for (const column of tableData.columns) {
        const propertyCanBeNull = !column.query.includes("NOT NULL")
        const propertyHasDefaultValue = column.query.includes("DEFAULT")
        const isPropertyOptional = propertyHasDefaultValue || propertyCanBeNull
        let tsType = sqlToTsType(column.type, propertyCanBeNull)

        if (column.name.endsWith("_id")) tsType = snakeToPascal(column.name)

        const injectedTypeComment = column.comments.find((comment) =>
          comment.comment.includes("@type:")
        )
        if (injectedTypeComment) {
          const typeToInject = injectedTypeComment.comment
            .split("@type:")[1]
            .trim()
          tsType = typeToInject
          tableFile.insertImportDeclaration(0, {
            moduleSpecifier: `${injectedTypesDirectory}/${typeToInject}`,
            defaultImport: typeToInject,
          })
        }

        tableInterfaceDeclaration.addProperty({
          name: column.name,
          type: tsType,
        })

        tableInterfaceInitializerDeclaration.addProperty({
          name: column.name,
          type: tsType,
          hasQuestionToken: isPropertyOptional,
        })
      }

      const interfaceImportDeclaration = schemaIndexFile.addImportDeclaration({
        moduleSpecifier: `./${pascaledTableName}`,
        defaultImport: pascaledTableName,
      })
      interfaceImportDeclaration.addNamedImport({
        name: initializerName,
      })
      modelTypeMapDeclaration.addProperty({
        name: tableName,
        type: pascaledTableName,
      })

      initializermodelTypeMapDeclaration.addProperty({
        name: tableName,
        type: initializerName,
      })
      schemaIndexFileExportDeclaration.addNamedExports([
        pascaledTableName,
        initializerName,
      ])

      tableFile.saveSync()
    }
    schemaIndexFile.saveSync()
  }

  const moduleDeclaration = knexFile.addModule({
    name: '"knex/types/tables"',
    hasDeclareKeyword: true,
    declarationKind: ModuleDeclarationKind.Module,
  })

  moduleDeclaration.addInterface({
    name: "Tables",
    extends: isPrimarySchemaNameValid
      ? [snakeToPascal(primarySchemaName) + "ModelTypeMap"]
      : ["PublicModelTypeMap"],
  })
  const addInterfaceTemplates = prefixedKnexFileImportAliases.map((alias) => ({
    name: "Tables",
    extends: alias,
  }))
  moduleDeclaration.addInterfaces(addInterfaceTemplates)

  indexFile.saveSync()
  knexFile.saveSync()

  const filePaths = project.getFileSystem().globSync(["**/*.ts"])

  const fsObj = {}

  for (const filePath of filePaths) {
    fsObj[`.${filePath}`] = prettier.format(
      project.getFileSystem().readFileSync(filePath),
      {
        semi: false,
        parser: "typescript",
      }
    )
  }

  return fsObj
}

export default treeToTypescriptModels
