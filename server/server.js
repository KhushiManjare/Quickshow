// // // // // // import express from "express";
// // // // // // import cors from "cors";
// // // // // // import dotenv from "dotenv";
// // // // // // dotenv.config();

// // // // // // import connectDB from "./configs/db.js";
// // // // // // import { clerkMiddleware } from "@clerk/express";
// // // // // // import { serve } from "inngest/express";
// // // // // // import { inngest, functions } from "./inngest/index.js";
// // // // // // import showRouter from "./routes/showRoutes.js";
// // // // // // import bookingRouter from "./routes/bookingRoutes.js";
// // // // // // import adminRouter from "./routes/adminRoutes.js";
// // // // // // import userRouter from "./routes/userRoutes.js";
// // // // // // import { stripeWebhooks } from "./controllers/stripeWebhooks.js";


// // // // // // console.log("MONGO_URI =", process.env.MONGO_URI);

// // // // // // const app = express();
// // // // // // const port = 3000;

// // // // // // await connectDB();

// // // // // // // Stripe Webhooks Route
// // // // // // app.use(
// // // // // //   "/api/stripe",
// // // // // //   express.raw({ type: "application/json" }),
// // // // // //   stripeWebhooks
// // // // // // );

// // // // // // // Middleware
// // // // // // app.use(express.json());
// // // // // // app.use(cors());
// // // // // // app.use(clerkMiddleware());

// // // // // // // API Routes
// // // // // // app.get("/", (req, res) => res.send("Server is Live!"));
// // // // // // app.use("/api/inngest", serve({ client: inngest, functions }));
// // // // // // app.use("/api/show", showRouter);
// // // // // // app.use("/api/booking", bookingRouter);
// // // // // // app.use("/api/admin", adminRouter);
// // // // // // app.use("/api/user", userRouter);

// // // // // // app.listen(port, () =>
// // // // // //   console.log(`Server listening at http://localhost:${port}`)
// // // // // // );

// // // // // import dotenv from "dotenv";
// // // // // dotenv.config();
// // // // // import express from "express";
// // // // // import cors from "cors";


// // // // // import connectDB from "./configs/db.js";
// // // // // import { clerkMiddleware } from "@clerk/express";
// // // // // import { serve } from "inngest/express";
// // // // // import { inngest, functions } from "./inngest/index.js";

// // // // // import showRouter from "./routes/showRoutes.js";
// // // // // import bookingRouter from "./routes/bookingRoutes.js";
// // // // // import adminRouter from "./routes/adminRoutes.js";
// // // // // import userRouter from "./routes/userRoutes.js";
// // // // // import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// // // // // const app = express();
// // // // // const port = 3000;

// // // // // // 🔍 ENV CHECK
// // // // // console.log("MONGO_URI =", process.env.MONGO_URI ? "FOUND" : "MISSING");

// // // // // // 🔗 DB
// // // // // await connectDB();

// // // // // // ================= STRIPE WEBHOOK =================
// // // // // app.use(
// // // // //   "/api/stripe",
// // // // //   express.raw({ type: "application/json" }),
// // // // //   stripeWebhooks
// // // // // );

// // // // // // ================= GLOBAL MIDDLEWARE =================
// // // // // app.use(cors());
// // // // // app.use(express.json());
// // // // // app.use(clerkMiddleware());

// // // // // // ================= ROUTES =================
// // // // // app.get("/", (req, res) => res.send("Server is Live!"));

// // // // // app.use("/api/inngest", serve({ client: inngest, functions }));

// // // // // // 🎬 SHOW ROUTES (VERY IMPORTANT)
// // // // // app.use("/api/show", showRouter);
// // // // // console.log("✅ /api/show routes mounted");

// // // // // app.use("/api/booking", bookingRouter);
// // // // // app.use("/api/admin", adminRouter);
// // // // // app.use("/api/user", userRouter);


