// // // // // // import axios from "axios";

// // // // // // /**
// // // // // //  * GET NOW PLAYING MOVIES FROM TMDB
// // // // // //  * PUBLIC API (NO AUTH)
// // // // // //  */
// // // // // // export const getNowPlayingMovies = async (req, res) => {
// // // // // //   try {
// // // // // //     const response = await axios.get(
// // // // // //       "https://api.themoviedb.org/3/movie/now_playing",
// // // // // //       {
// // // // // //         headers: {
// // // // // //           Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
// // // // // //           Accept: "application/json",
// // // // // //         },
// // // // // //         params: {
// // // // // //           language: "en-US",
// // // // // //           page: 1,
// // // // // //         },
// // // // // //       }
// // // // // //     );

// // // // // //     res.status(200).json({
// // // // // //       success: true,
// // // // // //       movies: response.data.results,
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("TMDB ERROR:", error.response?.data || error.message);

// // // // // //     res.status(500).json({
// // // // // //       success: false,
// // // // // //       message: "Failed to fetch movies from TMDB",
// // // // // //     });
// // // // // //   }
// // // // // // };
// // // // // import axios from "axios";

// // // // // /**
// // // // //  * GET NOW PLAYING MOVIES FROM TMDB
// // // // //  * PUBLIC API (NO AUTH)
// // // // //  */
// // // // // export const getNowPlayingMovies = async (req, res) => {
// // // // //   try {
// // // // //     const response = await axios.get(
// // // // //       "https://api.themoviedb.org/3/movie/now_playing",
// // // // //       {
// // // // //         params: {
// // // // //           api_key: process.env.TMDB_API_KEY, // ✅ CORRECT WAY
// // // // //           language: "en-US",
// // // // //           page: 1,
// // // // //         },
// // // // //       }
// // // // //     );

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       movies: response.data.results,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("TMDB ERROR:", error.response?.data || error.message);

// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Failed to fetch movies from TMDB",
// // // // //     });
// // // // //   }
// // // // // };
// // // // // export const getMovieWithShows = async (req, res) => {
// // // // //   try {
// // // // //     const { movieId } = req.params;

// // // // //     const movie = await Movie.findById(movieId);
// // // // //     if (!movie) {
// // // // //       return res.status(404).json({ success: false });
// // // // //     }

// // // // //     const shows = await Show.find({ movie: movieId })
// // // // //       .sort({ showDateTime: 1 });

// // // // //     res.json({
// // // // //       success: true,
// // // // //       movie,
// // // // //       shows,
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error("MOVIE DETAILS ERROR:", err);
// // // // //     res.status(500).json({ success: false });
// // // // //   }
// // // // // };
// // // // // import axios from "axios";
// // // // // import Movie from "../models/Movie.js";
// // // // // import Show from "../models/Show.js";

// // // // // /**
// // // // //  * GET NOW PLAYING MOVIES FROM TMDB
// // // // //  * PUBLIC API (NO AUTH)
// // // // //  */
// // // // // export const getNowPlayingMovies = async (req, res) => {
// // // // //   try {
// // // // //     const response = await axios.get(
// // // // //       "https://api.themoviedb.org/3/movie/now_playing",
// // // // //       {
// // // // //         params: {
// // // // //           api_key: process.env.TMDB_API_KEY,
// // // // //           language: "en-US",
// // // // //           page: 1,
// // // // //         },
// // // // //       }
// // // // //     );

// // // // //     res.status(200).json({
// // // // //       success: true,
// // // // //       movies: response.data.results,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("TMDB ERROR:", error.response?.data || error.message);
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Failed to fetch movies from TMDB",
// // // // //     });
// // // // //   }
// // // // // };

// // // // // /**
// // // // //  * GET SHOWS FOR A MOVIE (BY TMDB ID)
// // // // //  * USED IN MOVIE DETAILS PAGE
// // // // //  */
// // // // // export const getMovieWithShows = async (req, res) => {
// // // // //   try {
// // // // //     const { movieId } = req.params; // TMDB ID

