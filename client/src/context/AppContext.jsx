// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [shows, setShows] = useState([]);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);

//   const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const fetchIsAdmin = async () => {
//     try {
//       const { data } = await axios.get("/api/admin/is-admin", {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//       });

//       setIsAdmin(data.isAdmin);

//       if (!data.isAdmin && location.pathname.startsWith("/admin")) {
//         navigate("/");
//         toast.error("You are not authorized to access admin dashboard");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//  const fetchShows = async () => {
//   try {
//     const { data } = await axios.get("/api/show/now-playing");

//     if (data.success) {
//       setShows(data.movies);
//     }
//   } catch (error) {
//     console.error("fetchShows error:", error);
//   }
// };

//   const fetchFavoriteMovies = async () => {
//     try {
//       const { data } = await axios.get("/api/user/favorites", {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//       });

//       if (data.success) {
//         setFavoriteMovies(data.movies);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchShows();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchIsAdmin();
//       fetchFavoriteMovies();
//     }
//   }, [user]);

//   const value = {
//     axios,
//     fetchIsAdmin,
//     user,
//     getToken,
//     navigate,
//     isAdmin,
//     shows,
//     favoriteMovies,
//     fetchFavoriteMovies,
//     image_base_url,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  /* ================= ADMIN CHECK ================= */
  const fetchIsAdmin = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/admin/is-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsAdmin(data.isAdmin);

      if (!data.isAdmin && location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("You are not authorized to access admin dashboard");
      }
    } catch (error) {
      console.error("ADMIN CHECK ERROR:", error);
    }
  };

  /* ================= FETCH SHOWS ================= */
  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/now-playing");

      if (data?.success && Array.isArray(data.movies)) {
        setShows(data.movies);
      } else {
        setShows([]);
      }
    } catch (error) {
      console.error("FETCH SHOWS ERROR:", error);
      setShows([]);
    }
  };

  /* ================= FETCH FAVORITES (FIXED) ================= */
  const fetchFavoriteMovies = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setFavoriteMovies([]);
        return;
      }

      const { data } = await axios.get("/api/user/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success && Array.isArray(data.movies)) {
        setFavoriteMovies(data.movies);
      } else {
        setFavoriteMovies([]);
      }
    } catch (error) {
      console.error("FETCH FAVORITES ERROR:", error);
      setFavoriteMovies([]);
    }
  };

  /* ================= ON APP LOAD ================= */
  useEffect(() => {
    fetchShows();
  }, []);

  /* ================= ON LOGIN / LOGOUT ================= */
  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    } else {
      // 🔥 IMPORTANT: clear on logout
      setIsAdmin(false);
      setFavoriteMovies([]);
    }
  }, [user]);

  const value = {
    axios,
    user,
    getToken,
    navigate,
    isAdmin,
    shows,
    favoriteMovies,
    fetchFavoriteMovies,
    image_base_url,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
