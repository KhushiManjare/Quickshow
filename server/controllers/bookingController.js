// // // // // import { inngest } from "../inngest/index.js";
// // // // // import Booking from "../models/Booking.js";
// // // // // import Show from "../models/Show.js";
// // // // // import Stripe from "stripe";

// // // // // /* ================= CHECK SEATS ================= */
// // // // // const checkSeatsAvailability = async (showId, selectedSeats) => {
// // // // //   const show = await Show.findById(showId);
// // // // //   if (!show) return false;

// // // // //   return !selectedSeats.some((seat) => show.occupiedSeats[seat]);
// // // // // };

// // // // // /* ================= CREATE BOOKING ================= */
// // // // // export const createBooking = async (req, res) => {
// // // // //   try {
// // // // //     if (!process.env.STRIPE_SECRET_KEY) {
// // // // //       return res.json({
// // // // //         success: false,
// // // // //         message: "Stripe key missing",
// // // // //       });
// // // // //     }

// // // // //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // // // //     const { userId } = req.auth();
// // // // //     const { showId, selectedSeats } = req.body;
// // // // //     const { origin } = req.headers;

// // // // //     if (!showId || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
// // // // //       return res.json({
// // // // //         success: false,
// // // // //         message: "Invalid booking data",
// // // // //       });
// // // // //     }

// // // // //     const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
// // // // //     if (!isAvailable) {
// // // // //       return res.json({
// // // // //         success: false,
// // // // //         message: "Selected seats are already booked",
// // // // //       });
// // // // //     }

// // // // //     const showData = await Show.findById(showId).populate("movie");
// // // // //     if (!showData || !showData.movie) {
// // // // //       return res.json({
// // // // //         success: false,
// // // // //         message: "Show not found",
// // // // //       });
// // // // //     }

// // // // //     const booking = await Booking.create({
// // // // //       user: userId,
// // // // //       show: showId,
// // // // //       amount: showData.showPrice * selectedSeats.length,
// // // // //       bookedSeats: selectedSeats,
// // // // //     });

// // // // //     selectedSeats.forEach((seat) => {
// // // // //       showData.occupiedSeats[seat] = userId;
// // // // //     });

// // // // //     showData.markModified("occupiedSeats");
// // // // //     await showData.save();

// // // // //     // ✅ STRIPE CHECKOUT SESSION
  

// // // // //     booking.paymentLink = session.url;
// // // // //     await booking.save();

// // // // //     await inngest.send({
// // // // //       name: "app/checkpayment",
// // // // //       data: { bookingId: booking._id.toString() },
// // // // //     });

// // // // //     return res.json({
// // // // //       success: true,
// // // // //       url: session.url,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("BOOKING ERROR:", error);
// // // // //     return res.json({
// // // // //       success: false,
// // // // //       message: error.message,
// // // // //     });
// // // // //   }
// // // // // };

// // // // // /* ================= GET OCCUPIED SEATS ================= */
// // // // // export const getOccupiedSeats = async (req, res) => {
// // // // //   try {
// // // // //     const show = await Show.findById(req.params.showId);
// // // // //     if (!show) {
// // // // //       return res.json({
// // // // //         success: false,
// // // // //         message: "Show not found",
// // // // //       });
// // // // //     }

// // // // //     return res.json({
// // // // //       success: true,
// // // // //       occupiedSeats: Object.keys(show.occupiedSeats),
// // // // //     });
// // // // //   } catch (error) {
// // // // //     return res.json({
// // // // //       success: false,
// // // // //       message: error.message,
// // // // //     });
// // // // //   }
// // // // // };
// // // // import Booking from "../models/Booking.js";
// // // // import Show from "../models/Show.js";
// // // // import Stripe from "stripe";

// // // // /* ================= CHECK SEATS ================= */
// // // // const checkSeatsAvailability = async (showId, selectedSeats) => {
// // // //   const show = await Show.findById(showId);
// // // //   if (!show) return false;

// // // //   return !selectedSeats.some((seat) => show.occupiedSeats[seat]);
// // // // };

// // // // /* ================= CREATE BOOKING ================= */
// // // // export const createBooking = async (req, res) => {
// // // //   try {
// // // //     /* ---------- STRIPE KEY CHECK ---------- */
// // // //     if (!process.env.STRIPE_SECRET_KEY) {
// // // //       return res.json({
// // // //         success: false,
// // // //         message: "Stripe secret key missing",
// // // //       });
// // // //     }