// // // // //     // 🔍 find movie using tmdbId
// // // // //     const movie = await Movie.findOne({ tmdbId: Number(movieId) });

// // // // //     if (!movie) {
// // // // //       return res.status(404).json({
// // // // //         success: false,
// // // // //         message: "Movie not found",
// // // // //       });
// // // // //     }

// // // // //     // 🎬 find all shows for that movie
// // // // //     const shows = await Show.find({ movie: movie._id })
// // // // //       .sort({ showDateTime: 1 });

// // // // //     res.json({
// // // // //       success: true,
// // // // //       shows,
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error("MOVIE SHOW ERROR:", err);
// // // // //     res.status(500).json({
// // // // //       success: false,
// // // // //       message: "Failed to fetch movie shows",
// // // // //     });
// // // // //   }
// // // // // };
// // // //   import axios from "axios";
// // // // import Movie from "../models/Movie.js";
// // // // import Show from "../models/Show.js";

// // // // /**
// // // //  * GET NOW PLAYING MOVIES FROM TMDB
// // // //  * PUBLIC API
// // // //  */
// // // // export const getNowPlayingMovies = async (req, res) => {
// // // //   try {
// // // //     const response = await axios.get(
// // // //       "https://api.themoviedb.org/3/movie/now_playing",
// // // //       {
// // // //         params: {
// // // //           api_key: process.env.TMDB_API_KEY,
// // // //           language: "en-US",
// // // //           page: 1,
// // // //         },
// // // //       }
// // // //     );

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       movies: response.data.results,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("TMDB ERROR:", error.response?.data || error.message);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to fetch movies from TMDB",
// // // //     });
// // // //   }
// // // // };

// // // // /**
// // // //  * GET SHOW DATES FOR A MOVIE (USING TMDB ID)
// // // //  */
// // // // export const getMovieWithShows = async (req, res) => {
// // // //   try {
// // // //     const { movieId } = req.params;

// // // //     console.log("🔥 TMDB ID RECEIVED:", movieId);

// // // //     // ✅ HANDLE STRING + NUMBER BOTH
// // // //     const movie = await Movie.findOne({
// // // //       tmdbId: { $in: [Number(movieId), movieId] },
// // // //     });

// // // //     console.log("🎬 MOVIE FOUND:", movie?._id);

// // // //     if (!movie) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: "Movie not found in DB",
// // // //       });
// // // //     }

// // // //     const shows = await Show.find({ movie: movie._id }).sort({
// // // //       showDateTime: 1,
// // // //     });

// // // //     console.log("🗓 SHOWS FOUND:", shows.length);

// // // //     res.json({
// // // //       success: true,
// // // //       shows,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("MOVIE SHOW ERROR:", err);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to fetch movie shows",
// // // //     });
// // // //   }
// // // // };



// // // import axios from "axios";
// // // import Movie from "../models/Movie.js";
// // // import Show from "../models/Show.js";
// // // import mongoose from "mongoose";

// // // /* ================= NOW PLAYING (TMDB) ================= */
// // // export const getNowPlayingMovies = async (req, res) => {
// // //   try {
// // //     const response = await axios.get(
// // //       "https://api.themoviedb.org/3/movie/now_playing",
// // //       {
// // //         params: {
// // //           api_key: process.env.TMDB_API_KEY,
// // //           language: "en-US",
// // //           page: 1,
// // //         },
// // //       }
// // //     );

// // //     res.json({
// // //       success: true,
// // //       movies: response.data.results,
// // //     });
// // //   } catch (error) {
// // //     console.error("TMDB ERROR:", error.message);
// // //     res.status(500).json({ success: false });
// // //   }
// // // };

// // // /* ================= MOVIE → SHOW DATES ================= */
// // // export const getMovieWithShows = async (req, res) => {
// // //   try {
// // //     const { movieId } = req.params;

// // //     let movie = null;

