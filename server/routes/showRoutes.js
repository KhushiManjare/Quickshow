// // // // import express from "express";
// // // // import fetch from "node-fetch";
// // // // import Show from "../models/Show.js";

// // // // const router = express.Router();

// // // // /* ============================
// // // //    TMDB – NOW PLAYING (PUBLIC)
// // // // ============================ */
// // // // router.get("/now-playing", async (req, res) => {
// // // //   try {
// // // //     const response = await fetch(
// // // //       "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
// // // //       {
// // // //         headers: {
// // // //           Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
// // // //           Accept: "application/json",
// // // //         },
// // // //       }
// // // //     );

// // // //     const data = await response.json();

// // // //     if (!response.ok) {
// // // //       console.error("TMDB ERROR:", data);
// // // //       return res.status(401).json({
// // // //         success: false,
// // // //         message: "TMDB authentication failed",
// // // //       });
// // // //     }

// // // //     res.json({
// // // //       success: true,
// // // //       movies: data.results || [],
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("TMDB FETCH ERROR:", error);
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to fetch movies from TMDB",
// // // //     });
// // // //   }
// // // // });

// // // // /* ============================
// // // //    ALL SHOWS (DB)
// // // // ============================ */
// // // // router.get("/all", async (req, res) => {
// // // //   try {
// // // //     const shows = await Show.find().populate("movie");
// // // //     res.json({ success: true, shows });
// // // //   } catch (error) {
// // // //     res.status(500).json({ success: false });
// // // //   }
// // // // });

// // // // export default router;
// // // import express from "express";
// // // import {
// // //   getNowPlayingMovies,
// // //   getMovieWithShows,
// // // } from "../controllers/showController.js";

// // // const router = express.Router();

// // // // TMDB movies
// // // router.get("/now-playing", getNowPlayingMovies);

// // // // Movie → Show Dates
// // // router.get("/movie/:movieId", getMovieWithShows);

// // // export default router;

// // import express from "express";
// // import {
// //   getNowPlayingMovies,
// //   getMovieWithShows,
// // } from "../controllers/showController.js";

// // const router = express.Router();

// // router.get("/now-playing", getNowPlayingMovies);
// // router.get("/movie/:movieId", getMovieWithShows);
// // router.get("/movie/:movieId/cast", getMovieCast);

// // export default router;



// // import express from "express";
// // import {
// //   getNowPlayingMovies,
// //   getMovieWithShows,
// //   getMovieCast,

// // } from "../controllers/showController.js";

// // const router = express.Router();

// // // TMDB now playing
// // router.get("/now-playing", getNowPlayingMovies);

// // // Movie shows (MongoDB)
// // router.get("/movies-with-shows", getMovieWithShows);


// // // Movie cast (TMDB)
// // router.get("/movie/:movieId/cast", getMovieCast);

// // export default router;

// import express from "express";
// import {
//   getNowPlayingMovies,
//   getMoviesWithShows,
//   getMovieWithShows,
//   getMovieCast,
// } from "../controllers/showController.js";

// const router = express.Router();

// router.get("/now-playing", getNowPlayingMovies);
// router.get("/movies-with-shows", getMoviesWithShows);
// router.get("/movie/:movieId", getMovieWithShows);
// router.get("/movie/:movieId/cast", getMovieCast);

// export default router;
import express from "express";
import {
  getNowPlayingMovies,
  getMoviesWithShows,
  getMovieWithShows,
  getMovieCast,
} from "../controllers/showController.js";

const router = express.Router();

// NOW PLAYING (HOME PAGE)
router.get("/now-playing", getNowPlayingMovies);

// MOVIES THAT HAVE SHOWS
router.get("/movies-with-shows", getMoviesWithShows);

// SHOWS FOR A MOVIE
router.get("/movie/:movieId", getMovieWithShows);

// CAST
router.get("/movie/:movieId/cast", getMovieCast);

export default router;
