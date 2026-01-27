import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()

const dbUrl = process.env.DB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl)
        console.log('Mongodb connected')
    } catch (error) {
        console.log("Error connecting db ", error)
        process.exit(1)
    }
}

export default connectDB