// // //     // 🔥 CASE 1: TMDB ID
// // //     if (!mongoose.Types.ObjectId.isValid(movieId)) {
// // //       movie = await Movie.findOne({ tmdbId: Number(movieId) });
// // //     }

// // //     // 🔥 CASE 2: Mongo ObjectId
// // //     if (!movie && mongoose.Types.ObjectId.isValid(movieId)) {
// // //       movie = await Movie.findById(movieId);
// // //     }

// // //     if (!movie) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "Movie not found in DB",
// // //       });
// // //     }

// // //     const shows = await Show.find({ movie: movie._id }).sort({
// // //       showDateTime: 1,
// // //     });

// // //     res.json({
// // //       success: true,
// // //       shows,
// // //     });
// // //   } catch (error) {
// // //     console.error("SHOW FETCH ERROR:", error);
// // //     res.status(500).json({
// // //       success: false,
// // //       message: "Server error",
// // //     });
// // //   }
// // // };
// // import axios from "axios";
// // import Movie from "../models/Movie.js";
// // import Show from "../models/Show.js";

// // /* ================= TMDB NOW PLAYING ================= */
// // export const getNowPlayingMovies = async (req, res) => {
// //   try {
// //     const response = await axios.get(
// //       "https://api.themoviedb.org/3/movie/now_playing",
// //       {
// //         params: {
// //           api_key: process.env.TMDB_API_KEY,
// //           language: "en-US",
// //           page: 1,
// //         },
// //         timeout: 8000,
// //       }
// //     );

// //     return res.json({
// //       success: true,
// //       movies: response.data.results || [],
// //     });
// //   } catch (error) {
// //     console.error("TMDB ERROR:", error.message);
// //     return res.status(500).json({
// //       success: false,
// //       message: "TMDB fetch failed",
// //     });
// //   }
// // };

// // /* ================= SHOW DATES FOR MOVIE ================= */
// // /**
// //  * movieId = TMDB ID
// //  */
// // export const getMovieWithShows = async (req, res) => {
// //   try {
// //     const { movieId } = req.params;

// //     if (!movieId || isNaN(movieId)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid movie id",
// //       });
// //     }

// //     // 🔑 FIND MOVIE USING tmdbId
// //     const movie = await Movie.findOne({ tmdbId: Number(movieId) });

// //     if (!movie) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Movie not found in DB",
// //       });
// //     }

// //     // 🎬 FETCH SHOWS
// //     const shows = await Show.find({ movie: movie._id })
// //       .sort({ showDateTime: 1 })
// //       .lean();

// //     return res.json({
// //       success: true,
// //       shows,
// //     });
// //   } catch (error) {
// //     console.error("SHOW FETCH ERROR:", error.message);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //     });
// //   }
// // };
// // export const getMovieCast = async (req, res) => {
// //   try {
// //     const { movieId } = req.params;

// //     const response = await axios.get(
// //       `https://api.themoviedb.org/3/movie/${movieId}/credits`,
// //       {
// //         params: {
// //           api_key: process.env.TMDB_API_KEY,
// //         },
// //         timeout: 8000,
// //       }
// //     );

// //     res.json({
// //       success: true,
// //       cast: response.data.cast || [],
// //     });
// //   } catch (error) {
// //     console.error("CAST FETCH ERROR:", error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch cast",
// //     });
// //   }
// // };
// import axios from "axios";
// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";

// /* ================= TMDB NOW PLAYING ================= */
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://api.themoviedb.org/3/movie/now_playing",
//       {
//         params: {
//           api_key: process.env.TMDB_API_KEY,
//           language: "en-US",
//           page: 1,
//         },
//         timeout: 8000,
//       }
//     );

//     return res.json({
//       success: true,
//       movies: response.data.results || [],
//     });
//   } catch (error) {
//     console.error("TMDB ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "TMDB fetch failed",
//     });
//   }
// };

// /* ================= SHOW DATES FOR MOVIE ================= */
// /**
//  * movieId = TMDB ID
//  */
// export const getMovieWithShows = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     if (!movieId || isNaN(movieId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid TMDB movie id",
//       });
//     }

