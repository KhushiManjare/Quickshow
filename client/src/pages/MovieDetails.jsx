// // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // import { useNavigate, useParams } from "react-router-dom";
// // // // // // // // import BlurCircle from "../components/BlurCircle";
// // // // // // // // import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
// // // // // // // // import timeFormat from "../lib/timeFormat";
// // // // // // // // import DateSelect from "../components/DateSelect";
// // // // // // // // import MovieCard from "../components/MovieCard";
// // // // // // // // import Loading from "../components/Loading";
// // // // // // // // import { useAppContext } from "../context/AppContext";
// // // // // // // // import toast from "react-hot-toast";

// // // // // // // // const MovieDetails = () => {
// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const { id } = useParams(); // TMDB movie id

// // // // // // // //   const {
// // // // // // // //     shows,                 // TMDB movies list
// // // // // // // //     getToken,
// // // // // // // //     user,
// // // // // // // //     fetchFavoriteMovies,
// // // // // // // //     favoriteMovies,
// // // // // // // //     image_base_url,
// // // // // // // //   } = useAppContext();

// // // // // // // //   const [movie, setMovie] = useState(null);

// // // // // // // //   // 🔹 Get movie from TMDB list using id
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!id || !shows.length) return;

// // // // // // // //     const foundMovie = shows.find(
// // // // // // // //       (m) => m.id === Number(id)
// // // // // // // //     );

// // // // // // // //     if (foundMovie) {
// // // // // // // //       setMovie(foundMovie);
// // // // // // // //     }
// // // // // // // //   }, [id, shows]);

// // // // // // // //   // ❤️ Favorite handler (kept as-is)
// // // // // // // //   const handleFavorite = async () => {
// // // // // // // //     try {
// // // // // // // //       if (!user) return toast.error("Please login to proceed");

// // // // // // // //       const { data } = await fetch("/api/user/update-favorite", {
// // // // // // // //         method: "POST",
// // // // // // // //         headers: {
// // // // // // // //           "Content-Type": "application/json",
// // // // // // // //           Authorization: `Bearer ${await getToken()}`,
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify({ movieId: id }),
// // // // // // // //       }).then((res) => res.json());