// // // //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// // // //       apiVersion: "2023-10-16",
// // // //     });

// // // //     const { userId } = req.auth();
// // // //     const { showId, selectedSeats } = req.body;
// // // //     const { origin } = req.headers;

// // // //     /* ---------- VALIDATION ---------- */
// // // //     if (!showId || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
// // // //       return res.json({
// // // //         success: false,
// // // //         message: "Invalid booking data",
// // // //       });
// // // //     }

// // // //     /* ---------- CHECK SEAT AVAILABILITY ---------- */
// // // //     const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
// // // //     if (!isAvailable) {
// // // //       return res.json({
// // // //         success: false,
// // // //         message: "Selected seats are already booked",
// // // //       });
// // // //     }

// // // //     /* ---------- FETCH SHOW & MOVIE ---------- */
// // // //     const showData = await Show.findById(showId).populate("movie");
// // // //     if (!showData || !showData.movie) {
// // // //       return res.json({
// // // //         success: false,
// // // //         message: "Show not found",
// // // //       });
// // // //     }

// // // //     /* ---------- CREATE BOOKING ---------- */
// // // //     const amount = showData.showPrice * selectedSeats.length;

// // // //     const booking = await Booking.create({
// // // //       user: userId,
// // // //       show: showId,
// // // //       amount,
// // // //       bookedSeats: selectedSeats,
// // // //     });

// // // //     /* ---------- LOCK SEATS ---------- */
// // // //     selectedSeats.forEach((seat) => {
// // // //       showData.occupiedSeats[seat] = userId;
// // // //     });

// // // //     showData.markModified("occupiedSeats");
// // // //     await showData.save();

// // // //     /* ---------- SAFE MOVIE TITLE FOR STRIPE ---------- */
// // // //     const movieTitle =
// // // //       typeof showData.movie.title === "string" &&
// // // //       showData.movie.title.trim().length > 0
// // // //         ? showData.movie.title
// // // //         : "Movie Ticket";

// // // //     /* ---------- STRIPE CHECKOUT SESSION ---------- */
// // // //     const session = await stripe.checkout.sessions.create({
// // // //       mode: "payment",
// // // //       payment_method_types: ["card"],
// // // //       line_items: [
// // // //         {
// // // //           price_data: {
// // // //             currency: "inr",
// // // //             product_data: {
// // // //               name: movieTitle, // ✅ ALWAYS VALID
// // // //               description: `Seats: ${selectedSeats.join(", ")}`,
// // // //             },
// // // //             unit_amount: Math.round(amount * 100),
// // // //           },
// // // //           quantity: 1,
// // // //         },
// // // //       ],
// // // //       success_url: `${origin}/loading/my-bookings`,
// // // //       cancel_url: `${origin}/my-bookings`,
// // // //       metadata: {
// // // //         bookingId: booking._id.toString(),
// // // //       },
// // // //     });

// // // //     /* ---------- SAVE PAYMENT LINK ---------- */
// // // //     booking.paymentLink = session.url;
// // // //     await booking.save();

// // // //     /* ❌ DO NOT SEND INNGEST EVENT HERE
// // // //        Email + confirmation will happen from Stripe webhook */

// // // //     return res.json({
// // // //       success: true,
// // // //       url: session.url,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("BOOKING ERROR:", error);
// // // //     return res.json({
// // // //       success: false,
// // // //       message: error.message,
// // // //     });
// // // //   }
// // // // };

// // // // /* ================= GET OCCUPIED SEATS ================= */
// // // // export const getOccupiedSeats = async (req, res) => {
// // // //   try {
// // // //     const show = await Show.findById(req.params.showId);
// // // //     if (!show) {
// // // //       return res.json({
// // // //         success: false,
// // // //         message: "Show not found",
// // // //       });
// // // //     }

// // // //     return res.json({
// // // //       success: true,
// // // //       occupiedSeats: Object.keys(show.occupiedSeats),
// // // //     });
// // // //   } catch (error) {
// // // //     return res.json({
// // // //       success: false,
// // // //       message: error.message,
// // // //     });
// // // //   }
// // // // };
// // // import Booking from "../models/Booking.js";
// // // import Show from "../models/Show.js";
// // // import Stripe from "stripe";

