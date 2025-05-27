import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const connectionInstace = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n Mongo DB connected ${connectionInstace.connection.host}`);
    }
    catch (error) {
        console.log("MONGO Connection error", error)
        process.exit(1);
    }
}

export default connectDB