// // // // // // // //       if (data?.success) {
// // // // // // // //         await fetchFavoriteMovies();
// // // // // // // //         toast.success(data.message);
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.log(error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ⏳ Loading state
// // // // // // // //   if (!movie) return <Loading />;

// // // // // // // //   return (
// // // // // // // //     <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
// // // // // // // //       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
// // // // // // // //         <img
// // // // // // // //           src={image_base_url + movie.poster_path}
// // // // // // // //           alt="poster"
// // // // // // // //           className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
// // // // // // // //         />

// // // // // // // //         <div className="relative flex flex-col gap-3">
// // // // // // // //           <BlurCircle top="-100px" left="-100px" />

// // // // // // // //           <p className="text-primary">ENGLISH</p>

// // // // // // // //           <h1 className="text-4xl font-semibold max-w-96 text-balance">
// // // // // // // //             {movie.title}
// // // // // // // //           </h1>

// // // // // // // //           <div className="flex items-center gap-2 text-gray-300">
// // // // // // // //             <StarIcon className="w-5 h-5 text-primary fill-primary" />
// // // // // // // //             {movie.vote_average?.toFixed(1)} User Rating
// // // // // // // //           </div>

// // // // // // // //           <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
// // // // // // // //             {movie.overview}
// // // // // // // //           </p>

// // // // // // // //           <p className="text-gray-400 text-sm">
// // // // // // // //             {movie.release_date?.split("-")[0] || "N/A"}
// // // // // // // //           </p>

// // // // // // // //           <div className="flex items-center flex-wrap gap-4 mt-4">
// // // // // // // //             <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium active:scale-95">
// // // // // // // //               <PlayCircleIcon className="w-5 h-5" />
// // // // // // // //               Watch Trailer
// // // // // // // //             </button>

// // // // // // // //             <a
// // // // // // // //               href="#dateSelect"
// // // // // // // //               className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium active:scale-95"
// // // // // // // //             >
// // // // // // // //               Buy Tickets
// // // // // // // //             </a>

// // // // // // // //             <button
// // // // // // // //               onClick={handleFavorite}
// // // // // // // //               className="bg-gray-700 p-2.5 rounded-full transition active:scale-95"
// // // // // // // //             >
// // // // // // // //               <Heart
// // // // // // // //                 className={`w-5 h-5 ${
// // // // // // // //                   favoriteMovies.find((m) => m._id === id)
// // // // // // // //                     ? "fill-primary text-primary"
// // // // // // // //                     : ""
// // // // // // // //                 }`}
// // // // // // // //               />
// // // // // // // //             </button>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* 🎟 Date Selection */}
// // // // // // // //       <DateSelect dateTime={movie} id={id} />

// // // // // // // //       <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>

// // // // // // // //       <div className="flex flex-wrap max-sm:justify-center gap-8">
// // // // // // // //         {shows.slice(0, 4).map((m) => (
// // // // // // // //           <MovieCard key={m.id} movie={m} />
// // // // // // // //         ))}
// // // // // // // //       </div>

// // // // // // // //       <div className="flex justify-center mt-20">
// // // // // // // //         <button
// // // // // // // //           onClick={() => {
// // // // // // // //             navigate("/movies");
// // // // // // // //             scrollTo(0, 0);
// // // // // // // //           }}
// // // // // // // //           className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium"
// // // // // // // //         >
// // // // // // // //           Show more
// // // // // // // //         </button>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default MovieDetails;
// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { useNavigate, useParams } from "react-router-dom";
// // // // // // // import BlurCircle from "../components/BlurCircle";
// // // // // // // import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
// // // // // // // import DateSelect from "../components/DateSelect";
// // // // // // // import MovieCard from "../components/MovieCard";
// // // // // // // import Loading from "../components/Loading";
// // // // // // // import { useAppContext } from "../context/AppContext";
// // // // // // // import toast from "react-hot-toast";

// // // // // // // const MovieDetails = () => {
// // // // // // //   const navigate = useNavigate();
// // // // // // //   const { id } = useParams(); // TMDB movie id

// // // // // // //   const {
// // // // // // //     shows,              // TMDB movies list (for UI)
// // // // // // //     axios,
// // // // // // //     getToken,
// // // // // // //     user,
// // // // // // //     fetchFavoriteMovies,
// // // // // // //     favoriteMovies,
// // // // // // //     image_base_url,
// // // // // // //   } = useAppContext();

// // // // // // //   const [movie, setMovie] = useState(null);
// // // // // // //   const [movieShows, setMovieShows] = useState([]); // ✅ MongoDB shows

// // // // // // //   /* ---------------- GET MOVIE (TMDB) ---------------- */
// // // // // // //   useEffect(() => {
// // // // // // //     if (!id || !shows.length) return;

// // // // // // //     const foundMovie = shows.find(
// // // // // // //       (m) => m.id === Number(id)
// // // // // // //     );

// // // // // // //     if (foundMovie) {
// // // // // // //       setMovie(foundMovie);
// // // // // // //     }
// // // // // // //   }, [id, shows]);

// // // // // // //   /* ---------------- GET SHOW DATES (MongoDB) ---------------- */
// // // // // // //   const getMovieShows = async () => {
// // // // // // //     try {
// // // // // // //       const { data } = await axios.get(`/api/show/movie/${id}`);
// // // // // // //       if (data.success) {
// // // // // // //         setMovieShows(data.shows); // array of show objects
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.log("SHOW DATE ERROR:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     if (id) {
// // // // // // //       getMovieShows();
// // // // // // //     }
// // // // // // //   }, [id]);

// // // // // // //   /* ---------------- FAVORITE ---------------- */
// // // // // // //   const handleFavorite = async () => {
// // // // // // //     try {
// // // // // // //       if (!user) return toast.error("Please login to proceed");

// // // // // // //       const { data } = await axios.post(
// // // // // // //         "/api/user/update-favorite",
// // // // // // //         { movieId: id },
// // // // // // //         { headers: { Authorization: `Bearer ${await getToken()}` } }
// // // // // // //       );

// // // // // // //       if (data.success) {
// // // // // // //         await fetchFavoriteMovies();
// // // // // // //         toast.success(data.message);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.log(error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   /* ---------------- LOADING ---------------- */
// // // // // // //   if (!movie) return <Loading />;

// // // // // // //   return (
// // // // // // //     <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
// // // // // // //       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
// // // // // // //         <img
// // // // // // //           src={image_base_url + movie.poster_path}
// // // // // // //           alt="poster"
// // // // // // //           className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
// // // // // // //         />

// // // // // // //         <div className="relative flex flex-col gap-3">
// // // // // // //           <BlurCircle top="-100px" left="-100px" />
// // // // // // //           <p className="text-primary">ENGLISH</p>

// // // // // // //           <h1 className="text-4xl font-semibold max-w-96">
// // // // // // //             {movie.title}
// // // // // // //           </h1>

// // // // // // //           <div className="flex items-center gap-2 text-gray-300">
// // // // // // //             <StarIcon className="w-5 h-5 text-primary fill-primary" />
// // // // // // //             {movie.vote_average?.toFixed(1)} User Rating
// // // // // // //           </div>

// // // // // // //           <p className="text-gray-400 mt-2 text-sm max-w-xl">
// // // // // // //             {movie.overview}
// // // // // // //           </p>

// // // // // // //           <p className="text-gray-400 text-sm">
// // // // // // //             {movie.release_date?.split("-")[0]}
// // // // // // //           </p>

// // // // // // //           <div className="flex items-center flex-wrap gap-4 mt-4">
// // // // // // //             <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 rounded-md">
// // // // // // //               <PlayCircleIcon className="w-5 h-5" />
// // // // // // //               Watch Trailer
// // // // // // //             </button>

// // // // // // //             <a
// // // // // // //               href="#dateSelect"
// // // // // // //               className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull rounded-md"
// // // // // // //             >
// // // // // // //               Buy Tickets
// // // // // // //             </a>

// // // // // // //             <button
// // // // // // //               onClick={handleFavorite}
// // // // // // //               className="bg-gray-700 p-2.5 rounded-full"
// // // // // // //             >
// // // // // // //               <Heart
// // // // // // //                 className={`w-5 h-5 ${
// // // // // // //                   favoriteMovies.find((m) => m._id === id)
// // // // // // //                     ? "fill-primary text-primary"
// // // // // // //                     : ""
// // // // // // //                 }`}
// // // // // // //               />
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* ✅ FIXED DATE SELECT (MongoDB show dates) */}
// // // // // // //       <DateSelect dateTime={movieShows} id={id} />

// // // // // // //       <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>

// // // // // // //       <div className="flex flex-wrap max-sm:justify-center gap-8">
// // // // // // //         {shows.slice(0, 4).map((m) => (
// // // // // // //           <MovieCard key={m.id} movie={m} />
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       <div className="flex justify-center mt-20">
// // // // // // //         <button
// // // // // // //           onClick={() => {
// // // // // // //             navigate("/movies");
// // // // // // //             scrollTo(0, 0);
// // // // // // //           }}
// // // // // // //           className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull rounded-md"
// // // // // // //         >
// // // // // // //           Show more
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default MovieDetails;
// // // // // // import { useEffect, useState } from "react";
// // // // // // import { useNavigate, useParams } from "react-router-dom";
// // // // // // import BlurCircle from "../components/BlurCircle";
// // // // // // import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
// // // // // // import DateSelect from "../components/DateSelect";
// // // // // // import MovieCard from "../components/MovieCard";
// // // // // // import Loading from "../components/Loading";
// // // // // // import { useAppContext } from "../context/AppContext";
// // // // // // import toast from "react-hot-toast";

// // // // // // const MovieDetails = () => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const { id } = useParams(); // TMDB ID

// // // // // //   const {
// // // // // //     shows,              // TMDB movies (home list)
// // // // // //     axios,
// // // // // //     getToken,
// // // // // //     user,
// // // // // //     fetchFavoriteMovies,
// // // // // //     favoriteMovies,
// // // // // //     image_base_url,
// // // // // //   } = useAppContext();

// // // // // //   const [movie, setMovie] = useState(null);        // TMDB movie
// // // // // //   const [movieShows, setMovieShows] = useState([]); // MongoDB shows

// // // // // //   /* ---------- FIND MOVIE FROM TMDB LIST ---------- */
// // // // // //   useEffect(() => {
// // // // // //     if (!shows.length || !id) return;

// // // // // //     const found = shows.find((m) => m.id === Number(id));
// // // // // //     if (found) setMovie(found);
// // // // // //   }, [shows, id]);

// // // // // //   /* ---------- FETCH SHOW DATES FROM BACKEND ---------- */
// // // // // //   useEffect(() => {
// // // // // //     if (!id) return;

// // // // // //     const fetchShows = async () => {
// // // // // //       try {
// // // // // //         const { data } = await axios.get(
// // // // // //           `http://localhost:3000/api/show/movie/${id}`
// // // // // //         );

// // // // // //         if (data.success) {
// // // // // //           setMovieShows(data.shows); // 🔥 THIS FEEDS DateSelect
// // // // // //         }
// // // // // //       } catch (err) {
// // // // // //         console.log("SHOW FETCH ERROR:", err);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchShows();
// // // // // //   }, [id]);

// // // // // //   /* ---------- FAVORITE ---------- */
// // // // // //   const handleFavorite = async () => {
// // // // // //     try {
// // // // // //       if (!user) return toast.error("Please login to proceed");

// // // // // //       const { data } = await axios.post(
// // // // // //         "/api/user/update-favorite",
// // // // // //         { movieId: id },
// // // // // //         { headers: { Authorization: `Bearer ${await getToken()}` } }
// // // // // //       );

// // // // // //       if (data.success) {
// // // // // //         await fetchFavoriteMovies();
// // // // // //         toast.success(data.message);
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.log(error);
// // // // // //     }
// // // // // //   };

// // // // // //   if (!movie) return <Loading />;

// // // // // //   return (
// // // // // //     <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
// // // // // //       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
// // // // // //         <img
// // // // // //           src={image_base_url + movie.poster_path}
// // // // // //           alt="poster"
// // // // // //           className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
// // // // // //         />

// // // // // //         <div className="relative flex flex-col gap-3">
// // // // // //           <BlurCircle top="-100px" left="-100px" />
// // // // // //           <p className="text-primary">ENGLISH</p>

// // // // // //           <h1 className="text-4xl font-semibold">{movie.title}</h1>

// // // // // //           <div className="flex items-center gap-2 text-gray-300">
// // // // // //             <StarIcon className="w-5 h-5 text-primary fill-primary" />
// // // // // //             {movie.vote_average?.toFixed(1)} User Rating
// // // // // //           </div>

// // // // // //           <p className="text-gray-400 text-sm max-w-xl">
// // // // // //             {movie.overview}
// // // // // //           </p>

// // // // // //           <div className="flex items-center gap-4 mt-4">
// // // // // //             <button className="flex items-center gap-2 px-7 py-3 bg-gray-800 rounded-md">
// // // // // //               <PlayCircleIcon className="w-5 h-5" />
// // // // // //               Watch Trailer
// // // // // //             </button>

// // // // // //             <a
// // // // // //               href="#dateSelect"
// // // // // //               className="px-10 py-3 bg-primary rounded-md"
// // // // // //             >
// // // // // //               Buy Tickets
// // // // // //             </a>

// // // // // //             <button
// // // // // //               onClick={handleFavorite}
// // // // // //               className="bg-gray-700 p-2.5 rounded-full"
// // // // // //             >
// // // // // //               <Heart
// // // // // //                 className={`w-5 h-5 ${
// // // // // //                   favoriteMovies.find((m) => m._id === id)
// // // // // //                     ? "fill-primary text-primary"
// // // // // //                     : ""
// // // // // //                 }`}
// // // // // //               />
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* 🔥 THIS IS WHERE DATES COME FROM */}
// // // // // //       <DateSelect dateTime={movieShows} id={id} />

