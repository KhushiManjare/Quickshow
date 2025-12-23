// import {
//   ChartLineIcon,
//   CircleDollarSignIcon,
//   PlayCircleIcon,
//   StarIcon,
//   UsersIcon,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import BlurCircle from "../../components/BlurCircle";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const {
//     axios,
//     getToken,
//     user,
//     image_base_url,
//     dashboardRefreshKey, // 🔥 IMPORTANT
//   } = useAppContext();

//   const currency = import.meta.env.VITE_CURRENCY;

//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     activeShows: [],
//     totalUser: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   const dashboardCards = [
//     {
//       title: "Total Bookings",
//       value: dashboardData.totalBookings || "0",
//       icon: ChartLineIcon,
//     },
//     {
//       title: "Total Revenue",
//       value: `${currency}${dashboardData.totalRevenue || 0}`,
//       icon: CircleDollarSignIcon,
//     },
//     {
//       title: "Active Shows",
//       value: dashboardData.activeShows?.length || 0,
//       icon: PlayCircleIcon,
//     },
//     {
//       title: "Total Users",
//       value: dashboardData.totalUser || "0",
//       icon: UsersIcon,
//     },
//   ];

//   /* ================= FETCH DASHBOARD ================= */
//   const fetchDashboardData = async () => {
//     try {
//       const token = await getToken();

//       const { data } = await axios.get("/api/admin/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data?.success) {
//         setDashboardData(data.dashboardData);
//       } else {
//         toast.error(data?.message || "Failed to load dashboard");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error fetching dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* 🔥 REFRESH ON LOGIN + ADD SHOW */
//   useEffect(() => {
//       console.log("🔥 Dashboard re-fetch triggered", dashboardRefreshKey);
//     if (user) fetchDashboardData();
//   }, [user, dashboardRefreshKey]); // 👈 THIS FIXES IT

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="Admin" text2="Dashboard" />

//       {/* DASHBOARD CARDS */}
//       <div className="relative flex flex-wrap gap-4 mt-6">
//         <BlurCircle top="-100px" left="0" />

//         {dashboardCards.map((card, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md w-full max-w-xs"
//           >
//             <div>
//               <h1 className="text-sm">{card.title}</h1>
//               <p className="text-xl font-medium mt-1">{card.value}</p>
//             </div>
//             <card.icon className="w-6 h-6" />
//           </div>
//         ))}
//       </div>

//       {/* ACTIVE SHOWS */}
//       <p className="mt-10 text-lg font-medium">Active Shows</p>

//       <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
//         <BlurCircle top="100px" left="-10%" />

//         {dashboardData.activeShows
//           ?.filter((show) => show?.movie)
//           .map((show) => (
//             <div
//               key={show._id}
//               className="w-56 rounded-lg overflow-hidden pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
//             >
//               <img
//                 src={image_base_url + show.movie.poster_path}
//                 alt={show.movie.title}
//                 className="h-60 w-full object-cover"
//               />

//               <p className="font-medium p-2 truncate">
//                 {show.movie.title}
//               </p>

//               <div className="flex items-center justify-between px-2">
//                 <p className="text-lg font-medium">
//                   {currency} {show.showPrice}
//                 </p>

//                 <p className="flex items-center gap-1 text-sm text-gray-400">
//                   <StarIcon className="w-4 h-4 text-primary fill-primary" />
//                   {show.movie.vote_average?.toFixed(1) || "N/A"}
//                 </p>
//               </div>

//               <p className="px-2 pt-2 text-sm text-gray-500">
//                 {dateFormat(show.showDateTime)}
//               </p>
//             </div>
//           ))}

//         {dashboardData.activeShows?.filter((s) => s?.movie).length === 0 && (
//           <p className="text-gray-400">No active shows available</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;
// import {
//   ChartLineIcon,
//   CircleDollarSignIcon,
//   PlayCircleIcon,
//   StarIcon,
//   UsersIcon,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import BlurCircle from "../../components/BlurCircle";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const {
//     axios,
//     getToken,
//     user,
//     image_base_url,
//     dashboardRefreshKey,
//   } = useAppContext();

//   const currency = import.meta.env.VITE_CURRENCY;

//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     activeShows: [],
//     totalUser: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   const dashboardCards = [
//     {
//       title: "Total Bookings",
//       value: dashboardData.totalBookings || "0",
//       icon: ChartLineIcon,
//     },
//     {
//       title: "Total Revenue",
//       value: `${currency}${dashboardData.totalRevenue || 0}`,
//       icon: CircleDollarSignIcon,
//     },
//     {
//       title: "Active Shows",
//       value: dashboardData.activeShows.length,
//       icon: PlayCircleIcon,
//     },
//     {
//       title: "Total Users",
//       value: dashboardData.totalUser || "0",
//       icon: UsersIcon,
//     },
//   ];

