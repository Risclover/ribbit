import { treeToDirectory } from "pgtui"
import { getTree } from "./get-tree"

export const dumpTree = async ({
  defaultDatabase,
  schemas,
  targetDir,
}: {
  defaultDatabase?: string
  schemas?: string[]
  targetDir: string
}) => {
  const tree = await getTree({ defaultDatabase, schemas })

  await treeToDirectory(tree, targetDir)
}
