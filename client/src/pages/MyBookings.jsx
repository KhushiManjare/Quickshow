
// import { useEffect, useState } from "react";
// import Loading from "../components/Loading";
// import BlurCircle from "../components/BlurCircle";
// import timeFormat from "../lib/timeFormat";
// import { dateFormat } from "../lib/dateFormat";
// import { useAppContext } from "../context/AppContext";

// const MyBookings = () => {
//   const currency = import.meta.env.VITE_CURRENCY || "₹";
//   const { axios, getToken, user, image_base_url } = useAppContext();

//   const [bookings, setBookings] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       const token = await getToken();
//       if (!token) return;

//       const { data } = await axios.get("/api/user/bookings", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data?.success && Array.isArray(data.bookings)) {
//         setBookings(data.bookings);
//       }
//     } catch (err) {
//       console.error("MY BOOKINGS ERROR:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 1️⃣ Initial fetch
//   useEffect(() => {
//     if (user) fetchBookings();
//   }, [user]);

//   // 2️⃣ STRIPE SUCCESS HANDLER (🔥 IMPORTANT)
//   useEffect(() => {
//     if (!window.location.search.includes("payment=success")) return;

//     let attempts = 0;

//     const interval = setInterval(() => {
//       fetchBookings();
//       attempts++;

//       // stop after 5 tries (~10 seconds)
//       if (attempts >= 5) clearInterval(interval);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   if (isLoading) return <Loading />;

//   return (
//     <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
//       <BlurCircle top="100px" left="100px" />

//       <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

//       {bookings.length === 0 && (
//         <p className="text-gray-400">No bookings found.</p>
//       )}

//       {bookings.map((item) => {
//         const movie = item.show?.movie;

//         return (
//           <div
//             key={item._id}
//             className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
//           >
//             {/* LEFT */}
//             <div className="flex flex-col md:flex-row">
//               <img
//                 src={
//                   movie?.poster_path
//                     ? image_base_url + movie.poster_path
//                     : "/poster-placeholder.png"
//                 }
//                 alt="poster"
//                 className="md:max-w-45 aspect-video object-cover rounded"
//               />

//               <div className="flex flex-col p-4">
//                 <p className="text-lg font-semibold">
//                   {movie?.title || "Movie"}
//                 </p>

//                 <p className="text-gray-400 text-sm">
//                   {movie?.runtime
//                     ? timeFormat(movie.runtime)
//                     : "Duration not available"}
//                 </p>

//                 <p className="text-gray-400 text-sm mt-auto">
//                   {item.show?.showDateTime
//                     ? dateFormat(item.show.showDateTime)
//                     : ""}
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT */}
//             <div className="flex flex-col md:items-end md:text-right justify-between p-4">
//               <div className="flex items-center gap-4">
//                 <p className="text-2xl font-semibold mb-3">
//                   {currency}
//                   {item.amount}
//                 </p>

//                 {!item.isPaid && item.paymentLink && (
//                   <a
//                     href={item.paymentLink}
//                     className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium"
//                   >
//                     Pay Now
//                   </a>
//                 )}

//                 {item.isPaid && (
//                   <span className="text-green-400 text-sm font-medium mb-3">
//                     Paid ✓
//                   </span>
//                 )}
//               </div>

//               <div className="text-sm">
//                 <p>
//                   <span className="text-gray-400">Total Tickets:</span>{" "}
//                   {item.bookedSeats.length}
//                 </p>
//                 <p>
//                   <span className="text-gray-400">Seat Number:</span>{" "}
//                   {item.bookedSeats.join(", ")}
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MyBookings;
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";
import { useAppContext } from "../context/AppContext";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const { axios, getToken, user, image_base_url } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/user/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("MY BOOKINGS ERROR:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    if (!user) return;

    fetchBookings();

    // 🔥 STRIPE SUCCESS FORCE-REFRESH
    if (window.location.search.includes("payment=success")) {
      let attempts = 0;

      const interval = setInterval(() => {
        fetchBookings();
        attempts++;

        // stop after ~12 seconds
        if (attempts >= 6) {
          clearInterval(interval);
          // 🔥 clean URL
          window.history.replaceState({}, "", "/my-bookings");
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />

      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-gray-400">No bookings found.</p>
      )}

      {bookings.map((item) => {
        const movie = item.show?.movie;

        return (
          <div
            key={item._id}
            className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
          >
            {/* LEFT */}
            <div className="flex flex-col md:flex-row">
              <img
                src={
                  movie?.poster_path
                    ? image_base_url + movie.poster_path
                    : "/poster-placeholder.png"
                }
                alt="poster"
                className="md:max-w-45 aspect-video object-cover rounded"
              />

              <div className="flex flex-col p-4">
                <p className="text-lg font-semibold">
                  {movie?.title || "Movie"}
                </p>

                <p className="text-gray-400 text-sm">
                  {movie?.runtime
                    ? timeFormat(movie.runtime)
                    : "Duration not available"}
                </p>

                <p className="text-gray-400 text-sm mt-auto">
                  {item.show?.showDateTime
                    ? dateFormat(item.show.showDateTime)
                    : ""}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col md:items-end md:text-right justify-between p-4">
              <div className="flex items-center gap-4">
                <p className="text-2xl font-semibold mb-3">
                  {currency}
                  {item.amount}
                </p>

                {/* 🔥 BULLETPROOF PAYMENT STATE */}
                {item.isPaid ? (
                  <span className="text-green-400 text-sm font-medium mb-3">
                    Paid ✓
                  </span>
                ) : item.paymentLink ? (
                  <a
                    href={item.paymentLink}
                    className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium"
                  >
                    Pay Now
                  </a>
                ) : (
                  <span className="text-yellow-400 text-sm font-medium mb-3">
                    Processing…
                  </span>
                )}
              </div>

              <div className="text-sm">
                <p>
                  <span className="text-gray-400">Total Tickets:</span>{" "}
                  {item.bookedSeats.length}
                </p>
                <p>
                  <span className="text-gray-400">Seat Number:</span>{" "}
                  {item.bookedSeats.join(", ")}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;