//   /* ================= FETCH DASHBOARD ================= */
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       const token = await getToken();
//       const { data } = await axios.get("/api/admin/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data?.success && data.dashboardData) {
//         setDashboardData(data.dashboardData);
//       } else {
//         toast.error("Failed to load dashboard");
//       }
//     } catch (error) {
//       console.error("DASHBOARD FETCH ERROR:", error);
//       toast.error("Error fetching dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* 🔥 REFRESH ON LOGIN + ADD SHOW */
//   useEffect(() => {
//     if (user) {
//       console.log("🔥 Dashboard re-fetch triggered", dashboardRefreshKey);
//       fetchDashboardData();
//     }
//   }, [user, dashboardRefreshKey]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="Admin" text2="Dashboard" />

//       {/* DASHBOARD CARDS */}
//       <div className="relative flex flex-wrap gap-4 mt-6">
//         <BlurCircle top="-100px" left="0" />

//         {dashboardCards.map((card, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md w-full max-w-xs"
//           >
//             <div>
//               <h1 className="text-sm">{card.title}</h1>
//               <p className="text-xl font-medium mt-1">{card.value}</p>
//             </div>
//             <card.icon className="w-6 h-6" />
//           </div>
//         ))}
//       </div>

//       {/* ACTIVE SHOWS */}
//       <p className="mt-10 text-lg font-medium">Active Shows</p>

//       <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
//         <BlurCircle top="100px" left="-10%" />

//         {dashboardData.activeShows.length === 0 && (
//           <p className="text-gray-400">No active shows available</p>
//         )}

//         {dashboardData.activeShows.map((show) => (
//           <div
//             key={show._id}
//             className="w-56 rounded-lg overflow-hidden pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
//           >
//             {show.movie ? (
//               <>
//                 <img
//                   src={image_base_url + show.movie.poster_path}
//                   alt={show.movie.title}
//                   className="h-60 w-full object-cover"
//                 />

//                 <p className="font-medium p-2 truncate">
//                   {show.movie.title}
//                 </p>

//                 <div className="flex items-center justify-between px-2">
//                   <p className="text-lg font-medium">
//                     {currency} {show.showPrice}
//                   </p>

//                   <p className="flex items-center gap-1 text-sm text-gray-400">
//                     <StarIcon className="w-4 h-4 text-primary fill-primary" />
//                     {show.movie.vote_average?.toFixed(1) || "N/A"}
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <p className="p-4 text-sm text-gray-400">
//                 Movie data unavailable
//               </p>
//             )}

//             <p className="px-2 pt-2 text-sm text-gray-500">
//               {dateFormat(show.showDateTime)}
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Dashboard;
// import {
//   ChartLineIcon,
//   CircleDollarSignIcon,
//   PlayCircleIcon,
//   StarIcon,
//   UsersIcon,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios"; // ✅ USE GLOBAL AXIOS
// import Loading from "../../components/Loading";
// import Title from "../../components/admin/Title";
// import BlurCircle from "../../components/BlurCircle";
// import { dateFormat } from "../../lib/dateFormat";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const {
//     getToken,
//     user,
//     image_base_url,
//     dashboardRefreshKey,
//   } = useAppContext();

//   const currency = import.meta.env.VITE_CURRENCY;

//   const [dashboardData, setDashboardData] = useState({
//     totalBookings: 0,
//     totalRevenue: 0,
//     activeShows: [],
//     totalUser: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   const dashboardCards = [
//     {
//       title: "Total Bookings",
//       value: dashboardData.totalBookings || "0",
//       icon: ChartLineIcon,
//     },
//     {
//       title: "Total Revenue",
//       value: `${currency}${dashboardData.totalRevenue || 0}`,
//       icon: CircleDollarSignIcon,
//     },
//     {
//       title: "Active Shows",
//       value: dashboardData.activeShows.length,
//       icon: PlayCircleIcon,
//     },
//     {
//       title: "Total Users",
//       value: dashboardData.totalUser || "0",
//       icon: UsersIcon,
//     },
//   ];

//   /* ================= FETCH DASHBOARD ================= */
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);

//       const token = await getToken();

