// // import { StarIcon } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import timeFormat from "../lib/timeFormat";
// // import { useAppContext } from "../context/AppContext";

// // const MovieCard = ({ movie }) => {
// //   const navigate = useNavigate();
// //   const { image_base_url } = useAppContext();

// //   // ✅ SAFETY GUARDS
// //   const genres = Array.isArray(movie?.genres) ? movie.genres : [];
// //   const releaseYear = movie?.release_date
// //     ? new Date(movie.release_date).getFullYear()
// //     : "N/A";

// //   const runtime = movie?.runtime ? timeFormat(movie.runtime) : "N/A";
// //   const rating =
// //     typeof movie?.vote_average === "number"
// //       ? movie.vote_average.toFixed(1)
// //       : "0.0";

// //   return (
// //     <div className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66">
// //       <img
// //         onClick={() => {
// //           navigate(`/movies/${movie._id}`);
// //           scrollTo(0, 0);
// //         }}
// //         src={
// //           movie?.backdrop_path
// //             ? image_base_url + movie.backdrop_path
// //             : "/placeholder.jpg"
// //         }
// //         alt="poster"
// //         className="rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer"
// //       />

// //       <p className="font-semibold mt-2 truncate">
// //         {movie?.title || "Untitled Movie"}
// //       </p>

// //       <p className="text-sm text-gray-400 mt-2">
// //         {releaseYear}
// //         {genres.length > 0 && (
// //           <>
// //             {" "}
// //             •{" "}
// //             {genres
// //               .slice(0, 2)
// //               .map((genre) => genre.name)
// //               .join(" | ")}
// //           </>
// //         )}
// //         {" • "}
// //         {runtime}
// //       </p>

// //       <div className="flex items-center justify-between mt-4 pb-3">
// //         <button
// //           onClick={() => {
// //             navigate(`/movies/${movie._id}`);
// //             scrollTo(0, 0);
// //           }}
// //           className="px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
// //         >
// //           Buy Tickets
// //         </button>

// //         <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
// //           <StarIcon className="w-4 h-4 text-primary fill-primary" />
// //           {rating}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MovieCard;
// import { StarIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";

// const MovieCard = ({ movie }) => {
//   const navigate = useNavigate();
//   const { image_base_url } = useAppContext();

//   if (!movie?.id) return null;

//   const goToDetails = () => {
//     navigate(`/movies/${movie.Id}`);
//     scrollTo(0, 0);
//   };

//   return (
//     <div className="flex flex-col p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition w-66">
//       <img
//         onClick={goToDetails}
//         src={image_base_url + movie.backdrop_path}
//         alt={movie.title}
//         className="rounded-lg h-52 w-full object-cover cursor-pointer"
//       />

//       <p className="font-semibold mt-2 truncate">{movie.title}</p>

//       <div className="flex items-center justify-between mt-4">
//         <button
//           onClick={goToDetails}
//           className="px-4 py-2 text-xs bg-primary rounded-full"
//         >
//           Buy Tickets
//         </button>

//         <p className="flex items-center gap-1 text-sm text-gray-400">
//           <StarIcon className="w-4 h-4 text-primary fill-primary" />
//           {movie.vote_average?.toFixed(1)}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;
import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { image_base_url } = useAppContext();

  if (!movie) return null;

  // ✅ ALWAYS derive a valid movieId
  const movieId = movie.tmdbId || movie.id;

  return (
    <div
      onClick={() => {
        if (!movieId) return; // safety
        navigate(`/movies/${movieId}`);
        window.scrollTo(0, 0);
      }}
      className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66 cursor-pointer"
    >
      <img
        src={
          movie.backdrop_path
            ? image_base_url + movie.backdrop_path
            : movie.poster_path
            ? image_base_url + movie.poster_path
            : "/poster-placeholder.png"
        }
        alt={movie.title || "Movie"}
        className="rounded-lg h-52 w-full object-cover object-right-bottom"
      />

      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-white truncate">
          {movie.title || "Untitled Movie"}
        </h3>

        <div className="flex items-center gap-1 text-sm text-yellow-400">
          <StarIcon className="w-4 h-4 fill-yellow-400" />
          <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
        </div>

        <p className="text-xs text-gray-400">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : ""}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
