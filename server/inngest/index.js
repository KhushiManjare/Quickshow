// // import { Inngest } from "inngest";
// // import User from "../models/User.js";
// // import Booking from "../models/Booking.js";
// // import Show from "../models/Show.js";
// // import { sendEmail } from "../configs/nodeMailer.js";

// // export const inngest = new Inngest({ id: "movie-ticket-booking" });

// // /* ===============================
// //    SYNC USER CREATION
// // ================================ */
// // const syncUserCreation = inngest.createFunction(
// //   { id: "sync-user-from-clerk" },
// //   { event: "clerk/user.created" },
// //   async ({ event }) => {
// //     const { id, first_name, last_name, email_addresses, image_url } =
// //       event.data;

// //     await User.create({
// //       _id: id,
// //       email: email_addresses[0]?.email_address,
// //       name: `${first_name} ${last_name}`,
// //       image: image_url,
// //     });
// //   }
// // );

// // /* ===============================
// //    SYNC USER DELETION
// // ================================ */
// // const syncUserDeletion = inngest.createFunction(
// //   { id: "delete-user-with-clerk" },
// //   { event: "clerk/user.deleted" },
// //   async ({ event }) => {
// //     await User.findByIdAndDelete(event.data.id);
// //   }
// // );

// // /* ===============================
// //    SYNC USER UPDATE
// // ================================ */
// // const syncUserUpdation = inngest.createFunction(
// //   { id: "update-user-from-clerk" },
// //   { event: "clerk/user.updated" },
// //   async ({ event }) => {
// //     const { id, first_name, last_name, email_addresses, image_url } =
// //       event.data;

// //     await User.findByIdAndUpdate(id, {
// //       email: email_addresses[0]?.email_address,
// //       name: `${first_name} ${last_name}`,
// //       image: image_url,
// //     });
// //   }
// // );

// // /* ===============================
// //    RELEASE SEATS IF PAYMENT FAILS
// // ================================ */
// // const releaseSeatsAndDeleteBooking = inngest.createFunction(
// //   { id: "release-seats-delete-booking" },
// //   { event: "app/checkpayment" },
// //   async ({ event, step }) => {
// //     await step.sleep("wait-10-minutes", "10m");

// //     await step.run("check-payment-status", async () => {
// //       const booking = await Booking.findById(event.data.bookingId);
// //       if (!booking || booking.isPaid) return;

// //       const show = await Show.findById(booking.show);
// //       if (!show) return;

// //       booking.bookedSeats.forEach((seat) => {
// //         delete show.occupiedSeats[seat];
// //       });

// //       show.markModified("occupiedSeats");
// //       await show.save();
// //       await Booking.findByIdAndDelete(booking._id);
// //     });
// //   }
// // );

// // /* ===============================
// //    BOOKING CONFIRMATION EMAIL
// // ================================ */
// // const sendBookingConfirmationEmail = inngest.createFunction(
// //   { id: "send-booking-confirmation-email" },
// //   { event: "app/show.booked" },
// //   async ({ event }) => {
// //     const booking = await Booking.findById(event.data.bookingId)
// //       .populate({
// //         path: "show",
// //         populate: { path: "movie", model: "Movie" },
// //       })
// //       .populate("user");

// //     if (!booking || !booking.user || !booking.show?.movie) return;

// //     await sendEmail({
// //       to: booking.user.email,
// //       subject: `Payment Confirmation: "${booking.show.movie.title}" booked!`,
// //       body: `
// //         <div>
// //           <h2>Hi ${booking.user.name},</h2>
// //           <p>Your booking for <strong>${booking.show.movie.title}</strong> is confirmed.</p>
// //           <p><strong>Date & Time:</strong> ${new Date(
// //             booking.show.showDateTime
// //           ).toLocaleString()}</p>
// //           <p>Enjoy the show 🍿</p>
// //         </div>
// //       `,
// //     });
// //   }
// // );

// // /* ===============================
// //    SHOW REMINDERS (FIXED)
// // ================================ */
// // const sendShowReminders = inngest.createFunction(
// //   { id: "send-show-reminders" },
// //   { cron: "0 */8 * * *" },
// //   async ({ step }) => {
// //     const now = new Date();
// //     const in8Hours = new Date(now.getTime() + 8 * 60 * 60 * 1000);

// //     const shows = await Show.find({
// //       showDateTime: { $gte: now, $lte: in8Hours },
// //     }).populate("movie");

// //     for (const show of shows) {
// //       if (!show.movie || !show.occupiedSeats) continue;

// //       const userIds = [...new Set(Object.values(show.occupiedSeats))];
// //       const users = await User.find({ _id: { $in: userIds } });