// // // // // //       <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>

// // // // // //       <div className="flex flex-wrap gap-8">
// // // // // //         {shows.slice(0, 4).map((m) => (
// // // // // //           <MovieCard key={m.id} movie={m} />
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default MovieDetails;
// // // // // import { useEffect, useState } from "react";
// // // // // import { useNavigate, useParams } from "react-router-dom";
// // // // // import BlurCircle from "../components/BlurCircle";
// // // // // import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
// // // // // import DateSelect from "../components/DateSelect";
// // // // // import MovieCard from "../components/MovieCard";
// // // // // import Loading from "../components/Loading";
// // // // // import { useAppContext } from "../context/AppContext";
// // // // // import toast from "react-hot-toast";

// // // // // const MovieDetails = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const { id } = useParams(); // TMDB ID from URL

// // // // //   const {
// // // // //     shows, // TMDB movies list (home page data)
// // // // //     axios,
// // // // //     getToken,
// // // // //     user,
// // // // //     fetchFavoriteMovies,
// // // // //     favoriteMovies,
// // // // //     image_base_url,
// // // // //   } = useAppContext();

// // // // //   const [movie, setMovie] = useState(null);          // TMDB movie
// // // // //   const [movieShows, setMovieShows] = useState([]); // MongoDB shows
// // // // //   const [loadingShows, setLoadingShows] = useState(true);

// // // // //   /* ================= FIND MOVIE FROM TMDB LIST ================= */
// // // // //   useEffect(() => {
// // // // //     if (!id || !shows.length) return;

// // // // //     const foundMovie = shows.find(
// // // // //       (m) => String(m.id) === String(id)
// // // // //     );

// // // // //     if (foundMovie) {
// // // // //       setMovie(foundMovie);
// // // // //     }
// // // // //   }, [id, shows]);

// // // // //   /* ================= FETCH SHOW DATES FROM BACKEND ================= */
// // // // //   useEffect(() => {
// // // // //     if (!id) return;

// // // // //     const fetchMovieShows = async () => {
// // // // //       try {
// // // // //         setLoadingShows(true);

// // // // //         const { data } = await axios.get(
// // // // //           `/api/show/movie/${id}`
// // // // //         );

// // // // //         if (data?.success && Array.isArray(data.shows)) {
// // // // //           setMovieShows(data.shows);
// // // // //         } else {
// // // // //           setMovieShows([]);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error("SHOW FETCH ERROR:", error);
// // // // //         setMovieShows([]);
// // // // //       } finally {
// // // // //         setLoadingShows(false);
// // // // //       }
// // // // //     };

// // // // //     fetchMovieShows();
// // // // //   }, [id, axios]);

// // // // //   /* ================= FAVORITE ================= */
// // // // //   const handleFavorite = async () => {
// // // // //     try {
// // // // //       if (!user) return toast.error("Please login to proceed");

// // // // //       const { data } = await axios.post(
// // // // //         "/api/user/update-favorite",
// // // // //         { movieId: id },
// // // // //         { headers: { Authorization: `Bearer ${await getToken()}` } }
// // // // //       );

