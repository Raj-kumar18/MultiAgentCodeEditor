import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import proxy from "express-http-proxy"
import { protect } from "./src/middlewares/protect.js"
import { getCurrentUser } from "./src/controller/user.controller.js"
import { proxyWithHeaders } from "./src/utils/proxyWithHeaders.js"

const port = process.env.PORT || 8000

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


app.use(cookieParser())
app.use(morgan("dev"))



app.use("/api/auth", proxy(process.env.AUTH_SERVICE))
app.use("/api/project", protect, proxyWithHeaders(process.env.PROJECT_SERVICE))



app.get("/api/me", protect, getCurrentUser)
app.get("/", (req, res) => {
    res.json({
        "message": "Hello from Gateway"
    })
})

app.listen(port, () => {
    console.log("gateway is started at", port)
})