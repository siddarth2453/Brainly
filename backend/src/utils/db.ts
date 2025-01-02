import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()


export async function connectDb() {
    try {
        //connect to database

        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        const connection = await mongoose.connect(mongoUri);
        mongoose.set('strictPopulate', false);
         if(connection) {
            console.log('Database connected succesfully.');
         }


    } catch (error) {
        console.log("Error connecting Database serverside.")
    }
}