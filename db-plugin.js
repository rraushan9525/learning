import pg from "pg"
import  dotenv from "dotenv"

dotenv.config()
let pool = null

const poolError = (err) => {
    console.log("dbPool creation failed...")
    console.log(err)
}
const poolConnect = () => {
    console.log("Connected to db...")
}
export const getClient = () => {
    if(!pool) {
        console.log("Creating dbPool...")
        pool = new pg.Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DB,
            password: process.env.PG_PASSWORD,
            port: process.env.PG_PORT,
        })
        pool.on("error", poolError)
        pool.on("connect", poolConnect)
    }
    return pool
}
export const stopClient = async() => {
    console.log("Ending dbPool...")
    if(!pool) return

    await pool.end()
    pool = null
}
export const databasePlugin = {
    name: "database",
    version: "1.0.0",
    register: async(server) => {
        console.log("Registering databasePlugin...")

        server.decorate("server", "databaseManager", getClient)

        server.ext("onPreStop", async () => {
            await stopClient()
        })
    }
}