// // // /* ================= CHECK SEATS ================= */
// // // const checkSeatsAvailability = async (showId, selectedSeats) => {
// // //   const show = await Show.findById(showId);
// // //   if (!show) return false;

// // //   return !selectedSeats.some((seat) => show.occupiedSeats[seat]);
// // // };

// // // /* ================= CREATE BOOKING ================= */
// // // export const createBooking = async (req, res) => {
// // //   try {
// // //     if (!process.env.STRIPE_SECRET_KEY) {
// // //       return res.json({ success: false, message: "Stripe key missing" });
// // //     }

// // //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// // //       apiVersion: "2023-10-16",
// // //     });

// // //     const { userId } = req.auth();
// // //     const { showId, selectedSeats } = req.body;
// // //     const { origin } = req.headers;

// // //     if (!showId || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
// // //       return res.json({ success: false, message: "Invalid booking data" });
// // //     }

// // //     const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
// // //     if (!isAvailable) {
// // //       return res.json({
// // //         success: false,
// // //         message: "Selected seats already booked",
// // //       });
// // //     }

// // //     const showData = await Show.findById(showId).populate("movie");
// // //     if (!showData || !showData.movie) {
// // //       return res.json({ success: false, message: "Show not found" });
// // //     }

// // //     const amount = showData.showPrice * selectedSeats.length;

// // //     // ✅ CREATE BOOKING (UNPAID)
// // //     const booking = await Booking.create({
// // //       user: userId,
// // //       show: showId,
// // //       amount,
// // //       bookedSeats: selectedSeats,
// // //       isPaid: false,
// // //     });

// // //     // 🔒 LOCK SEATS (TEMPORARY)
// // //     selectedSeats.forEach((seat) => {
// // //       showData.occupiedSeats[seat] = userId;
// // //     });
// // //     showData.markModified("occupiedSeats");
// // //     await showData.save();

// // //     const session = await stripe.checkout.sessions.create({
// // //       mode: "payment",
// // //       payment_method_types: ["card"],
// // //       line_items: [
// // //         {
// // //           price_data: {
// // //             currency: "inr",
// // //             product_data: {
// // //               name: showData.movie.title || "Movie Ticket",
// // //               description: `Seats: ${selectedSeats.join(", ")}`,
// // //             },
// // //             unit_amount: Math.round(amount * 100),
// // //           },
// // //           quantity: 1,
// // //         },
// // //       ],
// // //       success_url: `${origin}/my-bookings`,
// // //       cancel_url: `${origin}/my-bookings`,
// // //       metadata: {
// // //         // 🔥 THIS IS THE KEY FOR WEBHOOK
// // //         bookingId: booking._id.toString(),
// // //       },
// // //     });

// // //     booking.paymentLink = session.url;
// // //     await booking.save();

// // //     return res.json({ success: true, url: session.url });
// // //   } catch (error) {
// // //     console.error("BOOKING ERROR:", error);
// // //     return res.json({ success: false, message: error.message });
// // //   }
// // // };

// // // /* ================= GET OCCUPIED SEATS ================= */
// // // export const getOccupiedSeats = async (req, res) => {
// // //   try {
// // //     const show = await Show.findById(req.params.showId);
// // //     if (!show) {
// // //       return res.json({ success: false, message: "Show not found" });
// // //     }

// // //     return res.json({
// // //       success: true,
// // //       occupiedSeats: Object.keys(show.occupiedSeats),
// // //     });
// // //   } catch (error) {
// // //     return res.json({ success: false, message: error.message });
// // //   }
// // // };
// // import Booking from "../models/Booking.js";
// // import Show from "../models/Show.js";
// // import Stripe from "stripe";

// // /* ================= CHECK SEATS ================= */
// // const checkSeatsAvailability = async (showId, selectedSeats) => {
// //   const show = await Show.findById(showId);
// //   if (!show) return false;

// //   return !selectedSeats.some((seat) => show.occupiedSeats[seat]);
// // };

// // /* ================= CREATE BOOKING ================= */
// // export const createBooking = async (req, res) => {
// //   try {
// //     if (!process.env.STRIPE_SECRET_KEY) {
// //       return res.status(500).json({
// //         success: false,
// //         message: "Stripe secret key missing",
// //       });
// //     }