// // // // //       if (data.success) {
// // // // //         await fetchFavoriteMovies();
// // // // //         toast.success(data.message);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //     }
// // // // //   };

// // // // //   /* ================= LOADING ================= */
// // // // //   if (!movie) return <Loading />;

// // // // //   return (
// // // // //     <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
// // // // //       {/* ================= MOVIE HEADER ================= */}
// // // // //       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
// // // // //         <img
// // // // //           src={image_base_url + movie.poster_path}
// // // // //           alt="poster"
// // // // //           className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
// // // // //         />

// // // // //         <div className="relative flex flex-col gap-3">
// // // // //           <BlurCircle top="-100px" left="-100px" />

// // // // //           <p className="text-primary">ENGLISH</p>

// // // // //           <h1 className="text-4xl font-semibold">
// // // // //             {movie.title}
// // // // //           </h1>

// // // // //           <div className="flex items-center gap-2 text-gray-300">
// // // // //             <StarIcon className="w-5 h-5 text-primary fill-primary" />
// // // // //             {movie.vote_average?.toFixed(1) || "0.0"} User Rating
// // // // //           </div>

// // // // //           <p className="text-gray-400 text-sm max-w-xl">
// // // // //             {movie.overview}
// // // // //           </p>

// // // // //           <div className="flex items-center gap-4 mt-4">
// // // // //             <button className="flex items-center gap-2 px-7 py-3 bg-gray-800 rounded-md">
// // // // //               <PlayCircleIcon className="w-5 h-5" />
// // // // //               Watch Trailer
// // // // //             </button>

// // // // //             <a
// // // // //               href="#dateSelect"
// // // // //               className="px-10 py-3 bg-primary rounded-md"
// // // // //             >
// // // // //               Buy Tickets
// // // // //             </a>

// // // // //             <button
// // // // //               onClick={handleFavorite}
// // // // //               className="bg-gray-700 p-2.5 rounded-full"
// // // // //             >
// // // // //               <Heart
// // // // //                 className={`w-5 h-5 ${
// // // // //                   favoriteMovies.some((m) => String(m._id) === String(id))
// // // // //                     ? "fill-primary text-primary"
// // // // //                     : ""
// // // // //                 }`}
// // // // //               />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ================= DATE SELECT ================= */}
// // // // //       {!loadingShows && (
// // // // //         <DateSelect dateTime={movieShows} id={id} />
// // // // //       )}

// // // // //       {/* ================= RECOMMENDED ================= */}
// // // // //       <p className="text-lg font-medium mt-20 mb-8">
// // // // //         You May Also Like
// // // // //       </p>

// // // // //       <div className="flex flex-wrap gap-8">
// // // // //         {shows.slice(0, 4).map((m) => (
// // // // //           <MovieCard key={m.id} movie={m} />
// // // // //         ))}
// // // // //       </div>

// // // // //       <div className="flex justify-center mt-20">
// // // // //         <button
// // // // //           onClick={() => {
// // // // //             navigate("/movies");
// // // // //             scrollTo(0, 0);
// // // // //           }}
// // // // //           className="px-10 py-3 bg-primary rounded-md"
// // // // //         >
// // // // //           Show more
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default MovieDetails;
// // // // import { useEffect, useState } from "react";
// // // // import { useNavigate, useParams } from "react-router-dom";
// // // // import BlurCircle from "../components/BlurCircle";
// // // // import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
// // // // import DateSelect from "../components/DateSelect";
// // // // import MovieCard from "../components/MovieCard";
// // // // import Loading from "../components/Loading";
// // // // import { useAppContext } from "../context/AppContext";
// // // // import toast from "react-hot-toast";

// // // // const MovieDetails = () => {
// // // //   const navigate = useNavigate();
// // // //   const { id } = useParams(); // TMDB movie id

// // // //   const {
// // // //     shows, // TMDB movies list (from home)
// // // //     axios,
// // // //     getToken,
// // // //     user,
// // // //     fetchFavoriteMovies,
// // // //     favoriteMovies,
// // // //     image_base_url,
// // // //   } = useAppContext();

// // // //   const [movie, setMovie] = useState(null);        // TMDB movie
// // // //   const [movieShows, setMovieShows] = useState([]); // MongoDB shows
// // // //   const [loadingShows, setLoadingShows] = useState(true);

// // // //   /* ================= GET MOVIE FROM TMDB LIST ================= */
// // // //   useEffect(() => {
// // // //     if (!id || !shows.length) return;

// // // //     const foundMovie = shows.find(
// // // //       (m) => String(m.id) === String(id)
// // // //     );

// // // //     if (foundMovie) {
// // // //       setMovie(foundMovie);
// // // //     }
// // // //   }, [id, shows]);

// // // //   /* ================= GET SHOW DATES FROM BACKEND ================= */
// // // //   useEffect(() => {
// // // //     if (!id) return;

// // // //     const fetchMovieShows = async () => {
// // // //       try {
// // // //         setLoadingShows(true);

// // // //         const { data } = await axios.get(`/api/show/movie/${id}`);

// // // //         if (data?.success && Array.isArray(data.shows)) {
// // // //           setMovieShows(data.shows);
// // // //         } else {
// // // //           setMovieShows([]);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("SHOW FETCH ERROR:", error);
// // // //         setMovieShows([]);
// // // //       } finally {
// // // //         setLoadingShows(false);
// // // //       }
// // // //     };

// // // //     fetchMovieShows();
// // // //   }, [id, axios]);

// // // //   /* ================= FAVORITE ================= */
// // // //   const handleFavorite = async () => {
// // // //     try {
// // // //       if (!user) return toast.error("Please login to proceed");

// // // //       const { data } = await axios.post(
// // // //         "/api/user/update-favorite",
// // // //         { movieId: id },
// // // //         { headers: { Authorization: `Bearer ${await getToken()}` } }
// // // //       );

// // // //       if (data.success) {
// // // //         await fetchFavoriteMovies();
// // // //         toast.success(data.message);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   /* ================= LOADING ================= */
// // // //   if (!movie) return <Loading />;

// // // //   return (
// // // //     <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
// // // //       {/* ================= MOVIE HEADER ================= */}
// // // //       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
// // // //         <img
// // // //           src={image_base_url + movie.poster_path}
// // // //           alt="poster"
// // // //           className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
// // // //         />

// // // //         <div className="relative flex flex-col gap-3">
// // // //           <BlurCircle top="-100px" left="-100px" />

// // // //           <p className="text-primary">ENGLISH</p>

