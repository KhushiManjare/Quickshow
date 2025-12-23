// // // // import stripe from "stripe";
// // // // import Booking from "../models/Booking.js";
// // // // import { inngest } from "../inngest/index.js";

// // // // export const stripeWebhooks = async (request, response) => {
// // // //   const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
// // // //   const sig = request.headers["stripe-signature"];

// // // //   let event;

// // // //   try {
// // // //     event = stripeInstance.webhooks.constructEvent(
// // // //       request.body,
// // // //       sig,
// // // //       process.env.STRIPE_WEBHOOK_SECRET
// // // //     );
// // // //   } catch (error) {
// // // //     return response.status(400).send(`Webhook Error: ${error.message}`);
// // // //   }

// // // //   try {
// // // //     switch (event.type) {
// // // //       case "payment_intent.succeeded": {
// // // //         const paymentIntent = event.data.object;
// // // //         const sessionList = await stripeInstance.checkout.sessions.list({
// // // //           payment_intent: paymentIntent.id,
// // // //         });

// // // //         const session = sessionList.data[0];
// // // //         const { bookingId } = session.metadata;

// // // //         await Booking.findByIdAndUpdate(bookingId, {
// // // //           isPaid: true,
// // // //           paymentLink: "",
// // // //         });

// // // //         // Send Confirmation Email
// // // //         await inngest.send({
// // // //           name: "app/show.booked",
// // // //           data: { bookingId },
// // // //         });

// // // //         break;
// // // //       }

// // // //       default:
// // // //         console.log("Unhandled event type:", event.type);
// // // //     }

// // // //     response.json({ received: true });
// // // //   } catch (error) {
// // // //     console.error("Webhook processing error:", error);
// // // //     response.status(500).send("Internal Server Error");
// // // //   }
// // // // };
// // // import Stripe from "stripe";
// // // import Booking from "../models/Booking.js";
// // // import { inngest } from "../inngest/index.js";

// // // if (!process.env.STRIPE_SECRET_KEY) {
// // //   throw new Error("❌ STRIPE_SECRET_KEY is missing in environment variables");
// // // }

// // // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// // //   apiVersion: "2023-10-16",
// // // });

// // // export const stripeWebhooks = async (req, res) => {
// // //   const sig = req.headers["stripe-signature"];
// // //   let event;

// // //   try {
// // //     event = stripe.webhooks.constructEvent(
// // //       req.body,
// // //       sig,
// // //       process.env.STRIPE_WEBHOOK_SECRET
// // //     );
// // //   } catch (err) {
// // //     console.error("❌ Stripe signature error:", err.message);
// // //     return res.status(400).send("Webhook Error");
// // //   }

// // //   try {
// // //     if (event.type === "checkout.session.completed") {
// // //       const session = event.data.object;
// // //       const bookingId = session.metadata.bookingId;

// // //       await Booking.findByIdAndUpdate(bookingId, {
// // //         isPaid: true,
// // //         paymentLink: "",
// // //       });

// // //       await inngest.send({
// // //         name: "app/show.booked",
// // //         data: { bookingId },
// // //       });

// // //       console.log("✅ Payment confirmed for booking:", bookingId);
// // //     }

// // //     res.json({ received: true });
// // //   } catch (error) {
// // //     console.error("❌ Webhook processing error:", error);
// // //     res.status(500).send("Server error");
// // //   }
// // // };
// // import Stripe from "stripe";
// // import Booking from "../models/Booking.js";
// // import { inngest } from "../inngest/index.js";

// // let stripe; // lazy init

// // export const stripeWebhooks = async (req, res) => {
// //   try {
// //     // 🔐 Initialize Stripe ONLY when webhook is hit
// //     if (!stripe) {
// //       if (!process.env.STRIPE_SECRET_KEY) {
// //         return res
// //           .status(500)
// //           .json({ message: "Stripe secret key missing" });
// //       }

// //       stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// //         apiVersion: "2023-10-16",
// //       });
// //     }

// //     const sig = req.headers["stripe-signature"];

// //     const event = stripe.webhooks.constructEvent(
// //       req.body,
// //       sig,
// //       process.env.STRIPE_WEBHOOK_SECRET
// //     );

// //     if (event.type === "checkout.session.completed") {
// //       const session = event.data.object;
// //       const bookingId = session.metadata.bookingId;

// //       await Booking.findByIdAndUpdate(bookingId, {
// //         isPaid: true,
// //         paymentLink: "",
// //       });

// //       await inngest.send({
// //         name: "app/show.booked",
// //         data: { bookingId },
// //       });

// //       console.log("✅ Payment confirmed:", bookingId);
// //     }

// //     res.json({ received: true });
// //   } catch (err) {
// //     console.error("❌ Stripe webhook error:", err.message);
// //     res.status(400).send(`Webhook Error: ${err.message}`);
// //   }
// // };
import dotenv from "dotenv";
dotenv.config(); // MUST be first

import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

let stripe = null; // 🔥 DO NOT initialize at top

export const stripeWebhooks = async (req, res) => {
  try {
    // ✅ Lazy init Stripe INSIDE request
    if (!stripe) {
      if (!process.env.STRIPE_SECRET_KEY) {
        console.error("❌ STRIPE_SECRET_KEY missing");
        return res.status(500).send("Stripe key missing");
      }

      stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
      });

      console.log("✅ Stripe initialized");
    }

    const sig = req.headers["stripe-signature"];
    if (!sig) {
      return res.status(400).send("Missing Stripe signature");
    }

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });

        await inngest.send({
          name: "app/show.booked",
          data: { bookingId },
        });

        console.log("✅ Booking paid:", bookingId);
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("❌ Stripe webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
