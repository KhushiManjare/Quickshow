import connectDB from "../configs/db.js";

import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";

/* =====================================================
   ADMIN CHECK (FOR PROJECT – FORCE TRUE)
   ===================================================== */
export const isAdmin = async (req, res) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      return res.status(401).json({
        success: false,
        isAdmin: false,
      });
    }

    // fetch user from Clerk
    const user = await clerkClient.users.getUser(userId);

    const userEmail =
      user.emailAddresses?.[0]?.emailAddress?.toLowerCase();

    // allowed admin emails from env
    const adminEmails = process.env.ADMIN_EMAILS
      ?.split(",")
      .map((e) => e.trim().toLowerCase());

    const isAdmin = adminEmails?.includes(userEmail);

    return res.json({
      success: true,
      isAdmin,
    });
  } catch (error) {
    console.error("IS ADMIN ERROR:", error);
    return res.status(500).json({
      success: false,
      isAdmin: false,
    });
  }
};

/* =====================================================
   DASHBOARD DATA (NO TIME FILTER – FIXED)
   ===================================================== */
export const getDashboardData = async (req, res) => {
  try {
    await connectDB();

    const bookings = await Booking.find({ isPaid: true }).lean();

    // 🔥 FIX: DO NOT FILTER BY isActive
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() }, // future shows only
    })
      .populate("movie")
      .sort({ showDateTime: 1 })
      .lean();

    const totalUser = await User.countDocuments();

    res.json({
      success: true,
      dashboardData: {
        totalBookings: bookings.length,
        totalRevenue: bookings.reduce(
          (sum, b) => sum + Number(b.amount || 0),
          0
        ),
        activeShows, // ✅ NOW RETURNS DATA
        totalUser,
      },
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ success: false });
  }
};

/* =====================================================
   ADD SHOW
   ===================================================== */
export const addShow = async (req, res) => {
  try {
    await connectDB();

    const { movie, showDateTimes, showPrice } = req.body;

    if (
      !movie?.id ||
      !Array.isArray(showDateTimes) ||
      showDateTimes.length === 0 ||
      !showPrice
    ) {
      return res.status(400).json({ success: false });
    }

    let savedMovie = await Movie.findOne({ tmdbId: movie.id });

    if (!savedMovie) {
      savedMovie = await Movie.create({
        tmdbId: movie.id,
        title: movie.title || "Untitled",
        overview: movie.overview || "",
        poster_path: movie.poster_path || "",
        backdrop_path: movie.backdrop_path || "",
        release_date: movie.release_date || "",
        vote_average: movie.vote_average || 0,
        vote_count: movie.vote_count || 0,
      });
    }

    const shows = showDateTimes.map((dt) => ({
      movie: savedMovie._id,
      showDateTime: new Date(dt),
      showPrice: Number(showPrice),
      isActive: true,
    }));

    await Show.insertMany(shows);

    return res.json({ success: true });
  } catch (error) {
    console.error("ADD SHOW ERROR:", error);
    return res.status(500).json({ success: false });
  }
};

/* =====================================================
   ALL SHOWS
   ===================================================== */
export const getAllShows = async (req, res) => {
  try {
    await connectDB();

    const shows = await Show.find().populate("movie");
    return res.json({ success: true, shows });
  } catch (error) {
    console.error("GET ALL SHOWS ERROR:", error);
    return res.status(500).json({ success: false });
  }
};

/* =====================================================
   ALL BOOKINGS
   ===================================================== */
export const getAllBookings = async (req, res) => {
  try {
    await connectDB();

    const bookings = await Booking.find({ isPaid: true })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      bookings: [],
    });
  }
};
