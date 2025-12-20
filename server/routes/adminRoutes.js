import express from "express";
import {
  isAdmin,
  getDashboardData,
  getAllShows,
  getAllBookings,
  addShow,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/is-admin", isAdmin);
router.get("/dashboard", getDashboardData);
router.get("/shows", getAllShows);
router.get("/bookings", getAllBookings);
router.post("/add-show", addShow);

export default router;