// // // //           <h1 className="text-4xl font-semibold">
// // // //             {movie.title}
// // // //           </h1>

// // // //           <div className="flex items-center gap-2 text-gray-300">
// // // //             <StarIcon className="w-5 h-5 text-primary fill-primary" />
// // // //             {movie.vote_average?.toFixed(1) || "0.0"} User Rating
// // // //           </div>

// // // //           <p className="text-gray-400 text-sm max-w-xl">
// // // //             {movie.overview}
// // // //           </p>

// // // //           <div className="flex items-center gap-4 mt-4">
// // // //             <button className="flex items-center gap-2 px-7 py-3 bg-gray-800 rounded-md">
// // // //               <PlayCircleIcon className="w-5 h-5" />
// // // //               Watch Trailer
// // // //             </button>

// // // //             <a
// // // //               href="#dateSelect"
// // // //               className="px-10 py-3 bg-primary rounded-md"
// // // //             >
// // // //               Buy Tickets
// // // //             </a>

// // // //             <button
// // // //               onClick={handleFavorite}
// // // //               className="bg-gray-700 p-2.5 rounded-full"
// // // //             >
// // // //               <Heart
// // // //                 className={`w-5 h-5 ${
// // // //                   favoriteMovies.some(
// // // //                     (m) => String(m._id) === String(id)
// // // //                   )
// // // //                     ? "fill-primary text-primary"
// // // //                     : ""
// // // //                 }`}
// // // //               />
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* ================= DATE SELECT ================= */}
// // // //       <DateSelect dateTime={movieShows} id={id} />

// // // //       {/* ================= RECOMMENDED ================= */}
// // // //       <p className="text-lg font-medium mt-20 mb-8">
// // // //         You May Also Like
// // // //       </p>

// // // //       <div className="flex flex-wrap gap-8">
// // // //         {shows.slice(0, 4).map((m) => (
// // // //           <MovieCard key={m.id} movie={m} />
// // // //         ))}
// // // //       </div>

// // // //       <div className="flex justify-center mt-20">
// // // //         <button
// // // //           onClick={() => {
// // // //             navigate("/movies");
// // // //             scrollTo(0, 0);
// // // //           }}
// // // //           className="px-10 py-3 bg-primary rounded-md"
// // // //         >
// // // //           Show more
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MovieDetails;
// // // import { useEffect, useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import BlurCircle from "../components/BlurCircle";
// // // import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
// // // import DateSelect from "../components/DateSelect";
// // // import MovieCard from "../components/MovieCard";
// // // import Loading from "../components/Loading";
// // // import { useAppContext } from "../context/AppContext";
// // // import toast from "react-hot-toast";

// // // const MovieDetails = () => {
// // //   const navigate = useNavigate();
// // //   const { id } = useParams(); // TMDB id

// // //   const {
// // //     shows, // TMDB movies list
// // //     axios,
// // //     getToken,
// // //     user,
// // //     fetchFavoriteMovies,
// // //     favoriteMovies,
// // //     image_base_url,
// // //   } = useAppContext();

// // //   const [movie, setMovie] = useState(null);
// // //   const [movieShows, setMovieShows] = useState([]);
// // //   const [loadingShows, setLoadingShows] = useState(true);

// // //   /* ---------- FIND MOVIE FROM TMDB LIST ---------- */
// // //   useEffect(() => {
// // //     if (!id || !shows.length) return;

// // //     const foundMovie = shows.find(
// // //       (m) => String(m.id) === String(id)
// // //     );

// // //     if (foundMovie) {
// // //       setMovie(foundMovie);
// // //     }
// // //   }, [id, shows]);

// // //   /* ---------- FETCH SHOWS FROM BACKEND ---------- */
// // //   useEffect(() => {
// // //     if (!id) return;

// // //     const fetchMovieShows = async () => {
// // //       try {
// // //         setLoadingShows(true);
// // //         const { data } = await axios.get(`/api/show/movie/${id}`);

// // //         if (data?.success && Array.isArray(data.shows)) {
// // //           setMovieShows(data.shows);
// // //         } else {
// // //           setMovieShows([]);
// // //         }
// // //       } catch (error) {
// // //         setMovieShows([]);
// // //       } finally {
// // //         setLoadingShows(false);
// // //       }
// // //     };

// // //     fetchMovieShows();
// // //   }, [id, axios]);

// // //   /* ---------- FAVORITE ---------- */
// // //   const handleFavorite = async () => {
// // //     try {
// // //       if (!user) return toast.error("Please login to proceed");

// // //       const { data } = await axios.post(
// // //         "/api/user/update-favorite",
// // //         { movieId: id },
// // //         { headers: { Authorization: `Bearer ${await getToken()}` } }
// // //       );

// // //       if (data.success) {
// // //         await fetchFavoriteMovies();
// // //         toast.success(data.message);
// // //       }
// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   if (!movie) return <Loading />;

// // //   return (
// // //     <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
// // //       {/* ===== MOVIE INFO ===== */}
// // //       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
// // //         <img
// // //           src={image_base_url + movie.poster_path}
// // //           alt="poster"
// // //           className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
// // //         />

// // //         <div className="relative flex flex-col gap-3">
// // //           <BlurCircle top="-100px" left="-100px" />
// // //           <p className="text-primary">ENGLISH</p>

// // //           <h1 className="text-4xl font-semibold">{movie.title}</h1>

// // //           <div className="flex items-center gap-2 text-gray-300">
// // //             <StarIcon className="w-5 h-5 text-primary fill-primary" />
// // //             {movie.vote_average?.toFixed(1)} User Rating
// // //           </div>

// // //           <p className="text-gray-400 text-sm max-w-xl">
// // //             {movie.overview}
// // //           </p>

// // //           <div className="flex items-center gap-4 mt-4">
// // //             <button className="flex items-center gap-2 px-7 py-3 bg-gray-800 rounded-md">
// // //               <PlayCircleIcon className="w-5 h-5" />
// // //               Watch Trailer
// // //             </button>

// // //             <a
// // //               href="#dateSelect"
// // //               className="px-10 py-3 bg-primary rounded-md"
// // //             >
// // //               Buy Tickets
// // //             </a>

