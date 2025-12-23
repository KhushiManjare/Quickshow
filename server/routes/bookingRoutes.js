// import express from "express";
// import {
//   createBooking,
//   getOccupiedSeats,
// } from "../controllers/bookingController.js";

// const bookingRouter = express.Router();

// bookingRouter.post("/create", createBooking);
// bookingRouter.get("/seats/:showId", getOccupiedSeats);

// export default bookingRouter;
import express from "express";
import { requireAuth } from "@clerk/express";
import {
  createBooking,
  getOccupiedSeats,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

// 🔐 PROTECT CREATE BOOKING
bookingRouter.post("/create", requireAuth(), createBooking);

// ❌ seats API can be public
bookingRouter.get("/seats/:showId", getOccupiedSeats);

export default bookingRouter;
