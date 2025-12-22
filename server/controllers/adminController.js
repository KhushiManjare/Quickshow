// // // // import Booking from "../models/Booking.js";
// // // // import Show from "../models/Show.js";
// // // // import User from "../models/User.js";
// // // // import Movie from "../models/Movie.js";

// // // // /* ================= ADMIN CHECK ================= */
// // // // export const isAdmin = async (req, res) => {
// // // //   res.json({ success: true, isAdmin: true });
// // // // };

// // // // /* ================= DASHBOARD ================= */
// // // // export const getDashboardData = async (req, res) => {
// // // //   try {
// // // //     const bookings = await Booking.find({ isPaid: true });
// // // //     const activeShows = await Show.find({
// // // //       showDateTime: { $gte: new Date() },
// // // //     }).populate("movie");

// // // //     const totalUser = await User.countDocuments();

// // // //     res.json({
// // // //       success: true,
// // // //       dashboardData: {
// // // //         totalBookings: bookings.length,
// // // //         totalRevenue: bookings.reduce((a, b) => a + b.amount, 0),
// // // //         activeShows,
// // // //         totalUser,
// // // //       },
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("Dashboard Error:", err);
// // // //     res.status(500).json({ success: false });
// // // //   }
// // // // };

// // // // /* ================= ADD SHOW ================= */
// // // // export const addShow = async (req, res) => {
// // // //   try {
// // // //     const { movie, showDateTimes, showPrice } = req.body;

// // // //     if (!movie || !showDateTimes?.length || !showPrice) {
// // // //       return res.status(400).json({ success: false });
// // // //     }

// // // //     let savedMovie = await Movie.findOne({ tmdbId: movie.id });

// // // //     if (!savedMovie) {
// // // //       savedMovie = await Movie.create({
// // // //         tmdbId: movie.id,
// // // //         title: movie.title,
// // // //         overview: movie.overview,
// // // //         poster_path: movie.poster_path,
// // // //         backdrop_path: movie.backdrop_path,
// // // //         release_date: movie.release_date,
// // // //         vote_average: movie.vote_average,
// // // //         vote_count: movie.vote_count,
// // // //       });
// // // //     }

// // // //     const shows = showDateTimes.map((dt) => ({
// // // //       movie: savedMovie._id,
// // // //       showDateTime: new Date(dt),
// // // //       showPrice,
// // // //     }));

// // // //     await Show.insertMany(shows);

// // // //     res.json({ success: true, message: "Show added successfully" });
// // // //   } catch (err) {
// // // //     console.error("Add Show Error:", err);
// // // //     res.status(500).json({ success: false });
// // // //   }
// // // // };

// // // // /* ================= ALL SHOWS ================= */
// // // // export const getAllShows = async (req, res) => {
// // // //   try {
// // // //     const shows = await Show.find().populate("movie");
// // // //     res.json({ success: true, shows });
// // // //   } catch {
// // // //     res.status(500).json({ success: false });
// // // //   }
// // // // };

// // // // /* ================= BOOKINGS ================= */
// // // // export const getAllBookings = async (req, res) => {
// // // //   try {
// // // //     const bookings = await Booking.find()
// // // //       .populate("user")
// // // //       .populate({ path: "show", populate: "movie" });

// // // //     res.json({ success: true, bookings });
// // // //   } catch {
// // // //     res.status(500).json({ success: false });
// // // //   }
// // // // };
// // // import Booking from "../models/Booking.js";
// // // import Show from "../models/Show.js";
// // // import User from "../models/User.js";
// // // import Movie from "../models/Movie.js";

// // // /* ================= ADMIN CHECK ================= */
// // // export const isAdmin = async (req, res) => {
// // //   return res.json({ success: true, isAdmin: true });
// // // };

// // // /* ================= DASHBOARD ================= */
// // // export const getDashboardData = async (req, res) => {
// // //   try {
// // //     const bookings = await Booking.find({ isPaid: true });
// // //     const activeShows = await Show.find({
// // //       showDateTime: { $gte: new Date() },
// // //     }).populate("movie");

