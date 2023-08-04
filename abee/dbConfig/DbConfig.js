import mongoose from "mongoose"
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('db connected');
  } catch (error) {
    console.log(error);
  }
}