// //       for (const user of users) {
// //         await sendEmail({
// //           to: user.email,
// //           subject: `Reminder: "${show.movie.title}" starts soon`,
// //           body: `
// //             <div>
// //               <h2>Hello ${user.name},</h2>
// //               <p>Your movie <strong>${show.movie.title}</strong> starts at:</p>
// //               <p>${new Date(show.showDateTime).toLocaleString()}</p>
// //             </div>
// //           `,
// //         });
// //       }
// //     }
// //   }
// // );

// // /* ===============================
// //    NEW SHOW NOTIFICATION
// // ================================ */
// // const sendNewShowNotifications = inngest.createFunction(
// //   { id: "send-new-show-notifications" },
// //   { event: "app/show.added" },
// //   async ({ event }) => {
// //     const users = await User.find({});

// //     for (const user of users) {
// //       await sendEmail({
// //         to: user.email,
// //         subject: `🎬 New Show Added`,
// //         body: `
// //           <div>
// //             <h2>Hi ${user.name},</h2>
// //             <p>New show added: <strong>${event.data.movieTitle}</strong></p>
// //           </div>
// //         `,
// //       });
// //     }
// //   }
// // );

// // /* ===============================
// //    EXPORT
// // ================================ */
// // export const functions = [
// //   syncUserCreation,
// //   syncUserDeletion,
// //   syncUserUpdation,
// //   releaseSeatsAndDeleteBooking,
// //   sendBookingConfirmationEmail,
// //   sendShowReminders,
// //   sendNewShowNotifications,
// // ];
// import { Inngest } from "inngest";
// import User from "../models/User.js";
// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import { sendEmail } from "../configs/nodeMailer.js";

// /* ===============================
//    INNGEST INITIALIZATION (FIXED)
// ================================ */
// export const inngest = new Inngest({
//   id: "movie-ticket-booking",
//   apiKey: process.env.INNGEST_API_KEY, // ✅ THIS WORKS
// });

// /* ===============================
//    SYNC USER CREATION
// ================================ */
// const syncUserCreation = inngest.createFunction(
//   { id: "sync-user-from-clerk" },
//   { event: "clerk/user.created" },
//   async ({ event }) => {
//     const { id, first_name, last_name, email_addresses, image_url } =
//       event.data;

//     await User.create({
//       _id: id,
//       email: email_addresses[0]?.email_address,
//       name: `${first_name} ${last_name}`,
//       image: image_url,
//     });
//   }
// );

// /* ===============================
//    SYNC USER DELETION
// ================================ */
// const syncUserDeletion = inngest.createFunction(
//   { id: "delete-user-with-clerk" },
//   { event: "clerk/user.deleted" },
//   async ({ event }) => {
//     await User.findByIdAndDelete(event.data.id);
//   }
// );

// /* ===============================
//    SYNC USER UPDATE
// ================================ */
// const syncUserUpdation = inngest.createFunction(
//   { id: "update-user-from-clerk" },
//   { event: "clerk/user.updated" },
//   async ({ event }) => {
//     const { id, first_name, last_name, email_addresses, image_url } =
//       event.data;

//     await User.findByIdAndUpdate(id, {
//       email: email_addresses[0]?.email_address,
//       name: `${first_name} ${last_name}`,
//       image: image_url,
//     });
//   }
// );

// /* ===============================
//    RELEASE SEATS IF PAYMENT FAILS
// ================================ */
// const releaseSeatsAndDeleteBooking = inngest.createFunction(
//   { id: "release-seats-delete-booking" },
//   { event: "app/checkpayment" },
//   async ({ event, step }) => {
//     await step.sleep("wait-10-minutes", "10m");

//     await step.run("check-payment-status", async () => {
//       const booking = await Booking.findById(event.data.bookingId);
//       if (!booking || booking.isPaid) return;

//       const show = await Show.findById(booking.show);
//       if (!show) return;

//       booking.bookedSeats.forEach((seat) => {
//         delete show.occupiedSeats[seat];
//       });

//       show.markModified("occupiedSeats");
//       await show.save();
//       await Booking.findByIdAndDelete(booking._id);
//     });
//   }
// );

// /* ===============================
//    BOOKING CONFIRMATION EMAIL
// ================================ */
// const sendBookingConfirmationEmail = inngest.createFunction(
//   { id: "send-booking-confirmation-email" },
//   { event: "app/show.booked" },
//   async ({ event }) => {
//     const booking = await Booking.findById(event.data.bookingId)
//       .populate({
//         path: "show",
//         populate: { path: "movie", model: "Movie" },
//       })
//       .populate("user");

//     if (!booking || !booking.user || !booking.show?.movie) return;

