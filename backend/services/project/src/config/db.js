import mongoose from "mongoose";


export async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Project DB Connected")

    } catch (error) {
        console.log("Project Database connection error", error)
    }
}