// //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// //       apiVersion: "2023-10-16",
// //     });

// //     const { userId } = req.auth();
// //     const { showId, selectedSeats } = req.body;
// //     const { origin } = req.headers;

// //     if (!showId || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
// //       return res.json({
// //         success: false,
// //         message: "Invalid booking data",
// //       });
// //     }

// //     const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
// //     if (!isAvailable) {
// //       return res.json({
// //         success: false,
// //         message: "Selected seats already booked",
// //       });
// //     }

// //     const showData = await Show.findById(showId).populate("movie");
// //     if (!showData || !showData.movie) {
// //       return res.json({
// //         success: false,
// //         message: "Show not found",
// //       });
// //     }

// //     const amount = showData.showPrice * selectedSeats.length;

// //     // ✅ Create unpaid booking
// //     const booking = await Booking.create({
// //       user: userId,
// //       show: showId,
// //       bookedSeats: selectedSeats,
// //       amount,
// //       isPaid: false,
// //     });

// //     // 🔒 Lock seats temporarily
// //     selectedSeats.forEach((seat) => {
// //       showData.occupiedSeats[seat] = userId;
// //     });

// //     showData.markModified("occupiedSeats");
// //     await showData.save();

// //     // 💳 Stripe Checkout
// //     const session = await stripe.checkout.sessions.create({
// //       mode: "payment",
// //       payment_method_types: ["card"],
// //       line_items: [
// //         {
// //           price_data: {
// //             currency: "inr",
// //             product_data: {
// //               name: showData.movie.title || "Movie Ticket",
// //               description: `Seats: ${selectedSeats.join(", ")}`,
// //             },
// //             unit_amount: Math.round(amount * 100),
// //           },
// //           quantity: 1,
// //         },
// //       ],
// //       success_url: `${origin}/my-bookings`,
// //       cancel_url: `${origin}/my-bookings`,
// //       metadata: {
// //         bookingId: booking._id.toString(), // 🔥 IMPORTANT
// //       },
// //     });

// //     booking.paymentLink = session.url;
// //     await booking.save();

// //     return res.json({
// //       success: true,
// //       url: session.url,
// //     });
// //   } catch (error) {
// //     console.error("BOOKING ERROR:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // /* ================= GET OCCUPIED SEATS ================= */
// // export const getOccupiedSeats = async (req, res) => {
// //   try {
// //     const show = await Show.findById(req.params.showId);

// //     if (!show) {
// //       return res.json({
// //         success: false,
// //         message: "Show not found",
// //       });
// //     }

// //     return res.json({
// //       success: true,
// //       occupiedSeats: Object.keys(show.occupiedSeats),
// //     });
// //   } catch (error) {
// //     return res.json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };
// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2023-10-16",
// });

// /* ================= CREATE BOOKING ================= */
// export const createBooking = async (req, res) => {
//   try {
//     const userId = req.headers["x-clerk-user-id"];
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const { showId, selectedSeats } = req.body;
//     const origin = req.headers.origin;

//     if (!showId || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid data" });
//     }

//     const show = await Show.findById(showId).populate("movie");
//     if (!show || !show.movie) {
//       return res.status(404).json({ success: false, message: "Show not found" });
//     }

//     // seat check
//     for (const seat of selectedSeats) {
//       if (show.occupiedSeats?.[seat]) {
//         return res.json({
//           success: false,
//           message: "Seat already booked",
//         });
//       }
//     }

//     const amount = show.showPrice * selectedSeats.length;

//     const booking = await Booking.create({
//       user: userId,
//       show: showId,
//       bookedSeats: selectedSeats,
//       amount,
//       isPaid: false,
//     });