// // // // // // ================= SERVER =================
// // // // // app.listen(port, () => {
// // // // //   console.log(`🚀 Server running at http://localhost:${port}`);
// // // // // });

// // // // // import dotenv from "dotenv";
// // // // // dotenv.config();

// // // // // import express from "express";
// // // // // import cors from "cors";
// // // // // import connectDB from "./configs/db.js";
// // // // // import { clerkMiddleware } from "@clerk/express";
// // // // // import { serve } from "inngest/express";

// // // // // import { inngest, functions } from "./inngest/index.js";
// // // // // import showRouter from "./routes/showRoutes.js";
// // // // // import bookingRouter from "./routes/bookingRoutes.js";
// // // // // import adminRouter from "./routes/adminRoutes.js";
// // // // // import userRouter from "./routes/userRoutes.js";

// // // // // import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// // // // // const app = express();
// // // // // const port = 3000;

// // // // // /* ================= ENV CHECK ================= */
// // // // // console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");
// // // // // console.log(
// // // // //   "INNGEST_EVENT_KEY:",
// // // // //   process.env.INNGEST_EVENT_KEY ? "FOUND" : "MISSING"
// // // // // );

// // // // // /* ================= DB ================= */
// // // // // await connectDB();

// // // // // /* ================= STRIPE WEBHOOK ================= */
// // // // // /* ⚠️ MUST be BEFORE express.json() */
// // // // // app.post(
// // // // //   "/api/stripe/webhook",
// // // // //   express.raw({ type: "application/json" }),
// // // // //   stripeWebhooks
// // // // // );

// // // // // /* ================= GLOBAL MIDDLEWARE ================= */
// // // // // app.use(cors());
// // // // // app.use(express.json());
// // // // // app.use(clerkMiddleware());

// // // // // /* ================= ROUTES ================= */
// // // // // app.get("/", (req, res) => {
// // // // //   res.send("✅ Server is Live");
// // // // // });

// // // // // app.use("/api/inngest", serve({ client: inngest, functions }));
// // // // // app.use("/api/show", showRouter);
// // // // // app.use("/api/booking", bookingRouter);
// // // // // app.use("/api/admin", adminRouter);
// // // // // app.use("/api/user", userRouter);

// // // // // /* ================= SERVER ================= */
// // // // // app.listen(port, () => {
// // // // //   console.log(`🚀 Server running at http://localhost:${port}`);
// // // // // });
// // // // import dotenv from "dotenv";
// // // // dotenv.config();

// // // // import express from "express";
// // // // import cors from "cors";
// // // // import connectDB from "./configs/db.js";
// // // // import { clerkMiddleware } from "@clerk/express";
// // // // import { serve } from "inngest/express";

// // // // import { inngest, functions } from "./inngest/index.js";
// // // // import showRouter from "./routes/showRoutes.js";
// // // // import bookingRouter from "./routes/bookingRoutes.js";
// // // // import adminRouter from "./routes/adminRoutes.js";
// // // // import userRouter from "./routes/userRoutes.js";
// // // // import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// // // // const app = express();
// // // // const port = 3000;

// // // // /* ================= ENV CHECK ================= */
// // // // console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");
// // // // console.log(
// // // //   "INNGEST_EVENT_KEY:",
// // // //   process.env.INNGEST_EVENT_KEY ? "FOUND" : "MISSING"
// // // // );

// // // // /* ================= DB ================= */
// // // // await connectDB();

// // // // /* ================= STRIPE WEBHOOK ================= */
// // // // /* ⚠️ MUST be BEFORE express.json() */
// // // // app.post(
// // // //   "/api/stripe/webhook",
// // // //   express.raw({ type: "application/json" }),
// // // //   stripeWebhooks
// // // // );

// // // // /* ================= GLOBAL MIDDLEWARE ================= */
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // /* ================= ROUTES ================= */