//     const tmdbId = Number(movieId);

//     // 🔑 FIND OR CREATE MOVIE
//     let movie = await Movie.findOne({ tmdbId });

//     if (!movie) {
//       // 🔥 AUTO-CREATE MOVIE IF MISSING
//       movie = await Movie.create({ tmdbId });
//     }

//     // 🎬 FETCH SHOWS
//     const shows = await Show.find({ movie: movie._id })
//       .sort({ showDateTime: 1 })
//       .lean();

//     return res.json({
//       success: true,
//       shows,
//     });
//   } catch (error) {
//     console.error("SHOW FETCH ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// /* ================= MOVIE CAST (TMDB) ================= */
// export const getMovieCast = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     if (!movieId || isNaN(movieId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid TMDB movie id",
//       });
//     }

//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}/credits`,
//       {
//         params: {
//           api_key: process.env.TMDB_API_KEY,
//         },
//         timeout: 8000,
//       }
//     );

//     return res.json({
//       success: true,
//       cast: response.data.cast || [],
//     });
//   } catch (error) {
//     console.error("CAST FETCH ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch cast",
//     });
//   }
// };





// import axios from "axios";
// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";

// /* ================= TMDB NOW PLAYING ================= */
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://api.themoviedb.org/3/movie/now_playing",
//       {
//         params: {
//           api_key: process.env.TMDB_API_KEY,
//           language: "en-US",
//           page: 1,
//         },
//         timeout: 8000,
//       }
//     );

//     return res.json({
//       success: true,
//       movies: response.data.results || [],
//     });
//   } catch (error) {
//     console.error("TMDB ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "TMDB fetch failed",
//     });
//   }
// };

// /* ================= MOVIES THAT HAVE SHOWS ================= */
// export const getMoviesWithShows = async (req, res) => {
//   try {
//     const movieIds = await Show.distinct("movie");

//     const movies = await Movie.find({
//       _id: { $in: movieIds },
//     }).select("tmdbId title poster_path backdrop_path");

//     return res.json({
//       success: true,
//       movies,
//     });
//   } catch (error) {
//     console.error("MOVIES WITH SHOWS ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       movies: [],
//     });
//   }
// };

// /* ================= SHOW DATES FOR MOVIE ================= */
// /**
//  * movieId = TMDB ID
//  * Auto-creates shows if none exist
//  */
// export const getMovieWithShows = async (req, res) => {
//   console.log("movieId param =", req.params.movieId);

//   try {
//     const tmdbId = Number(req.params.movieId);
//     if (!tmdbId) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid movie id",
//       });
//     }

//     /* 1️⃣ Find or create movie */
//     let movie = await Movie.findOne({ tmdbId });
//     if (!movie) {
//       movie = await Movie.create({ tmdbId });
//     }

//     /* 2️⃣ Find shows */
//     let showsFromDb = await Show.find({
//       movie: movie._id,
//       isActive: true,
//     }).sort({ showDateTime: 1 });

//     /* 3️⃣ Auto-create shows if none exist */
//     if (showsFromDb.length === 0) {
//       const today = new Date();

//       const autoShows = [
//         {
//           movie: movie._id,
//           showDateTime: new Date(
//             today.getFullYear(),
//             today.getMonth(),
//             today.getDate(),
//             15,
//             15
//           ),
//           showPrice: 250,
//           isActive: true,
//         },
//         {
//           movie: movie._id,
//           showDateTime: new Date(
//             today.getFullYear(),
//             today.getMonth(),
//             today.getDate(),
//             18,
//             30
//           ),
//           showPrice: 300,
//           isActive: true,
//         },
//       ];

//       await Show.insertMany(autoShows);

//       showsFromDb = await Show.find({
//         movie: movie._id,
//         isActive: true,
//       }).sort({ showDateTime: 1 });
//     }

//     /* 4️⃣ Format for UI */
//     const grouped = {};

