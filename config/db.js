import mongoose from "mongoose";

export const connectDB = async() => {{
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected Successfully' , mongoose.connection.host);
    })
    .catch((err) => {
        console.log('Database Connection Failed' , err);
    })
}}