// // //             <button
// // //               onClick={handleFavorite}
// // //               className="bg-gray-700 p-2.5 rounded-full"
// // //             >
// // //               <Heart
// // //                 className={`w-5 h-5 ${
// // //                   favoriteMovies.some(
// // //                     (m) => String(m._id) === String(id)
// // //                   )
// // //                     ? "fill-primary text-primary"
// // //                     : ""
// // //                 }`}
// // //               />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ===== DATE SELECT / NO SHOW MESSAGE ===== */}
// // //       {!loadingShows && (
// // //         <DateSelect dateTime={movieShows} id={id} />
// // //       )}

// // //       {/* ===== RECOMMENDED ===== */}
// // //       <p className="text-lg font-medium mt-20 mb-8">
// // //         You May Also Like
// // //       </p>

// // //       <div className="flex flex-wrap gap-8">
// // //         {shows.slice(0, 4).map((m) => (
// // //           <MovieCard key={m.id} movie={m} />
// // //         ))}
// // //       </div>

// // //       <div className="flex justify-center mt-20">
// // //         <button
// // //           onClick={() => {
// // //             navigate("/movies");
// // //             scrollTo(0, 0);
// // //           }}
// // //           className="px-10 py-3 bg-primary rounded-md"
// // //         >
// // //           Show more
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MovieDetails;


// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
// // import BlurCircle from "../components/BlurCircle";
// // import DateSelect from "../components/DateSelect";
// // import MovieCard from "../components/MovieCard";
// // import Loading from "../components/Loading";
// // import { useAppContext } from "../context/AppContext";
// // import toast from "react-hot-toast";

// // const MovieDetails = () => {
// //   const navigate = useNavigate();
// //   const { id } = useParams(); // TMDB ID

// //   const {
// //     shows, // TMDB movies list
// //     axios,
// //     getToken,
// //     user,
// //     fetchFavoriteMovies,
// //     favoriteMovies,
// //     image_base_url,
// //   } = useAppContext();

// //   const [movie, setMovie] = useState(null);
// //   const [movieShows, setMovieShows] = useState([]);

// //   /* -------- FIND MOVIE FROM TMDB LIST -------- */
// //   useEffect(() => {
// //     if (!shows.length || !id) return;
// //     const found = shows.find((m) => m.id === Number(id));
// //     if (found) setMovie(found);
// //   }, [shows, id]);

// //   /* -------- FETCH SHOW DATES (MongoDB) -------- */
// //   useEffect(() => {
// //     if (!id) return;

// //     const fetchShows = async () => {
// //       try {
// //         const { data } = await axios.get(`/api/show/movie/${id}`);
// //         if (data.success) {
// //           setMovieShows(data.shows);
// //         } else {
// //           setMovieShows([]);
// //         }
// //       } catch (err) {
// //         console.error("SHOW FETCH ERROR:", err);
// //         setMovieShows([]);
// //       }
// //     };

// //     fetchShows();
// //   }, [id]);

// //   /* -------- FAVORITE -------- */
// //   const handleFavorite = async () => {
// //     try {
// //       if (!user) return toast.error("Please login");

// //       const { data } = await axios.post(
// //         "/api/user/update-favorite",
// //         { movieId: id },
// //         { headers: { Authorization: `Bearer ${await getToken()}` } }
// //       );

// //       if (data.success) {
// //         await fetchFavoriteMovies();
// //         toast.success(data.message);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   if (!movie) return <Loading />;

// //   return (
// //     <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
// //       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
// //         <img
// //           src={image_base_url + movie.poster_path}
// //           alt="poster"
// //           className="rounded-xl h-104 max-w-70 object-cover"
// //         />

// //         <div className="relative flex flex-col gap-3">
// //           <BlurCircle top="-100px" left="-100px" />

// //           <p className="text-primary">ENGLISH</p>
// //           <h1 className="text-4xl font-semibold">{movie.title}</h1>

// //           <div className="flex items-center gap-2 text-gray-300">
// //             <StarIcon className="w-5 h-5 text-primary fill-primary" />
// //             {movie.vote_average?.toFixed(1)} User Rating
// //           </div>

// //           <p className="text-gray-400 max-w-xl">{movie.overview}</p>

// //           <div className="flex items-center gap-4 mt-4">
// //             <button className="flex items-center gap-2 px-7 py-3 bg-gray-800 rounded-md">
// //               <PlayCircleIcon className="w-5 h-5" />
// //               Watch Trailer
// //             </button>

// //             <a
// //               href="#dateSelect"
// //               className="px-10 py-3 bg-primary rounded-md"
// //             >
// //               Buy Tickets
// //             </a>

// //             <button
// //               onClick={handleFavorite}
// //               className="bg-gray-700 p-2.5 rounded-full"
// //             >
// //               <Heart
// //                 className={`w-5 h-5 ${
// //                   favoriteMovies.find((m) => m._id === id)
// //                     ? "fill-primary text-primary"
// //                     : ""
// //                 }`}
// //               />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* 🎯 CHOOSE DATE SECTION */}
// //       <DateSelect dateTime={movieShows} id={id} />

// //       <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
// //       <div className="flex flex-wrap gap-8">
// //         {shows.slice(0, 4).map((m) => (
// //           <MovieCard key={m.id} movie={m} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MovieDetails;




// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
// import BlurCircle from "../components/BlurCircle";
// import DateSelect from "../components/DateSelect";
// import MovieCard from "../components/MovieCard";
// import Loading from "../components/Loading";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const MovieDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // TMDB ID


//   const {
//     shows,              // TMDB movies list
//     axios,
//     getToken,
//     user,
//     fetchFavoriteMovies,
//     favoriteMovies,
//     image_base_url,
//   } = useAppContext();

//   const [movie, setMovie] = useState(null);
//   const [movieShows, setMovieShows] = useState([]);
//   const [cast, setCast] = useState([]);

//   /* ================= FIND MOVIE FROM TMDB LIST ================= */
//   useEffect(() => {
//     if (!shows.length || !id) return;

//     const found = shows.find(
//       (m) => String(m.id) === String(id)
//     );

//     if (found) setMovie(found);
//   }, [shows, id]);

//   /* ================= FETCH SHOW DATES (MongoDB) ================= */
//   useEffect(() => {
//     if (!id) return;

//     const fetchShows = async () => {
//       try {
//         const { data } = await axios.get(`/api/show/movie/${id}`);
//         if (data?.success && Array.isArray(data.shows)) {
//           setMovieShows(data.shows);
//           console.log("MOVIE SHOWS:", movieShows);

//         } else {
//           setMovieShows([]);
//         }
//       } catch (err) {
//         console.error("SHOW FETCH ERROR:", err);
//         setMovieShows([]);
//       }
//     };