// // //     const totalUser = await User.countDocuments();

// // //     res.json({
// // //       success: true,
// // //       dashboardData: {
// // //         totalBookings: bookings.length,
// // //         totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
// // //         activeShows,
// // //         totalUser,
// // //       },
// // //     });
// // //   } catch (err) {
// // //     console.error("Dashboard Error:", err);
// // //     res.status(500).json({ success: false });
// // //   }
// // // };

// // // /* ================= ADD SHOW (AUTO-RECREATE MOVIE) ================= */
// // // export const addShow = async (req, res) => {
// // //   try {
// // //     const { movie, showDateTimes, showPrice } = req.body;

// // //     if (
// // //       !movie ||
// // //       !movie.id ||
// // //       !Array.isArray(showDateTimes) ||
// // //       showDateTimes.length === 0 ||
// // //       !showPrice
// // //     ) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Invalid data",
// // //       });
// // //     }

// // //     let savedMovie = await Movie.findOne({ tmdbId: movie.id });

// // //     if (!savedMovie) {
// // //       savedMovie = await Movie.create({
// // //         tmdbId: movie.id,
// // //         title: movie.title,
// // //         overview: movie.overview || "",
// // //         poster_path: movie.poster_path || "",
// // //         backdrop_path: movie.backdrop_path || "",
// // //         release_date: movie.release_date || null,
// // //         vote_average: movie.vote_average || 0,
// // //         vote_count: movie.vote_count || 0,
// // //         original_language: movie.original_language || "en",
// // //         genres: movie.genres || [],
// // //       });
// // //     }

// // //     const shows = showDateTimes.map((dt) => ({
// // //       movie: savedMovie._id,
// // //       showDateTime: new Date(dt),
// // //       showPrice: Number(showPrice),
// // //       isActive: true,
// // //     }));

// // //     await Show.insertMany(shows);

// // //     res.json({
// // //       success: true,
// // //       message: "Show added successfully",
// // //     });
// // //   } catch (err) {
// // //     console.error("ADD SHOW ERROR:", err);
// // //     res.status(500).json({ success: false });
// // //   }
// // // };

// // // /* ================= ALL SHOWS ================= */
// // // export const getAllShows = async (req, res) => {
// // //   try {
// // //     const shows = await Show.find().populate("movie");
// // //     res.json({ success: true, shows });
// // //   } catch {
// // //     res.status(500).json({ success: false });
// // //   }
// // // };

// // // /* ================= ALL BOOKINGS ================= */
// // // export const getAllBookings = async (req, res) => {
// // //   try {
// // //     const bookings = await Booking.find()
// // //       .populate("user")
// // //       .populate({ path: "show", populate: "movie" });

// // //     res.json({ success: true, bookings });
// // //   } catch {
// // //     res.status(500).json({ success: false });
// // //   }
// // // };
// // import Booking from "../models/Booking.js";
// // import Show from "../models/Show.js";
// // import User from "../models/User.js";
// // import Movie from "../models/Movie.js";

// // /* ================= ADMIN CHECK ================= */
// // export const isAdmin = async (req, res) => {
// //   return res.json({ success: true, isAdmin: true });
// // };

// // /* ================= DASHBOARD ================= */
// // export const getDashboardData = async (req, res) => {
// //   try {
// //     const bookings = await Booking.find({ isPaid: true });
// //     const activeShows = await Show.find({
// //       showDateTime: { $gte: new Date() },
// //     }).populate("movie");

// //     const totalUser = await User.countDocuments();

// //     res.json({
// //       success: true,
// //       dashboardData: {
// //         totalBookings: bookings.length,
// //         totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
// //         activeShows,
// //         totalUser,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Dashboard Error:", err);
// //     res.status(500).json({ success: false });
// //   }
// // };

// // /* ================= ADD SHOW (FIXED & BULLETPROOF) ================= */
// // export const addShow = async (req, res) => {
// //   try {
// //     const { movie, showDateTimes, showPrice } = req.body;

