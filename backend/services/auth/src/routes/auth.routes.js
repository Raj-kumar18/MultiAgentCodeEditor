import express from "express"
import { login } from "../controller/auth.controller.js"

const authRouter = express.Router()


authRouter.post("/login",login)

export default authRouter