//     showsFromDb.forEach((s) => {
//       const date = s.showDateTime.toISOString().split("T")[0];
//       const time = s.showDateTime.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       if (!grouped[date]) grouped[date] = [];

//       grouped[date].push({
//         showId: s._id,
//         time,
//         price: s.showPrice,
//       });
//     });

//     const formattedShows = Object.keys(grouped).map((date) => ({
//       date,
//       shows: grouped[date],
//     }));

//     return res.json({
//       success: true,
//       movie,
//       shows: formattedShows,
//     });
//   } catch (error) {
//     console.error("SHOW FETCH ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       shows: [],
//     });
//   }
// };

// /* ================= MOVIE CAST (TMDB) ================= */
// export const getMovieCast = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     if (!movieId || isNaN(movieId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid TMDB movie id",
//       });
//     }

//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}/credits`,
//       {
//         params: {
//           api_key: process.env.TMDB_API_KEY,
//         },
//         timeout: 8000,
//       }
//     );

//     return res.json({
//       success: true,
//       cast: response.data.cast || [],
//     });
//   } catch (error) {
//     console.error("CAST FETCH ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch cast",
//     });
//   }
// };
// import axios from "axios";
// import Movie from "../models/Movie.js";
// import Show from "../models/Show.js";

// /* ================= TMDB NOW PLAYING ================= */
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://api.themoviedb.org/3/movie/now_playing",
//       {
//         params: {
//           api_key: process.env.TMDB_API_KEY,
//           language: "en-US",
//           page: 1,
//         },
//         timeout: 8000,
//       }
//     );

//     return res.json({
//       success: true,
//       movies: response.data.results || [],
//     });
//   } catch (error) {
//     console.error("TMDB ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "TMDB fetch failed",
//     });
//   }
// };

// /* ================= MOVIES THAT HAVE SHOWS ================= */
// export const getMoviesWithShows = async (req, res) => {
//   try {
//     const movieIds = await Show.distinct("movie");

//     const movies = await Movie.find({
//       _id: { $in: movieIds },
//     }).select("tmdbId title poster_path backdrop_path");

//     return res.json({
//       success: true,
//       movies,
//     });
//   } catch (error) {
//     console.error("MOVIES WITH SHOWS ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       movies: [],
//     });
//   }
// };

// /* ================= SHOW DATES FOR MOVIE ================= */
// /**
//  * movieId = TMDB ID (NUMBER)
//  * Auto-creates REAL shows if none exist
//  */
// export const getMovieWithShows = async (req, res) => {
//   try {
//     const tmdbId = Number(req.params.movieId);

//     if (!tmdbId || isNaN(tmdbId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid movie id",
//       });
//     }

//     /* 1️⃣ Ensure movie exists */
//     let movie = await Movie.findOne({ tmdbId });

//     if (!movie) {
//       movie = await Movie.create({ tmdbId });
//     }

//     /* 2️⃣ Fetch existing shows */
//     let shows = await Show.find({
//       movie: movie._id,
//       // isActive: true,
//     }).sort({ showDateTime: 1 });

//     /* 3️⃣ Auto-create REAL shows if none exist */
//     if (shows.length === 0) {
//       const today = new Date();

//       const newShows = [
//         {
//           movie: movie._id,
//           showDateTime: new Date(
//             today.getFullYear(),
//             today.getMonth(),
//             today.getDate() + 1, // tomorrow
//             15,
//             15
//           ),
//           showPrice: 250,
//           isActive: true,
//         },
//         {
//           movie: movie._id,
//           showDateTime: new Date(
//             today.getFullYear(),
//             today.getMonth(),
//             today.getDate() + 1,
//             18,
//             30
//           ),
//           showPrice: 300,
//           isActive: true,
//         },
//       ];

//       await Show.insertMany(newShows);

//       shows = await Show.find({
//         movie: movie._id,
//         // isActive: true,
//       }).sort({ showDateTime: 1 });
//     }

//     /* 4️⃣ Group shows by date for UI */
//     const grouped = {};

//     shows.forEach((show) => {
//       const date = show.showDateTime.toISOString().split("T")[0];

