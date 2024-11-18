import execa from "execa"
import pgknexlove from "pgknexlove"
import getDockerHost from "docker-host-ip"

export const loadStructureSQL = async (connectionInfo?: any) => {
  let { host, port, user, password, database } = {
    ...pgknexlove.default.getConnectionInfo(),
    ...connectionInfo,
  } as any

  if (
    process.env.RUNNING_IN_DOCKER &&
    !process.env.POSTGRES_HOST &&
    !process.env.DATABASE_URL
  ) {
    host = await new Promise((resolve, reject) => {
      getDockerHost((err, ip) => {
        if (err) return reject(err)
        resolve(ip)
      })
    })
    console.log(
      `Detected we're in docker and no host has been set, using automatically detected host "${host}". Manually set POSTGRES_HOST or DATABASE_URL to prevent default from being overridden.`
    )
  }

  const result = await execa(
    "pg_dump",
    ["-h", host, "-p", port, "-U", user, "-s", database].map((a) =>
      a.toString()
    )
  )

  return result.stdout
}

export default loadStructureSQL
