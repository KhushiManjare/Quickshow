// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useAppContext } from "../../context/AppContext";
// // import toast from "react-hot-toast";

// // const AddShows = () => {
// //   const { getToken, image_base_url, refreshDashboard } = useAppContext();

// //   const [movies, setMovies] = useState([]);
// //   const [selectedMovie, setSelectedMovie] = useState(null);
// //   const [showPrice, setShowPrice] = useState("");
// //   const [dateTimeInput, setDateTimeInput] = useState("");
// //   const [showDateTimes, setShowDateTimes] = useState([]);

// //   /* ================= FETCH MOVIES ================= */
// //   const fetchMovies = async () => {
// //     try {
// //       const { data } = await axios.get("/api/show/now-playing");
// //       if (data?.success) {
// //         setMovies(data.movies);
// //       } else {
// //         toast.error("No movies found");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to load movies");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMovies();
// //   }, []);

// //   /* ================= ADD DATE TIME ================= */
// //   const addDateTime = () => {
// //     if (!dateTimeInput) return;
// //     setShowDateTimes((prev) => [...prev, dateTimeInput]);
// //     setDateTimeInput("");
// //   };

// //   /* ================= ADD SHOW ================= */
// //   const addShow = async () => {
// //     if (!selectedMovie || !showPrice || showDateTimes.length === 0) {
// //       return toast.error("Fill all fields");
// //     }

// //     try {
// //       const token = await getToken();