//       if (!grouped[date]) grouped[date] = [];

//       grouped[date].push({
//         showId: show._id,
//         time: show.showDateTime.toLocaleTimeString("en-IN", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         price: show.showPrice,
//       });
//     });

//     const formattedShows = Object.keys(grouped).map((date) => ({
//       date,
//       shows: grouped[date],
//     }));

//     return res.json({
//       success: true,
//       movie,
//       shows: formattedShows,
//     });
//   } catch (error) {
//     console.error("SHOW FETCH ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       shows: [],
//     });
//   }
// };

// /* ================= MOVIE CAST (TMDB) ================= */
// export const getMovieCast = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     if (!movieId || isNaN(movieId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid TMDB movie id",
//       });
//     }

//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/${movieId}/credits`,
//       {
//         params: {
//           api_key: process.env.TMDB_API_KEY,
//         },
//         timeout: 8000,
//       }
//     );

//     return res.json({
//       success: true,
//       cast: response.data.cast || [],
//     });
//   } catch (error) {
//     console.error("CAST FETCH ERROR:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch cast",
//     });
//   }
// };
import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

/* ================= TMDB NOW PLAYING ================= */
export const getNowPlayingMovies = async (req, res) => {
  try {
    if (!process.env.TMDB_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "TMDB API key missing",
      });
    }

    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "en-US",
          page: 1,
        },
        timeout: 10000,
      }
    );

    return res.status(200).json({
      success: true,
      movies: Array.isArray(response.data.results)
        ? response.data.results
        : [],
    });
  } catch (error) {
    console.error("TMDB ERROR:", error.message);
    return res.status(500).json({
      success: false,
      movies: [],
    });
  }
};

/* ================= MOVIES THAT HAVE SHOWS ================= */
export const getMoviesWithShows = async (req, res) => {
  try {
    const movieIds = await Show.distinct("movie");

    if (!movieIds.length) {
      return res.json({
        success: true,
        movies: [],
      });
    }

    const movies = await Movie.find({
      _id: { $in: movieIds },
    }).select("tmdbId title poster_path backdrop_path");

    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("MOVIES WITH SHOWS ERROR:", error.message);
    return res.status(500).json({
      success: false,
      movies: [],
    });
  }
};

/* ================= SHOW DATES FOR MOVIE ================= */
export const getMovieWithShows = async (req, res) => {
  try {
    const tmdbId = Number(req.params.movieId);

    if (!tmdbId) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie id",
      });
    }

    /* 🔹 Find or create movie (SAFE for serverless) */
    let movie = await Movie.findOne({ tmdbId });

    if (!movie) {
      movie = await Movie.create({ tmdbId });
    }

    /* 🔹 Fetch shows */
    let shows = await Show.find({ movie: movie._id }).sort({
      showDateTime: 1,
    });

    /* 🔹 DO NOT AUTO-CREATE SHOWS ON VERCEL (THIS WAS BREAKING IT) */
    const grouped = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];

      if (!grouped[date]) grouped[date] = [];

      grouped[date].push({
        showId: show._id,
        time: show.showDateTime.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        price: show.showPrice,
      });
    });

    const formattedShows = Object.keys(grouped).map((date) => ({
      date,
      shows: grouped[date],
    }));

    return res.status(200).json({
      success: true,
      movie,
      shows: formattedShows,
    });
  } catch (error) {
    console.error("SHOW FETCH ERROR:", error.message);
    return res.status(500).json({
      success: false,
      shows: [],
    });
  }
};

/* ================= MOVIE CAST ================= */
export const getMovieCast = async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);

    if (!movieId) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie id",
      });
    }

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
        timeout: 10000,
      }
    );

    return res.status(200).json({
      success: true,
      cast: Array.isArray(response.data.cast)
        ? response.data.cast
        : [],
    });
  } catch (error) {
    console.error("CAST FETCH ERROR:", error.message);
    return res.status(500).json({
      success: false,
      cast: [],
    });
  }
};
