import Hapi from "@hapi/hapi"
import express from "express"
import dotenv from "dotenv"
import { routes } from "./routes/plugin.js"
import { databasePlugin } from "./database/plugin.js"
import { blobStoragePlugin } from "./storage/plugin.js"
import { consume } from "./rabbitMq/consumer-producer.js"
dotenv.config()

const app = express()
const host = process.env.HOST
const port = process.env.PORT

// app.get("/api/contacts", (req, res) => {
//     // res.send("Test")
//     res.json({message: "Test"})
// })

// app.listen(port, host, () => {
//     console.log(`Server running on port: ${port}, host: ${host}`)
// })

const server = Hapi.server({
    host,
    port
})

// server.route({
//     method: "GET",
//     path: "/api/contacts",
//     handler: (request, h) => {
//         return {message: "Test"}
//     }
// })

// await server.start()
// console.log(`Server running on port: ${port}, host: ${host}`)

await server.register([blobStoragePlugin, databasePlugin, routes])
await server.start()
console.log(`Server running on port: ${port}, host: ${host}`)
consume()
