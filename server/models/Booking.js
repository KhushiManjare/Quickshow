// // // import mongoose from "mongoose";

// // // const bookingSchema = new mongoose.Schema(
// // //   {
// // //     user: { type: String, required: true, ref: "User" },
// // //     show: { type: String, required: true, ref: "Show" },
// // //     amount: { type: Number, required: true },
// // //     bookedSeats: { type: Array, required: true },
// // //     isPaid: { type: Boolean, default: false },
// // //     paymentLink: { type: String },
// // //   },
// // //   { timestamps: true }
// // // );

// // // const Booking = mongoose.model("Booking", bookingSchema);

// // // export default Booking;\
// // import mongoose from "mongoose";

// // const bookingSchema = new mongoose.Schema(
// //   {
// //     user: { type: String, required: true },
// //     show: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Show",
// //       required: true,
// //     },
// //     amount: { type: Number, required: true },
// //     bookedSeats: { type: [String], required: true },
// //     isPaid: { type: Boolean, default: false },
// //     paymentLink: { type: String },
// //   },
// //   { timestamps: true }
// // );

// // const Booking = mongoose.model("Booking", bookingSchema);
// // export default Booking;
// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     user: { type: String, required: true },
//     show: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Show",
//       required: true,
//     },
//     amount: { type: Number, required: true },
//     bookedSeats: { type: [String], required: true },
//     isPaid: { type: Boolean, default: false },
//     paymentLink: { type: String },
//   },
//   { timestamps: true }
// );

// const Booking = mongoose.model("Booking", bookingSchema);
// export default Booking;
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // 🔥 MUST be ObjectId to work with admin & webhook
    user: {
      type: String, // Clerk userId (KEEP STRING)
      required: true,
    },

    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    bookedSeats: {
      type: [String],
      required: true,
    },

    // 🔥 THIS IS WHAT CONTROLS "Pay Now"
    isPaid: {
      type: Boolean,
      default: false,
    },

    paymentLink: {
      type: String,
    },

    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
