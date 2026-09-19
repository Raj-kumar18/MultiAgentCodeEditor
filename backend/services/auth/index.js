import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./src/config/db.js"
import authRouter from "./src/routes/auth.routes.js"
dotenv.config()

const port = process.env.PORT || 8000

const app = express()

app.use(express.json())

app.use("/", authRouter)





app.listen(port, () => {
    ConnectDB()
    console.log("Auth is started at", port)
})