//       const { data } = await axios.get("/api/admin/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data?.success && data.dashboardData) {
//         setDashboardData(data.dashboardData);
//       } else {
//         toast.error("Failed to load dashboard");
//       }
//     } catch (error) {
//       console.error("DASHBOARD FETCH ERROR:", error);
//       toast.error("Error fetching dashboard data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* 🔥 REFRESH ON LOGIN + ADD SHOW */
//   useEffect(() => {
//     if (user) {
//       console.log("🔥 Dashboard re-fetch triggered", dashboardRefreshKey);
//       fetchDashboardData();
//     }
//   }, [user, dashboardRefreshKey]);

//   if (loading) return <Loading />;

//   return (
//     <>
//       <Title text1="Admin" text2="Dashboard" />

//       {/* DASHBOARD CARDS */}
//       <div className="relative flex flex-wrap gap-4 mt-6">
//         <BlurCircle top="-100px" left="0" />

//         {dashboardCards.map((card, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md w-full max-w-xs"
//           >
//             <div>
//               <h1 className="text-sm">{card.title}</h1>
//               <p className="text-xl font-medium mt-1">{card.value}</p>
//             </div>
//             <card.icon className="w-6 h-6" />
//           </div>
//         ))}
//       </div>

//       {/* ACTIVE SHOWS */}
//       <p className="mt-10 text-lg font-medium">Active Shows</p>

//       <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
//         <BlurCircle top="100px" left="-10%" />

//         {dashboardData.activeShows.length === 0 && (
//           <p className="text-gray-400">No active shows available</p>
//         )}

//         {dashboardData.activeShows.map((show) => (
//           <div
//             key={show._id}
//             className="w-56 rounded-lg overflow-hidden pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
//           >
//             {show.movie ? (
//               <>
//                 <img
//                   src={image_base_url + show.movie.poster_path}
//                   alt={show.movie.title}
//                   className="h-60 w-full object-cover"
//                 />

//                 <p className="font-medium p-2 truncate">
//                   {show.movie.title}
//                 </p>

//                 <div className="flex items-center justify-between px-2">
//                   <p className="text-lg font-medium">
//                     {currency} {show.showPrice}
//                   </p>

//                   <p className="flex items-center gap-1 text-sm text-gray-400">
//                     <StarIcon className="w-4 h-4 text-primary fill-primary" />
//                     {show.movie.vote_average?.toFixed(1) || "N/A"}
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <p className="p-4 text-sm text-gray-400">
//                 Movie data unavailable
//               </p>
//             )}

//             <p className="px-2 pt-2 text-sm text-gray-500">
//               {dateFormat(show.showDateTime)}
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Dashboard;
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios"; // ✅ GLOBAL AXIOS
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  // ✅ CORRECT CONTEXT USAGE (NO AXIOS HERE)
  const {
    getToken,
    user,
    image_base_url,
    dashboardRefreshKey,
  } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue || 0}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length,
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  /* ================= FETCH DASHBOARD ================= */
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success && data.dashboardData) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error("Failed to load dashboard");
      }
    } catch (error) {
      console.error("DASHBOARD FETCH ERROR:", error);
      toast.error("Error fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  /* 🔥 REFRESH ON LOGIN + ADD SHOW */
  useEffect(() => {
    if (user) {
      console.log("🔥 Dashboard re-fetch triggered", dashboardRefreshKey);
      fetchDashboardData();
    }
  }, [user, dashboardRefreshKey]);

  if (loading) return <Loading />;

  return (
    <>
      <Title text1="Admin" text2="Dashboard" />

      {/* DASHBOARD CARDS */}
      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlurCircle top="-100px" left="0" />

        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md w-full max-w-xs"
          >
            <div>
              <h1 className="text-sm">{card.title}</h1>
              <p className="text-xl font-medium mt-1">{card.value}</p>
            </div>
            <card.icon className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* ACTIVE SHOWS */}
      <p className="mt-10 text-lg font-medium">Active Shows</p>

      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        <BlurCircle top="100px" left="-10%" />

        {dashboardData.activeShows.length === 0 && (
          <p className="text-gray-400">No active shows available</p>
        )}

        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="w-56 rounded-lg overflow-hidden pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300"
          >
            {show.movie ? (
              <>
                <img
                  src={image_base_url + show.movie.poster_path}
                  alt={show.movie.title}
                  className="h-60 w-full object-cover"
                />

                <p className="font-medium p-2 truncate">
                  {show.movie.title}
                </p>

                <div className="flex items-center justify-between px-2">
                  <p className="text-lg font-medium">
                    {currency} {show.showPrice}
                  </p>

                  <p className="flex items-center gap-1 text-sm text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {show.movie.vote_average?.toFixed(1) || "N/A"}
                  </p>
                </div>
              </>
            ) : (
              <p className="p-4 text-sm text-gray-400">
                Movie data unavailable
              </p>
            )}

            <p className="px-2 pt-2 text-sm text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