// //     if (
// //       !movie ||
// //       !movie.id ||
// //       !Array.isArray(showDateTimes) ||
// //       showDateTimes.length === 0 ||
// //       !showPrice
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid data",
// //       });
// //     }

// //     let savedMovie = await Movie.findOne({ tmdbId: movie.id });

// //     if (!savedMovie) {
// //       savedMovie = await Movie.create({
// //         tmdbId: movie.id,
// //         title: movie.title || "Untitled Movie",
// //         overview: movie.overview || "",
// //         poster_path: movie.poster_path || "",
// //         backdrop_path: movie.backdrop_path || "",
// //         release_date: movie.release_date || "",
// //         vote_average: movie.vote_average || 0,
// //         vote_count: movie.vote_count || 0,
// //         popularity: movie.popularity || 0,
// //         runtime: movie.runtime || null,
// //         genres: movie.genres || [],
// //       });
// //     }

// //     const shows = showDateTimes.map((dt) => ({
// //       movie: savedMovie._id,
// //       showDateTime: new Date(dt),
// //       showPrice: Number(showPrice),
// //       isActive: true,
// //     }));

// //     await Show.insertMany(shows);

// //     res.json({
// //       success: true,
// //       message: "Show added successfully",
// //     });
// //   } catch (err) {
// //     console.error("ADD SHOW ERROR:", err);
// //     res.status(500).json({ success: false });
// //   }
// // };

// // /* ================= ALL SHOWS ================= */
// // export const getAllShows = async (req, res) => {
// //   try {
// //     const shows = await Show.find().populate("movie");
// //     res.json({ success: true, shows });
// //   } catch {
// //     res.status(500).json({ success: false });
// //   }
// // };

// // /* ================= ALL BOOKINGS ================= */
// // export const getAllBookings = async (req, res) => {
// //   try {
// //     const bookings = await Booking.find()
// //       .populate({ path: "show", populate: "movie" });

// //     res.json({ success: true, bookings });
// //   } catch {
// //     res.status(500).json({ success: false });
// //   }
// // };
// import Booking from "../models/Booking.js";
// import Show from "../models/Show.js";
// import User from "../models/User.js";
// import Movie from "../models/Movie.js";

// /* ================= ADMIN CHECK ================= */
// export const isAdmin = async (req, res) => {
//   try {
//     // if token reached here → admin verified by middleware
//     return res.json({ success: true, isAdmin: true });
//   } catch (err) {
//     return res.status(401).json({ success: false, isAdmin: false });
//   }
// };

// /* ================= DASHBOARD ================= */
// export const getDashboardData = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ isPaid: true });

//     const activeShows = await Show.find({
//       showDateTime: { $gte: new Date() },
//     })
//       .populate("movie")
//       .lean();

//     const totalUser = await User.countDocuments();

//     res.json({
//       success: true,
//       dashboardData: {
//         totalBookings: bookings.length,
//         totalRevenue: bookings.reduce(
//           (sum, b) => sum + Number(b.amount || 0),
//           0
//         ),
//         activeShows: activeShows.filter((s) => s.movie),
//         totalUser,
//       },
//     });
//   } catch (err) {
//     console.error("Dashboard Error:", err.message);
//     res.status(500).json({ success: false, message: "Dashboard failed" });
//   }
// };

// /* ================= ADD SHOW ================= */
// export const addShow = async (req, res) => {
//   try {
//     const { movie, showDateTimes, showPrice } = req.body;

//     if (!movie?.id || !Array.isArray(showDateTimes) || !showPrice) {
//       return res.status(400).json({ success: false, message: "Invalid data" });
//     }

//     let savedMovie = await Movie.findOne({ tmdbId: movie.id });

//     if (!savedMovie) {
//       savedMovie = await Movie.create({
//         tmdbId: movie.id,
//         title: movie.title || "Untitled",
//         overview: movie.overview || "",
//         poster_path: movie.poster_path || "",
//         backdrop_path: movie.backdrop_path || "",
//         release_date: movie.release_date || "",
//         vote_average: movie.vote_average || 0,
//         vote_count: movie.vote_count || 0,
//         popularity: movie.popularity || 0,
//         runtime: movie.runtime || null,
//         genres: movie.genres || [],
//       });
//     }