//     // lock seats
//     selectedSeats.forEach((seat) => {
//       show.occupiedSeats[seat] = userId;
//     });
//     show.markModified("occupiedSeats");
//     await show.save();

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: show.movie.title,
//               description: selectedSeats.join(", "),
//             },
//             unit_amount: Math.round(amount * 100),
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${origin}/my-bookings`,
//       cancel_url: `${origin}/my-bookings`,
//       metadata: {
//         bookingId: booking._id.toString(),
//       },
//     });

//     booking.paymentLink = session.url;
//     await booking.save();

//     res.json({ success: true, url: session.url });
//   } catch (err) {
//     console.error("BOOKING ERROR:", err);
//     res.status(500).json({ success: false, message: "Booking failed" });
//   }
// };
// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2023-10-16",
// });

// /* ================= GET OCCUPIED SEATS ================= */
// export const getOccupiedSeats = async (req, res) => {
//   try {
//     const { showId } = req.params;

//     const show = await Show.findById(showId);
//     if (!show) {
//       return res.json({ success: false, message: "Show not found" });
//     }

//     return res.json({
//       success: true,
//       occupiedSeats: Object.keys(show.occupiedSeats || {}),
//     });
//   } catch (error) {
//     console.error("GET OCCUPIED SEATS ERROR:", error);
//     return res.status(500).json({ success: false });
//   }
// };

// /* ================= CREATE BOOKING ================= */
// export const createBooking = async (req, res) => {
//   try {
//     const userId = req.headers["x-clerk-user-id"];
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const { showId, selectedSeats } = req.body;
//     const origin = req.headers.origin;

//     if (!showId || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
//       return res.status(400).json({ success: false });
//     }

//     const show = await Show.findById(showId).populate("movie");
//     if (!show || !show.movie) {
//       return res.status(404).json({ success: false });
//     }

//     // Seat availability check
//     for (const seat of selectedSeats) {
//       if (show.occupiedSeats?.[seat]) {
//         return res.json({
//           success: false,
//           message: "Seat already booked",
//         });
//       }
//     }

//     const amount = show.showPrice * selectedSeats.length;

//     const booking = await Booking.create({
//       user: userId,
//       show: showId,
//       bookedSeats: selectedSeats,
//       amount,
//       isPaid: false,
//     });

//     // Lock seats
//     selectedSeats.forEach((seat) => {
//       show.occupiedSeats[seat] = userId;
//     });

//     show.markModified("occupiedSeats");
//     await show.save();

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: show.movie.title,
//               description: selectedSeats.join(", "),
//             },
//             unit_amount: Math.round(amount * 100),
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${origin}/my-bookings`,
//       cancel_url: `${origin}/my-bookings`,
//       metadata: {
//         bookingId: booking._id.toString(),
//       },
//     });

//     booking.paymentLink = session.url;
//     await booking.save();

//     res.json({ success: true, url: session.url });
//   } catch (error) {
//     console.error("BOOKING ERROR:", error);
//     res.status(500).json({ success: false });
//   }
// };
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import Stripe from "stripe";

/* ❗ Stripe must be created INSIDE function */
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY missing");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

/* ================= GET OCCUPIED SEATS ================= */
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;

    const show = await Show.findById(showId);
    if (!show) {
      return res.json({ success: false, message: "Show not found" });
    }

    return res.json({
      success: true,
      occupiedSeats: Object.keys(show.occupiedSeats || {}),
    });
  } catch (err) {
    console.error("SEATS ERROR:", err);
    res.status(500).json({ success: false });
  }
};

/* ================= CREATE BOOKING ================= */
export const createBooking = async (req, res) => {
  try {
    const userId = req.headers["x-clerk-user-id"];
    if (!userId) {
      return res.status(401).json({ success: false });
    }

    const { showId, selectedSeats } = req.body;
    const origin = req.headers.origin;

    const show = await Show.findById(showId).populate("movie");
    if (!show || !show.movie) {
      return res.status(404).json({ success: false });
    }

    for (const seat of selectedSeats) {
      if (show.occupiedSeats?.[seat]) {
        return res.json({ success: false, message: "Seat booked" });
      }
    }

    const amount = show.showPrice * selectedSeats.length;

    const booking = await Booking.create({
      user: userId,
      show: showId,
      bookedSeats: selectedSeats,
      amount,
      isPaid: false,
    });

    selectedSeats.forEach(seat => {
      show.occupiedSeats[seat] = userId;
    });

    show.markModified("occupiedSeats");
    await show.save();

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "inr",
          product_data: { name: show.movie.title },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      success_url: `${origin}/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      metadata: { bookingId: booking._id.toString() },
    });

    booking.paymentLink = session.url;
    await booking.save();

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ success: false });
  }
};
