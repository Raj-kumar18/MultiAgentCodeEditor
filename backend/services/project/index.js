import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./src/config/db.js"
dotenv.config()

const port = process.env.PORT || 8002

const app = express()

app.use(express.json())






app.listen(port, () => {
    ConnectDB()
    console.log("Project is started at", port)
})