//     await sendEmail({
//       to: booking.user.email,
//       subject: `Payment Confirmation: "${booking.show.movie.title}" booked!`,
//       body: `
//         <div>
//           <h2>Hi ${booking.user.name},</h2>
//           <p>Your booking for <strong>${booking.show.movie.title}</strong> is confirmed.</p>
//           <p><strong>Date & Time:</strong> ${new Date(
//             booking.show.showDateTime
//           ).toLocaleString()}</p>
//           <p>Enjoy the show 🍿</p>
//         </div>
//       `,
//     });
//   }
// );

// /* ===============================
//    SHOW REMINDERS
// ================================ */
// const sendShowReminders = inngest.createFunction(
//   { id: "send-show-reminders" },
//   { cron: "0 */8 * * *" },
//   async ({ step }) => {
//     const now = new Date();
//     const in8Hours = new Date(now.getTime() + 8 * 60 * 60 * 1000);

//     const shows = await Show.find({
//       showDateTime: { $gte: now, $lte: in8Hours },
//     }).populate("movie");

//     for (const show of shows) {
//       if (!show.movie || !show.occupiedSeats) continue;

//       const userIds = [...new Set(Object.values(show.occupiedSeats))];
//       const users = await User.find({ _id: { $in: userIds } });

//       for (const user of users) {
//         await sendEmail({
//           to: user.email,
//           subject: `Reminder: "${show.movie.title}" starts soon`,
//           body: `
//             <div>
//               <h2>Hello ${user.name},</h2>
//               <p>Your movie <strong>${show.movie.title}</strong> starts at:</p>
//               <p>${new Date(show.showDateTime).toLocaleString()}</p>
//             </div>
//           `,
//         });
//       }
//     }
//   }
// );

// /* ===============================
//    NEW SHOW NOTIFICATION
// ================================ */
// const sendNewShowNotifications = inngest.createFunction(
//   { id: "send-new-show-notifications" },
//   { event: "app/show.added" },
//   async ({ event }) => {
//     const users = await User.find({});

//     for (const user of users) {
//       await sendEmail({
//         to: user.email,
//         subject: `🎬 New Show Added`,
//         body: `
//           <div>
//             <h2>Hi ${user.name},</h2>
//             <p>New show added: <strong>${event.data.movieTitle}</strong></p>
//           </div>
//         `,
//       });
//     }
//   }
// );

// /* ===============================
//    EXPORT FUNCTIONS
// ================================ */
// export const functions = [
//   syncUserCreation,
//   syncUserDeletion,
//   syncUserUpdation,
//   releaseSeatsAndDeleteBooking,
//   sendBookingConfirmationEmail,
//   sendShowReminders,
//   sendNewShowNotifications,
// ];
import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import { sendEmail } from "../configs/nodeMailer.js";

/* ================= INNGEST CLIENT ================= */
export const inngest = new Inngest({
  id: "movie-ticket-booking",
  eventKey: process.env.INNGEST_EVENT_KEY, // ✅ CORRECT KEY
});

/* ================= USER SYNC ================= */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.create({
      _id: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    });
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await User.findByIdAndDelete(event.data.id);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.findByIdAndUpdate(id, {
      email: email_addresses[0]?.email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    });
  }
);

/* ================= RELEASE SEATS ================= */
const releaseSeatsAndDeleteBooking = inngest.createFunction(
  { id: "release-seats-delete-booking" },
  { event: "app/checkpayment" },
  async ({ event, step }) => {
    await step.sleep("wait-10-minutes", "10m");

    const booking = await Booking.findById(event.data.bookingId);
    if (!booking || booking.isPaid) return;

    const show = await Show.findById(booking.show);
    if (!show) return;

    booking.bookedSeats.forEach((seat) => {
      delete show.occupiedSeats[seat];
    });

    show.markModified("occupiedSeats");
    await show.save();
    await Booking.findByIdAndDelete(booking._id);
  }
);

/* ================= CONFIRMATION EMAIL ================= */
const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send-booking-confirmation-email" },
  { event: "app/show.booked" },
  async ({ event }) => {
    const booking = await Booking.findById(event.data.bookingId)
      .populate({
        path: "show",
        populate: { path: "movie", model: "Movie" },
      })
      .populate("user");

    if (!booking || !booking.user || !booking.show?.movie) return;

    await sendEmail({
      to: booking.user.email,
      subject: `Payment Confirmed: ${booking.show.movie.title}`,
      body: `
        <h3>Hello ${booking.user.name}</h3>
        <p>Your booking is confirmed.</p>
        <p><strong>Movie:</strong> ${booking.show.movie.title}</p>
      `,
    });
  }
);

/* ================= EXPORT ================= */
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  releaseSeatsAndDeleteBooking,
  sendBookingConfirmationEmail,
];