//     fetchShows();
//   }, [id, axios]);

//   /* ================= FETCH CAST (TMDB) ================= */
//   useEffect(() => {
//     if (!id) return;

//     const fetchCast = async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/show/movie/${id}/cast`
//         );

//         if (data?.success && Array.isArray(data.cast)) {
//           setCast(data.cast.slice(0, 12)); // top 12
//         } else {
//           setCast([]);
//         }
//       } catch (err) {
//         console.error("CAST FETCH ERROR:", err);
//         setCast([]);
//       }
//     };

//     fetchCast();
//   }, [id, axios]);

//   /* ================= FAVORITE ================= */
//   const handleFavorite = async () => {
//     try {
//       if (!user) return toast.error("Please login");

//       const { data } = await axios.post(
//         "/api/user/update-favorite",
//         { movieId: id },
//         { headers: { Authorization: `Bearer ${await getToken()}` } }
//       );

//       if (data.success) {
//         await fetchFavoriteMovies();
//         toast.success(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!movie) return <Loading />;

//   return (
//     <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
//       {/* ================= MOVIE HEADER ================= */}
//       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
//         <img
//           src={image_base_url + movie.poster_path}
//           alt="poster"
//           className="rounded-xl h-104 max-w-70 object-cover"
//         />

//         <div className="relative flex flex-col gap-3">
//           <BlurCircle top="-100px" left="-100px" />

//           <p className="text-primary">ENGLISH</p>
//           <h1 className="text-4xl font-semibold">{movie.title}</h1>

//           <div className="flex items-center gap-2 text-gray-300">
//             <StarIcon className="w-5 h-5 text-primary fill-primary" />
//             {movie.vote_average?.toFixed(1) || "0.0"} User Rating
//           </div>

//           <p className="text-gray-400 max-w-xl">
//             {movie.overview}
//           </p>

//           <div className="flex items-center gap-4 mt-4">
//             <button className="flex items-center gap-2 px-7 py-3 bg-gray-800 rounded-md">
//               <PlayCircleIcon className="w-5 h-5" />
//               Watch Trailer
//             </button>

//             <a
//               href="#dateSelect"
//               className="px-10 py-3 bg-primary rounded-md"
//             >
//               Buy Tickets
//             </a>

//             <button
//               onClick={handleFavorite}
//               className="bg-gray-700 p-2.5 rounded-full"
//             >
//               <Heart
//                 className={`w-5 h-5 ${
//                   favoriteMovies.some(
//                     (m) => String(m._id) === String(id)
//                   )
//                     ? "fill-primary text-primary"
//                     : ""
//                 }`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= FAVORITE CAST ================= */}
//       <p className="text-lg font-medium mt-20">Your Favorite Cast</p>

//       <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
//         <div className="flex gap-4 w-max px-4">
//           {cast.length > 0 ? (
//             cast.map((actor) => (
//               <div
//                 key={actor.cast_id || actor.id}
//                 className="flex flex-col items-center text-center"
//               >
//                 <img
//                   src={
//                     actor.profile_path
//                       ? image_base_url + actor.profile_path
//                       : "/avatar-placeholder.png"
//                   }
//                   alt={actor.name}
//                   className="rounded-full h-20 w-20 object-cover"
//                 />
//                 <p className="text-xs mt-2 font-medium">
//                   {actor.name}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400">
//               No cast information available
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ================= DATE SELECT ================= */}
//       <DateSelect dateTime={movieShows} id={id} />

//       {/* ================= RECOMMENDED ================= */}
//       <p className="text-lg font-medium mt-20 mb-8">
//         You May Also Like
//       </p>

//       <div className="flex flex-wrap gap-8">
//         {shows.slice(0, 4).map((m) => (
//           <MovieCard key={m.id} movie={m} />
//         ))}
//       </div>
//     </div>
//   );
// };


// export default MovieDetails;


// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
// import BlurCircle from "../components/BlurCircle";
// import DateSelect from "../components/DateSelect";
// import MovieCard from "../components/MovieCard";
// import Loading from "../components/Loading";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const MovieDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // TMDB ID

//   const {
//     shows, // TMDB movie list
//     axios,
//     getToken,
//     user,
//     fetchFavoriteMovies,
//     favoriteMovies,
//     image_base_url,
//   } = useAppContext();

//   const [movie, setMovie] = useState(null);
//   const [movieShows, setMovieShows] = useState([]);
//   const [cast, setCast] = useState([]);

//   /* ================= FIND MOVIE FROM TMDB LIST ================= */
//   useEffect(() => {
//     if (!shows.length || !id) return;

//     const found = shows.find(
//       (m) => String(m.id) === String(id)
//     );

//     if (found) setMovie(found);
//   }, [shows, id]);

//   /* ================= FETCH SHOW DATES (MongoDB) ================= */
//   useEffect(() => {
//     if (!id) return;

//     const fetchShows = async () => {
//       try {
//         // 🔥 THIS IS THE CRITICAL FIX
//         const { data } = await axios.get(`/api/show/movie/${id}`);

//         console.log("MOVIE SHOWS FROM API:", data.shows);

//         if (data?.success && Array.isArray(data.shows)) {
//           setMovieShows(data.shows);
//         } else {
//           setMovieShows([]);
//         }
//       } catch (err) {
//         console.error("SHOW FETCH ERROR:", err);
//         setMovieShows([]);
//       }
//     };

//     fetchShows();
//   }, [id, axios]);

//   /* ================= FETCH CAST (TMDB) ================= */
//   useEffect(() => {
//     if (!id) return;

//     const fetchCast = async () => {
//       try {
//         const { data } = await axios.get(
//           `/api/show/movie/${id}/cast`
//         );

//         if (data?.success && Array.isArray(data.cast)) {
//           setCast(data.cast.slice(0, 12));
//         } else {
//           setCast([]);
//         }
//       } catch (err) {
//         console.error("CAST FETCH ERROR:", err);
//         setCast([]);
//       }
//     };

//     fetchCast();
//   }, [id, axios]);

//   /* ================= FAVORITE ================= */
//   const handleFavorite = async () => {
//     try {
//       if (!user) return toast.error("Please login");

//       const { data } = await axios.post(
//         "/api/user/update-favorite",
//         { movieId: id },
//         { headers: { Authorization: `Bearer ${await getToken()}` } }
//       );

//       if (data.success) {
//         await fetchFavoriteMovies();
//         toast.success(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!movie) return <Loading />;

