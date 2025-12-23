// import { clerkClient } from "@clerk/express";
// import Booking from "../models/Booking.js";
// import Movie from "../models/Movie.js";

// // API Controller Function to Get User Bookings
// export const getUserBookings = async (req, res) => {
//   try {
//     const userId = req.auth().userId;

//     const bookings = await Booking.find({ user: userId })
//       .populate({
//         path: "show",
//         populate: {
//           path: "movie",
//           model: "Movie",
//         },
//       })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error("GET BOOKINGS ERROR:", error);
//     res.json({ success: false, message: error.message });
//   }
// };


// // API Controller Function to Update Favorite Movie in Clerk User Metadata
// export const updateFavorite = async (req, res) => {
//   try {
//     const { movieId } = req.body;
//     const userId = req.auth().userId;

//     const user = await clerkClient.users.getUser(userId);

//     if (!user.privateMetadata.favorites) {
//       user.privateMetadata.favorites = [];
//     }

//     if (!user.privateMetadata.favorites.includes(movieId)) {
//       user.privateMetadata.favorites.push(movieId);
//     } else {
//       user.privateMetadata.favorites = user.privateMetadata.favorites.filter(
//         (item) => item !== movieId
//       );
//     }

//     await clerkClient.users.updateUserMetadata(userId, {
//       privateMetadata: user.privateMetadata,
//     });

//     res.json({ success: true, message: "Favorite movies updated" });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // API Controller Function to Get Favorite Movies from Clerk User Metadata
// export const getFavorites = async (req, res) => {
//   try {
//     const user = await clerkClient.users.getUser(req.auth().userId);
//     const favorites = user.privateMetadata.favorites;

//     // Getting movies from database
//     const movies = await Movie.find({
//   tmdbId: { $in: favorites.map(Number) },
// });

//     res.json({ success: true, movies });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };
import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import axios from "axios";


/* ================= GET USER BOOKINGS ================= */
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth()?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "Movie",
        },
      })
      .sort({ createdAt: -1 });

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
    const userId = req.auth()?.userId;
    const { movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    // Ensure favorites array exists
    const favorites = Array.isArray(user.privateMetadata?.favorites)
      ? user.privateMetadata.favorites
      : [];

    let updatedFavorites;

    if (favorites.includes(movieId)) {
      // Remove favorite
      updatedFavorites = favorites.filter((id) => id !== movieId);
    } else {
      // Add favorite (TMDB ID)
      updatedFavorites = [...favorites, movieId];
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        ...user.privateMetadata,
        favorites: updatedFavorites,
      },
    });

    return res.json({
      success: true,
      message: "Favorite movies updated",
    });
  } catch (error) {
    console.error("UPDATE FAVORITE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update favorites",
    });
  }
};

/* ================= GET FAVORITES ================= */


export const getFavorites = async (req, res) => {
  try {
    const userId = req.auth()?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await clerkClient.users.getUser(userId);

    // 1️⃣ Read raw favorites
    const rawFavorites = Array.isArray(user.privateMetadata?.favorites)
      ? user.privateMetadata.favorites
      : [];

    // 2️⃣ Convert + FILTER invalid values
    const favorites = rawFavorites
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id));

    // 🔥 If nothing valid remains
    if (favorites.length === 0) {
      return res.json({
        success: true,
        movies: [],
      });
    }

    // 3️⃣ Find movies already in DB
    let movies = await Movie.find({
      tmdbId: { $in: favorites },
    });

    const existingIds = movies.map((m) => m.tmdbId);

    // 4️⃣ Find missing TMDB IDs
    const missingIds = favorites.filter(
      (id) => !existingIds.includes(id)
    );

    // 5️⃣ Fetch missing movies from TMDB & save
    for (const tmdbId of missingIds) {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${tmdbId}`,
          {
            params: {
              api_key: process.env.TMDB_API_KEY,
              language: "en-US",
            },
            timeout: 8000,
          }
        );

        const newMovie = await Movie.create({
          tmdbId: data.id,
          title: data.title,
          overview: data.overview,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          release_date: data.release_date,
          vote_average: data.vote_average,
          vote_count: data.vote_count,
          popularity: data.popularity,
          runtime: data.runtime,
          genres: data.genres,
        });

        movies.push(newMovie);
      } catch (err) {
        console.error("TMDB FETCH FAILED FOR:", tmdbId);
      }
    }

    return res.json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("GET FAVORITES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch favorites",
    });
  }
};
