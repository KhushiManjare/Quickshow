
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import { clerkClient } from "@clerk/express";

/* ================= GET USER BOOKINGS ================= */
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.auth; // ✅ CORRECT WAY

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const bookings = await Booking.find({ user: userId })
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
      message: "Failed to fetch bookings",
    });
  }
};
/* ================= UPDATE FAVORITE ================= */
export const updateFavorite = async (req, res) => {
  try {
    const userId = req.headers["x-clerk-user-id"];
    const { movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json({ success: false });
    }

    const user = await clerkClient.users.getUser(userId);

    const favorites = Array.isArray(user.privateMetadata?.favorites)
      ? user.privateMetadata.favorites
      : [];

    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter(id => id !== movieId)
      : [...favorites, movieId];

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        ...user.privateMetadata,
        favorites: updatedFavorites,
      },
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("UPDATE FAVORITE ERROR:", error);
    return res.status(500).json({ success: false });
  }
};

/* ================= GET FAVORITES ================= */
export const getFavorites = async (req, res) => {
  try {
    const userId = req.headers["x-clerk-user-id"];

    if (!userId) {
      return res.json({ success: true, movies: [] });
    }

    const user = await clerkClient.users.getUser(userId);

    const favorites = Array.isArray(user.privateMetadata?.favorites)
      ? user.privateMetadata.favorites
          .map(id => Number(id))
          .filter(Number.isFinite)
      : [];

    if (favorites.length === 0) {
      return res.json({ success: true, movies: [] });
    }

    const movies = await Movie.find({
      tmdbId: { $in: favorites },
    });

    return res.json({ success: true, movies });
  } catch (error) {
    console.error("GET FAVORITES ERROR:", error);
    return res.status(500).json({
      success: false,
      movies: [],
    });
  }
};
