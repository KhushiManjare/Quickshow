// // // import mongoose from "mongoose";

// // // const connectDB = async () => {
// // //   try {
// // //     mongoose.connection.on("connected", () =>
// // //       console.log("Database connected")
// // //     );
// // //     await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`);
// // //   } catch (error) {
// // //     console.log(error.message);
// // //   }
// // // };

// // // export default connectDB;
// // import mongoose from "mongoose";

// // const connectDB = async () => {
// //   try {
// //     const uri = process.env.MONGO_URI;

// //     if (!uri) {
// //       throw new Error("MONGO_URI is missing");
// //     }

// //     await mongoose.connect(uri);

// //     console.log("MongoDB connected successfully");
// //   } catch (error) {
// //     console.error("MongoDB connection error:", error.message);
// //     process.exit(1);
// //   }
// // };

// // export default connectDB;
// import mongoose from "mongoose";

// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) return;

//   await mongoose.connect(process.env.MONGO_URI, {
//     dbName: "quickshow", // 🔥 FORCE SAME DB EVERYWHERE
//   });

//   isConnected = true;
//   console.log("✅ MongoDB connected to quickshow");
// };

// export default connectDB;
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB connected");
  return cached.conn;
};

export default connectDB;