//   return (
//     <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
//       {/* ================= MOVIE HEADER ================= */}
//       <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
//         <img
//           src={image_base_url + movie.poster_path}
//           alt="poster"
//           className="rounded-xl h-104 max-w-70 object-cover"
//         />

//         <div className="relative flex flex-col gap-3">
//           <BlurCircle top="-100px" left="-100px" />

//           <p className="text-primary">ENGLISH</p>
//           <h1 className="text-4xl font-semibold">{movie.title}</h1>

//           <div className="flex items-center gap-2 text-gray-300">
//             <StarIcon className="w-5 h-5 text-primary fill-primary" />
//             {movie.vote_average?.toFixed(1) || "0.0"} User Rating
//           </div>

//           <p className="text-gray-400 max-w-xl">
//             {movie.overview}
//           </p>

//           <div className="flex items-center gap-4 mt-4">
//             <button className="flex items-center gap-2 px-7 py-3 bg-gray-800 rounded-md">
//               <PlayCircleIcon className="w-5 h-5" />
//               Watch Trailer
//             </button>

//             <a
//               href="#dateSelect"
//               className="px-10 py-3 bg-primary rounded-md"
//             >
//               Buy Tickets
//             </a>

//             <button
//               onClick={handleFavorite}
//               className="bg-gray-700 p-2.5 rounded-full"
//             >
//               <Heart
//                 className={`w-5 h-5 ${
//                   favoriteMovies.some(
//                     (m) => String(m._id) === String(id)
//                   )
//                     ? "fill-primary text-primary"
//                     : ""
//                 }`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ================= FAVORITE CAST ================= */}
//       <p className="text-lg font-medium mt-20">Your Favorite Cast</p>

//       <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
//         <div className="flex gap-4 w-max px-4">
//           {cast.length > 0 ? (
//             cast.map((actor) => (
//               <div
//                 key={actor.cast_id || actor.id}
//                 className="flex flex-col items-center text-center"
//               >
//                 <img
//                   src={
//                     actor.profile_path
//                       ? image_base_url + actor.profile_path
//                       : "/avatar-placeholder.png"
//                   }
//                   alt={actor.name}
//                   className="rounded-full h-20 w-20 object-cover"
//                 />
//                 <p className="text-xs mt-2 font-medium">
//                   {actor.name}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400">
//               No cast information available
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ================= DATE SELECT ================= */}
//       <DateSelect dateTime={movieShows} id={id} />

//       {/* ================= RECOMMENDED ================= */}
//       <p className="text-lg font-medium mt-20 mb-8">
//         You May Also Like
//       </p>

//       <div className="flex flex-wrap gap-8">
//         {shows.slice(0, 4).map((m) => (
//           <MovieCard key={m.id} movie={m} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // TMDB ID (string)

  const {
    shows = [],
    axios,
    getToken,
    user,
    fetchFavoriteMovies,
    favoriteMovies = [],
    image_base_url,
  } = useAppContext();

  const [movie, setMovie] = useState(null);
  const [movieShows, setMovieShows] = useState([]);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FIND MOVIE (TMDB ID SAFE) ================= */
  useEffect(() => {
    if (!id || !shows.length) return;

    const foundMovie = shows.find(
      (m) =>
        String(m.tmdbId) === String(id) ||
        String(m.id) === String(id)
    );

    if (foundMovie) {
      setMovie(foundMovie);
      setLoading(false);
    }
  }, [shows, id]);

  /* ================= FETCH SHOWS ================= */
  useEffect(() => {
    if (!id) return;

    const fetchShows = async () => {
      try {
        const { data } = await axios.get(`/api/show/movie/${id}`);
        setMovieShows(data?.success ? data.shows : []);
      } catch {
        setMovieShows([]);
      }
    };

    fetchShows();
  }, [id, axios]);

  /* ================= FETCH CAST ================= */
  useEffect(() => {
    if (!id) return;

    const fetchCast = async () => {
      try {
        const { data } = await axios.get(
          `/api/show/movie/${id}/cast`
        );
        setCast(data?.success ? data.cast.slice(0, 12) : []);
      } catch {
        setCast([]);
      }
    };

    fetchCast();
  }, [id, axios]);

  /* ================= FAVORITE ================= */
  const handleFavorite = async () => {
    try {
      if (!user) return toast.error("Please login");

      const { data } = await axios.post(
        "/api/user/update-favorite",
        { movieId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        await fetchFavoriteMovies();
        toast.success(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* ================= SAFETY ================= */
  if (!id)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Movie not found
      </div>
    );

  if (loading || !movie) return <Loading />;

  const isFavorite = favoriteMovies.some(
    (m) => String(m.tmdbId) === String(id)
  );

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={
            movie.poster_path
              ? image_base_url + movie.poster_path
              : "/poster-placeholder.png"
          }
          alt="poster"
          className="rounded-xl h-104 max-w-70 object-cover"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold">{movie.title}</h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {movie.vote_average?.toFixed(1) || "0.0"} User Rating
          </div>

          <p className="text-gray-400 max-w-xl">{movie.overview}</p>

          <div className="flex items-center gap-4 mt-4">
            <button className="flex items-center gap-2 px-7 py-3 bg-gray-800 rounded-md">
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className="px-10 py-3 bg-primary rounded-md"
            >
              Buy Tickets
            </a>

            <button
              onClick={handleFavorite}
              className="bg-gray-700 p-2.5 rounded-full"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-primary text-primary" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ================= CAST ================= */}
      <p className="text-lg font-medium mt-20">Your Favorite Cast</p>

      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex gap-4 w-max px-4">
          {cast.length ? (
            cast.map((actor) => (
              <div
                key={actor.id}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={
                    actor.profile_path
                      ? image_base_url + actor.profile_path
                      : "/avatar-placeholder.png"
                  }
                  alt={actor.name}
                  className="rounded-full h-20 w-20 object-cover"
                />
                <p className="text-xs mt-2 font-medium">
                  {actor.name}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">
              No cast information available
            </p>
          )}
        </div>
      </div>

      {/* ================= SHOW DATES ================= */}
      <DateSelect dateTime={movieShows} id={id} />

      {/* ================= RECOMMENDED ================= */}
      <p className="text-lg font-medium mt-20 mb-8">
        You May Also Like
      </p>

      <div className="flex flex-wrap gap-8">
        {shows.slice(0, 4).map((m) => (
          <MovieCard key={m._id || m.tmdbId} movie={m} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