// // // // // ✅ PUBLIC ROUTES (NO CLERK)
// // // // app.get("/", (req, res) => {
// // // //   res.send("✅ Server is Live");
// // // // });

// // // // app.use("/api/show", showRouter);

// // // // // ✅ INNGEST
// // // // app.use("/api/inngest", serve({ client: inngest, functions }));

// // // // // 🔐 PROTECTED ROUTES (WITH CLERK)
// // // // app.use("/api/user", clerkMiddleware(), userRouter);
// // // // app.use("/api/admin", clerkMiddleware(), adminRouter);
// // // // app.use("/api/booking", clerkMiddleware(), bookingRouter);

// // // // /* ================= SERVER ================= */
// // // // app.listen(port, () => {
// // // //   console.log(`🚀 Server running at http://localhost:${port}`);
// // // // });
// // // import dotenv from "dotenv";
// // // dotenv.config(); // MUST be first

// // // import express from "express";
// // // import cors from "cors";
// // // import connectDB from "./configs/db.js";
// // // import { clerkMiddleware } from "@clerk/express";
// // // import { serve } from "inngest/express";

// // // import { inngest, functions } from "./inngest/index.js";
// // // import showRouter from "./routes/showRoutes.js";
// // // import bookingRouter from "./routes/bookingRoutes.js";
// // // import adminRouter from "./routes/adminRoutes.js";
// // // import userRouter from "./routes/userRoutes.js";
// // // import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// // // const app = express();
// // // const port = process.env.PORT || 3000;

// // // /* ================= ENV CHECK ================= */
// // // console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND" : "MISSING");
// // // console.log(
// // //   "STRIPE_WEBHOOK_SECRET:",
// // //   process.env.STRIPE_WEBHOOK_SECRET ? "FOUND" : "MISSING"
// // // );

// // // /* ================= DB ================= */
// // // await connectDB();

// // // /* ================= STRIPE WEBHOOK ================= */
// // // /* ⚠️ MUST be BEFORE express.json() */
// // // app.post(
// // //   "/api/stripe/webhook",
// // //   express.raw({ type: "application/json" }),
// // //   stripeWebhooks
// // // );

// // // /* ================= GLOBAL MIDDLEWARE ================= */
// // // app.use(cors());
// // // app.use(express.json());

// // // /* ================= ROUTES ================= */

// // // // Public
// // // app.get("/", (req, res) => {
// // //   res.send("✅ Server is Live");
// // // });
// // // app.use("/api/show", showRouter);

// // // // Inngest
// // // app.use("/api/inngest", serve({ client: inngest, functions }));

// // // // Protected
// // // app.use("/api/user", clerkMiddleware(), userRouter);
// // // app.use("/api/admin", clerkMiddleware(), adminRouter);
// // // app.use("/api/booking", clerkMiddleware(), bookingRouter);

// // // /* ================= START ================= */
// // // app.listen(port, () => {
// // //   console.log(`🚀 Server running on port ${port}`);
// // // });
// // import dotenv from "dotenv";
// // dotenv.config();

// // import express from "express";
// // import cors from "cors";
// // import connectDB from "./configs/db.js";
// // import { clerkMiddleware } from "@clerk/express";
// // import { serve } from "inngest/express";

// // import { inngest, functions } from "./inngest/index.js";
// // import showRouter from "./routes/showRoutes.js";
// // import bookingRouter from "./routes/bookingRoutes.js";
// // import adminRouter from "./routes/adminRoutes.js";
// // import userRouter from "./routes/userRoutes.js";
// // import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// // const app = express();
// // const port = process.env.PORT || 3000;

// // await connectDB();

// // /* 🔥 STRIPE WEBHOOK MUST BE FIRST */
// // app.post(
// //   "/api/stripe/webhook",
// //   express.raw({ type: "application/json" }),
// //   stripeWebhooks
// // );

// // app.use(cors());
// // app.use(express.json());

// // app.get("/", (req, res) => res.send("Server is Live"));