// //       const { data } = await axios.post(
// //         "/api/admin/add-show",
// //         {
// //           movie: selectedMovie,
// //           showPrice,
// //           showDateTimes,
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       if (data?.success) {
// //         toast.success("Show added successfully");

// //         console.log("🔥 refreshDashboard called");
// // refreshDashboard();

// //         setSelectedMovie(null);
// //         setShowPrice("");
// //         setShowDateTimes([]);
// //       } else {
// //         toast.error(data?.message || "Failed to add show");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to add show");
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-xl font-semibold mb-6">Add Shows</h1>

// //       {/* MOVIES GRID */}
// //       <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
// //         {movies.map((movie) => (
// //           <div
// //             key={movie.id}
// //             onClick={() => setSelectedMovie(movie)}
// //             className={`cursor-pointer rounded-xl overflow-hidden border-2 ${
// //               selectedMovie?.id === movie.id
// //                 ? "border-green-500"
// //                 : "border-transparent"
// //             }`}
// //           >
// //             <img
// //               src={image_base_url + movie.poster_path}
// //               alt={movie.title}
// //               className="w-full h-72 object-cover"
// //             />
// //             <p className="text-center mt-2 text-sm">{movie.title}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* PRICE */}
// //       <input
// //         type="number"
// //         placeholder="Show Price"
// //         value={showPrice}
// //         onChange={(e) => setShowPrice(e.target.value)}
// //         className="mt-6 p-2 border rounded w-60 text-black"
// //       />

// //       {/* DATE TIME */}
// //       <div className="flex gap-3 mt-4 items-center">
// //         <input
// //           type="datetime-local"
// //           value={dateTimeInput}
// //           onChange={(e) => setDateTimeInput(e.target.value)}
// //           className="p-2 border  bg-white rounded w-72 text-black"
// //         />

// //         <button
// //           onClick={addDateTime}
// //           className="px-4 py-2 bg-white text-black rounded"
// //         >
// //           Add
// //         </button>
// //       </div>

// //       {/* ADD SHOW */}
// //       <button
// //         onClick={addShow}
// //         className="mt-6 px-6 py-2 bg-green-600 text-white rounded"
// //       >
// //         Add Show
// //       </button>
// //     </div>
// //   );
// // };

// // export default AddShows;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const AddShows = () => {
//   const { getToken, image_base_url } = useAppContext();
//   const navigate = useNavigate(); // ✅ CORRECT

//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [showPrice, setShowPrice] = useState("");
//   const [dateTimeInput, setDateTimeInput] = useState("");
//   const [showDateTimes, setShowDateTimes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   /* ================= FETCH MOVIES ================= */
//   const fetchMovies = async () => {
//     try {
//       const { data } = await axios.get("/api/show/now-playing");
//       if (data?.success && Array.isArray(data.movies)) {
//         setMovies(data.movies);
//       } else {
//         setMovies([]);
//         toast.error("No movies found");
//       }
//     } catch (error) {
//       console.error("FETCH MOVIES ERROR:", error);
//       toast.error("Failed to load movies");
//     }
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   /* ================= ADD DATE TIME ================= */
//   const addDateTime = () => {
//     if (!dateTimeInput) {
//       toast.error("Select date & time");
//       return;
//     }

//     if (showDateTimes.includes(dateTimeInput)) {
//       toast.error("This show time is already added");
//       return;
//     }

//     setShowDateTimes((prev) => [...prev, dateTimeInput]);
//     setDateTimeInput("");
//   };

//   /* ================= ADD SHOW ================= */
//   const addShow = async () => {
//     if (!selectedMovie) return toast.error("Select a movie");
//     if (!showPrice || Number(showPrice) <= 0)
//       return toast.error("Enter valid show price");
//     if (showDateTimes.length === 0)
//       return toast.error("Add at least one show time");

//     try {
//       setLoading(true);

//       const token = await getToken();
//       if (!token) {
//         toast.error("Authentication failed");
//         return;
//       }

//       const payload = {
//         movie: selectedMovie,
//         showPrice: Number(showPrice),
//         showDateTimes,
//       };

//       const { data } = await axios.post(
//         "/api/admin/add-show",
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (data?.success) {
//         toast.success("Show added successfully");

//         // 🔥 FORCE DASHBOARD REFRESH VIA NAVIGATION
//         navigate("/admin", { replace: true });

//         setSelectedMovie(null);
//         setShowPrice("");
//         setShowDateTimes([]);
//       } else {
//         toast.error(data?.message || "Failed to add show");
//       }
//     } catch (error) {
//       console.error("ADD SHOW ERROR:", error);
//       toast.error("Failed to add show");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-semibold mb-6">Add Shows</h1>

//       {/* MOVIES GRID */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             onClick={() => setSelectedMovie(movie)}
//             className={`cursor-pointer rounded-xl overflow-hidden border-2 ${
//               selectedMovie?.id === movie.id
//                 ? "border-green-500"
//                 : "border-transparent"
//             }`}
//           >
//             <img
//               src={image_base_url + movie.poster_path}
//               alt={movie.title}
//               className="w-full h-72 object-cover"
//             />
//             <p className="text-center mt-2 text-sm">{movie.title}</p>
//           </div>
//         ))}
//       </div>

//       {/* PRICE */}
//       <input
//         type="number"
//         placeholder="Show Price"
//         value={showPrice}
//         onChange={(e) => setShowPrice(e.target.value)}
//         className="mt-6 p-2 border rounded w-60 text-black"
//       />

//       {/* DATE TIME */}
//       <div className="flex gap-3 mt-4 items-center">
//         <input
//           type="datetime-local"
//           value={dateTimeInput}
//           onChange={(e) => setDateTimeInput(e.target.value)}
//           className="p-2 border bg-white rounded w-72 text-black"
//         />

//         <button
//           onClick={addDateTime}
//           className="px-4 py-2 bg-white text-black rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* SHOW TIMES */}
//       {showDateTimes.length > 0 && (
//         <ul className="mt-3 text-sm text-gray-300">
//           {showDateTimes.map((dt, i) => (
//             <li key={i}>• {dt}</li>
//           ))}
//         </ul>
//       )}

//       {/* ADD SHOW BUTTON */}
//       <button
//         onClick={addShow}
//         disabled={loading}
//         className="mt-6 px-6 py-2 bg-green-600 text-white rounded disabled:opacity-60"
//       >
//         {loading ? "Adding..." : "Add Show"}
//       </button>
//     </div>
//   );
// };

// export default AddShows;
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddShows = () => {
  const { getToken, image_base_url } = useAppContext();

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPrice, setShowPrice] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showDateTimes, setShowDateTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("/api/show/now-playing");
      if (data?.success) setMovies(data.movies);
    } catch {
      toast.error("Failed to load movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addDateTime = () => {
    if (!dateTimeInput) return toast.error("Select date & time");
    if (showDateTimes.includes(dateTimeInput))
      return toast.error("Already added");

    setShowDateTimes([...showDateTimes, dateTimeInput]);
    setDateTimeInput("");
  };

  const addShow = async () => {
    if (!selectedMovie) return toast.error("Select a movie");
    if (!showPrice) return toast.error("Enter price");
    if (showDateTimes.length === 0)
      return toast.error("Add at least one time");

    try {
      setLoading(true);
      const token = await getToken();

      await axios.post(
        "/api/admin/add-show",
        {
          movie: selectedMovie,
          showPrice: Number(showPrice),
          showDateTimes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Show added successfully");

      // 🔥 FINAL, GUARANTEED FIX
      setTimeout(() => {
        window.location.href = "/admin";
      }, 800);

    } catch (err) {
      toast.error("Failed to add show");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Add Shows</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className={`cursor-pointer border-2 rounded ${
              selectedMovie?.id === movie.id
                ? "border-green-500"
                : "border-transparent"
            }`}
          >
            <img
              src={image_base_url + movie.poster_path}
              className="h-72 w-full object-cover"
            />
            <p className="text-center mt-2 text-sm">{movie.title}</p>
          </div>
        ))}
      </div>

      <input
        type="number"
        placeholder="Show Price"
        value={showPrice}
        onChange={(e) => setShowPrice(e.target.value)}
        className="mt-6 p-2 border w-60 text-black"
      />

      <div className="flex gap-3 mt-4">
        <input
          type="datetime-local"
          value={dateTimeInput}
          onChange={(e) => setDateTimeInput(e.target.value)}
          className="p-2 border text-black"
        />
        <button onClick={addDateTime} className="px-4 bg-white text-black">
          Add
        </button>
      </div>

      <button
        onClick={addShow}
        disabled={loading}
        className="mt-6 px-6 py-2 bg-green-600 text-white"
      >
        {loading ? "Adding..." : "Add Show"}
      </button>
    </div>
  );
};

export default AddShows;