//     const shows = showDateTimes.map((dt) => ({
//       movie: savedMovie._id,
//       showDateTime: new Date(dt),
//       showPrice: Number(showPrice),
//       isActive: true,
//     }));

//     await Show.insertMany(shows);

//     res.json({ success: true, message: "Show added successfully" });
//   } catch (err) {
//     console.error("ADD SHOW ERROR:", err.message);
//     res.status(500).json({ success: false });
//   }
// };

// /* ================= ALL SHOWS ================= */
// export const getAllShows = async (req, res) => {
//   try {
//     const shows = await Show.find().populate("movie");
//     res.json({ success: true, shows });
//   } catch {
//     res.status(500).json({ success: false });
//   }
// };

// /* ================= ALL BOOKINGS ================= */
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate({
//       path: "show",
//       populate: "movie",
//     });

//     res.json({ success: true, bookings });
//   } catch {
//     res.status(500).json({ success: false });
//   }
// };
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";

/* =====================================================
   ADMIN CHECK (SECURE – EMAIL BASED)
   ===================================================== */
export const isAdmin = async (req, res) => {
  try {
    const { sessionClaims } = req.auth();

    if (!sessionClaims) {
      return res.json({ success: true, isAdmin: false });
    }

    // Clerk may expose email in different keys
    const email =
      sessionClaims.email ||
      sessionClaims.email_address ||
      sessionClaims.primary_email ||
      sessionClaims?.user?.email;

    // 🔐 CHANGE THIS TO YOUR EMAIL
    const ADMIN_EMAIL = "khushimanjare65@gmail.com";

    const isAdmin = email === ADMIN_EMAIL;

    return res.json({
      success: true,
      isAdmin,
    });
  } catch (error) {
    console.error("IS ADMIN ERROR:", error.message);
    return res.json({
      success: true,
      isAdmin: false,
    });
  }
};

/* =====================================================
   DASHBOARD DATA
   ===================================================== */
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true }).lean();

    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
      isActive: true,
    })
      .populate("movie")
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
        activeShows: activeShows.filter((s) => s.movie),
        totalUser,
      },
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

/* =====================================================
   ADD SHOW (SAFE & BULLETPROOF)
   ===================================================== */
export const addShow = async (req, res) => {
  try {
    const { movie, showDateTimes, showPrice } = req.body;

    if (
      !movie?.id ||
      !Array.isArray(showDateTimes) ||
      showDateTimes.length === 0 ||
      !showPrice
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid show data",
      });
    }

    let savedMovie = await Movie.findOne({ tmdbId: movie.id });

    if (!savedMovie) {
      savedMovie = await Movie.create({
        tmdbId: movie.id,
        title: movie.title || "Untitled Movie",
        overview: movie.overview || "",
        poster_path: movie.poster_path || "",
        backdrop_path: movie.backdrop_path || "",
        release_date: movie.release_date || "",
        vote_average: movie.vote_average || 0,
        vote_count: movie.vote_count || 0,
        popularity: movie.popularity || 0,
        runtime: movie.runtime || null,
        genres: movie.genres || [],
      });
    }

    const shows = showDateTimes.map((dt) => ({
      movie: savedMovie._id,
      showDateTime: new Date(dt),
      showPrice: Number(showPrice),
      isActive: true,
    }));

    await Show.insertMany(shows);

    res.json({
      success: true,
      message: "Show added successfully",
    });
  } catch (err) {
    console.error("ADD SHOW ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to add show",
    });
  }
};

/* =====================================================
   ALL SHOWS
   ===================================================== */
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find().populate("movie");
    res.json({ success: true, shows });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load shows",
    });
  }
};

/* =====================================================
   ALL BOOKINGS
   ===================================================== */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate({
      path: "show",
      populate: "movie",
    });

    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load bookings",
    });
  }
};
