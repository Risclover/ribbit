import mkdirp from "mkdirp"
import fs from "fs/promises"
import path from "path"

export const dirStructureToFs = async ({
  outputDir,
  dirStructure,
  header,
}: {
  outputDir: string
  dirStructure: { [filePath: string]: string }
  header?: string
}) => {
  for (const filePath in dirStructure) {
    const fullFilePath = path.resolve(outputDir, filePath)
    await mkdirp(path.dirname(fullFilePath))
    await fs.writeFile(
      fullFilePath,
      (header ? `-- ${header}\n\n` : "") + dirStructure[filePath]
    )
  }
}
