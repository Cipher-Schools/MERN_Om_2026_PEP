import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connected');
    } catch(err) {
        console.log('Error is: ',err);
        console.log('Database Connection failed');
    }
}
