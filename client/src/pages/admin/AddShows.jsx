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

  // 🎬 FETCH TMDB MOVIES FROM BACKEND
  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("/api/show/now-playing");
      if (data.success) {
        setMovies(data.movies);
      } else {
        toast.error("No movies found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addDateTime = () => {
    if (!dateTimeInput) return;
    setShowDateTimes([...showDateTimes, dateTimeInput]);
    setDateTimeInput("");
  };

  // ➕ ADD SHOW
  const addShow = async () => {
    if (!selectedMovie || !showPrice || showDateTimes.length === 0) {
      return toast.error("Fill all fields");
    }

    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/admin/add-show",
        {
          movie: selectedMovie,
          showPrice,
          showDateTimes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Show added successfully");
        setSelectedMovie(null);
        setShowPrice("");
        setShowDateTimes([]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add show");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Add Shows</h1>

      {/* MOVIES GRID */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 ${
              selectedMovie?.id === movie.id
                ? "border-green-500"
                : "border-transparent"
            }`}
          >
            <img
              src={image_base_url + movie.poster_path}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <p className="text-center mt-2 text-sm">{movie.title}</p>
          </div>
        ))}
      </div>

      {/* PRICE */}
     <input
  type="number"
  placeholder="Show Price"
  value={showPrice}
  onChange={(e) => setShowPrice(e.target.value)}
  className="mt-6 p-2 border rounded w-60"
/>

      {/* DATE TIME */}
     <div className="flex gap-3 mt-4 items-center">
        <input
  type="datetime-local"
  value={dateTimeInput}
  onChange={(e) => setDateTimeInput(e.target.value)}
  className="p-2 border rounded w-72"
/>

        <button
          onClick={addDateTime}
          className="px-4 bg-black text-white rounded"
        >
          Add
        </button>
      </div>

      {/* ADD SHOW */}
      <button
        onClick={addShow}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded"
      >
        Add Show
      </button>
    </div>
  );
};

export default AddShows;
