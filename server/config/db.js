import mongoose from "mongoose";

const uri = `${process.env.MONGODB_URI}`;

export const connectDB = async () => {
	await mongoose.connect(uri).then(() => console.log("DB Connected"));
};