// // app.use("/api/show", showRouter);
// // app.use("/api/inngest", serve({ client: inngest, functions }));
// // app.use("/api/user", clerkMiddleware(), userRouter);
// // app.use("/api/admin", clerkMiddleware(), adminRouter);
// // app.use("/api/booking", clerkMiddleware(), bookingRouter);

// // app.listen(port, () => {
// //   console.log(`🚀 Server running on port ${port}`);
// // });
// // import dotenv from "dotenv";
// // dotenv.config();

// // import express from "express";
// // import cors from "cors";
// // import connectDB from "./configs/db.js";
// // import { serve } from "inngest/express";

// // import { inngest, functions } from "./inngest/index.js";
// // import showRouter from "./routes/showRoutes.js";
// // import bookingRouter from "./routes/bookingRoutes.js";
// // import adminRouter from "./routes/adminRoutes.js";
// // import userRouter from "./routes/userRoutes.js";
// // import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// // const app = express();
// // const port = process.env.PORT || 3000;

// // await connectDB();

// // /* 🔥 STRIPE WEBHOOK (FIRST) */
// // app.post(
// //   "/api/stripe/webhook",
// //   express.raw({ type: "application/json" }),
// //   stripeWebhooks
// // );

// // app.use(cors());
// // app.use(express.json());

// // app.get("/", (req, res) => res.send("Server is Live"));

// // /* ROUTES (NO CLERK ON ADMIN) */
// // app.use("/api/show", showRouter);
// // app.use("/api/inngest", serve({ client: inngest, functions }));
// // app.use("/api/user", userRouter);
// // app.use("/api/admin", adminRouter);
// // app.use("/api/booking", bookingRouter);

// // app.listen(port, () => {
// //   console.log(`🚀 Server running on port ${port}`);
// // });
// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import { serve } from "inngest/express";

// import { inngest, functions } from "./inngest/index.js";
// import showRouter from "./routes/showRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import userRouter from "./routes/userRoutes.js";
// import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

// const app = express();
// const port = process.env.PORT || 3000;

// await connectDB();

// /* 🔥 STRIPE WEBHOOK (MUST BE FIRST) */
// app.post(
//   "/api/stripe/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhooks
// );

// /* ✅ CORS – THIS IS THE KEY FIX */
// app.use(
//   cors({
//     origin: [
//       "https://quickshow-ceq6.vercel.app",
//       "http://localhost:5173",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "x-clerk-user-id",
//     ],
//     credentials: true,
//   })
// );


// app.use(express.json());
// app.use(clerkMiddleware());

// app.get("/", (req, res) => res.send("Server is Live"));

// app.use("/api/show", showRouter);
// app.use("/api/inngest", serve({ client: inngest, functions }));
// app.use("/api/user", userRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/booking", bookingRouter);

// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

const app = express();
const port = process.env.PORT || 10000;

/* ================= DB ================= */
await connectDB();

/* ================= STRIPE WEBHOOK (FIRST & ISOLATED) ================= */
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

/* ================= CORS (FINAL FIX) ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://quickshow-frontend-bkvf.onrender.com",
      "https://quickshow-ceq6.vercel.app",
      "https://quickshow-tomo.vercel.app",
    ],
    credentials: true,
  })
);

/* 🔥 PREFLIGHT */
app.options("*", cors());

/* ================= BODY PARSER ================= */
app.use(express.json());

/* ================= PUBLIC ROUTES ================= */
app.get("/", (req, res) => res.send("Server is Live"));
app.use("/api/show", showRouter);
app.use("/api/inngest", serve({ client: inngest, functions }));

/* ================= PROTECTED ROUTES ================= */
app.use("/api/user", clerkMiddleware(), userRouter);
app.use("/api/admin", clerkMiddleware(), adminRouter);
app.use("/api/booking", clerkMiddleware(), bookingRouter);

/* ================= START ================= */
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
