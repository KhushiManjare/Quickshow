// // // // import { useEffect, useState } from "react";
// // // // import Loading from "../components/Loading";
// // // // import BlurCircle from "../components/BlurCircle";
// // // // import timeFormat from "../lib/timeFormat";
// // // // import { dateFormat } from "../lib/dateFormat";
// // // // import { useAppContext } from "../context/AppContext";
// // // // import { Link } from "react-router-dom";

// // // // const MyBookings = () => {
// // // //   const currency = import.meta.env.VITE_CURRENCY;

// // // //   const { axios, getToken, user, image_base_url } = useAppContext();

// // // //   const [bookings, setBookings] = useState([]);
// // // //   const [isLoading, setIsLoading] = useState(true);

// // // //   const getMyBookings = async () => {
// // // //     try {
// // // //       const { data } = await axios.get("/api/user/bookings", {
// // // //         headers: { Authorization: `Bearer ${await getToken()}` },
// // // //       });

// // // //       if (data.success) {
// // // //         setBookings(data.bookings);
// // // //       }
// // // //     } catch (error) {
// // // //       console.log(error);
// // // //     }
// // // //     setIsLoading(false);
// // // //   };

// // // //   useEffect(() => {
// // // //     if (user) {
// // // //       getMyBookings();
// // // //     }
// // // //   }, [user]);

// // // //   return !isLoading ? (
// // // //     <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
// // // //       <BlurCircle top="100px" left="100px" />
// // // //       <div>
// // // //         <BlurCircle bottom="0px" left="600px" />
// // // //       </div>
// // // //       <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

// // // //       {bookings.map((item, index) => (
// // // //         <div
// // // //           key={index}
// // // //           className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
// // // //         >
// // // //           <div className="flex flex-col md:flex-row">
// // // //             <img
// // // //               src={image_base_url + item.show.movie.poster_path}
// // // //               alt="poster"
// // // //               className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded"
// // // //             />
// // // //             <div className="flex flex-col p-4">
// // // //               <p className="text-lg font-semibold">{item.show.movie.title}</p>
// // // //               <p className="text-gray-400 text-sm">
// // // //                 {timeFormat(item.show.movie.runtime)}
// // // //               </p>
// // // //               <p className="text-gray-400 text-sm mt-auto">
// // // //                 {dateFormat(item.show.showDateTime)}
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //           <div className="flex flex-col md:items-end md:text-right justify-between p-4">
// // // //             <div className="flex items-center gap-4">
// // // //               <p className="text-2xl font-semibold mb-3">
// // // //                 {currency}
// // // //                 {item.amount}
// // // //               </p>
// // // //               {!item.isPaid && (
// // // //                 <Link
// // // //                   to={item.paymentLink}
// // // //                   className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer"
// // // //                 >
// // // //                   Pay Now
// // // //                 </Link>
// // // //               )}
// // // //             </div>
// // // //             <div className="text-sm">
// // // //               <p>
// // // //                 <span className="text-gray-400">Total Tickets:</span>{" "}
// // // //                 {item.bookedSeats.length}
// // // //               </p>
// // // //               <p>
// // // //                 <span className="text-gray-400">Seat Number:</span>{" "}
// // // //                 {item.bookedSeats.join(", ")}
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   ) : (
// // // //     <Loading />
// // // //   );
// // // // };

// // // // export default MyBookings;
// // // import { useEffect, useState } from "react";
// // // import Loading from "../components/Loading";
// // // import BlurCircle from "../components/BlurCircle";
// // // import timeFormat from "../lib/timeFormat";
// // // import { dateFormat } from "../lib/dateFormat";
// // // import { useAppContext } from "../context/AppContext";
// // // import { Link } from "react-router-dom";

// // // const MyBookings = () => {
// // //   const currency = import.meta.env.VITE_CURRENCY || "$";
// // //   const { axios, getToken, user, image_base_url } = useAppContext();

// // //   const [bookings, setBookings] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   const getMyBookings = async () => {
// // //     try {
// // //       const { data } = await axios.get("/api/user/bookings", {
// // //         headers: { Authorization: `Bearer ${await getToken()}` },
// // //       });

// // //       if (data.success) {
// // //         setBookings(data.bookings);
// // //       }
// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //     setIsLoading(false);
// // //   };

// // //   useEffect(() => {
// // //     if (user) getMyBookings();
// // //   }, [user]);

// // //   if (isLoading) return <Loading />;

// // //   return (
// // //     <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
// // //       <BlurCircle top="100px" left="100px" />
// // //       <BlurCircle bottom="0px" left="600px" />

// // //       <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

// // //       {bookings.map((item) => (
// // //         <div
// // //           key={item._id}
// // //           className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
// // //         >
// // //           <div className="flex flex-col md:flex-row">
// // //             <img
// // //               src={
// // //                 item.show?.movie?.poster_path
// // //                   ? image_base_url + item.show.movie.poster_path
// // //                   : "/poster-placeholder.png"
// // //               }
// // //               alt="poster"
// // //               className="md:max-w-45 aspect-video object-cover rounded"
// // //             />

// // //             <div className="flex flex-col p-4">
// // //               <p className="text-lg font-semibold">
// // //                 {item.show?.movie?.title || "Movie"}
// // //               </p>
// // //               <p className="text-gray-400 text-sm">
// // //                 {timeFormat(item.show?.movie?.runtime || 0)}
// // //               </p>
// // //               <p className="text-gray-400 text-sm mt-auto">
// // //                 {item.show?.showDateTime
// // //                   ? dateFormat(item.show.showDateTime)
// // //                   : ""}
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="flex flex-col md:items-end md:text-right justify-between p-4">
// // //             <div className="flex items-center gap-4">
// // //               <p className="text-2xl font-semibold mb-3">
// // //                 {currency}
// // //                 {item.amount}
// // //               </p>
// // //               {!item.isPaid && item.paymentLink && (
// // //                 <a
// // //                   href={item.paymentLink}
// // //                   className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium"
// // //                 >
// // //                   Pay Now
// // //                 </a>
// // //               )}
// // //             </div>

// // //             <div className="text-sm">
// // //               <p>
// // //                 <span className="text-gray-400">Total Tickets:</span>{" "}
// // //                 {item.bookedSeats.length}
// // //               </p>
// // //               <p>
// // //                 <span className="text-gray-400">Seat Number:</span>{" "}
// // //                 {item.bookedSeats.join(", ")}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default MyBookings;
// // import { useEffect, useState } from "react";
// // import Loading from "../components/Loading";
// // import BlurCircle from "../components/BlurCircle";
// // import timeFormat from "../lib/timeFormat";
// // import { dateFormat } from "../lib/dateFormat";
// // import { useAppContext } from "../context/AppContext";

// // const MyBookings = () => {
// //   const currency = import.meta.env.VITE_CURRENCY || "$";
// //   const { axios, getToken, user, image_base_url } = useAppContext();

// //   const [bookings, setBookings] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   const getMyBookings = async () => {
// //     try {
// //       const { data } = await axios.get("/api/user/bookings", {
// //         headers: { Authorization: `Bearer ${await getToken()}` },
// //       });

// //       if (data.success) {
// //         setBookings(data.bookings);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //     setIsLoading(false);
// //   };

// //   useEffect(() => {
// //     if (user) getMyBookings();
// //   }, [user]);

// //   if (isLoading) return <Loading />;

// //   return (
// //     <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
// //       <BlurCircle top="100px" left="100px" />
// //       <BlurCircle bottom="0px" left="600px" />

// //       <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

// //       {bookings.map((item) => (
// //         <div
// //           key={item._id}
// //           className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
// //         >
// //           {/* LEFT */}
// //           <div className="flex flex-col md:flex-row">
// //             <img
// //               src={
// //                 item.show?.movie?.poster_path
// //                   ? image_base_url + item.show.movie.poster_path
// //                   : "/poster-placeholder.png"
// //               }
// //               alt="poster"
// //               className="md:max-w-45 aspect-video object-cover rounded"
// //             />

// //             <div className="flex flex-col p-4">
// //               <p className="text-lg font-semibold">
// //                 {item.show?.movie?.title || "Movie"}
// //               </p>

// //               {/* ✅ FIXED DURATION */}
// //               {item.show?.movie?.runtime ? (
// //                 <p className="text-gray-400 text-sm">
// //                   {timeFormat(item.show.movie.runtime)}
// //                 </p>
// //               ) : (
// //                 <p className="text-gray-400 text-sm opacity-60">
// //                   Duration not available
// //                 </p>
// //               )}

// //               <p className="text-gray-400 text-sm mt-auto">
// //                 {item.show?.showDateTime
// //                   ? dateFormat(item.show.showDateTime)
// //                   : ""}
// //               </p>
// //             </div>
// //           </div>

// //           {/* RIGHT */}
// //           <div className="flex flex-col md:items-end md:text-right justify-between p-4">
// //             <div className="flex items-center gap-4">
// //               <p className="text-2xl font-semibold mb-3">
// //                 {currency}
// //                 {item.amount}
// //               </p>

// //               {/* ✅ Hide Pay Now if already paid */}
// //               {!item.isPaid && item.paymentLink && (
// //                 <a
// //                   href={item.paymentLink}
// //                   className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium"
// //                 >
// //                   Pay Now
// //                 </a>
// //               )}

// //               {item.isPaid && (
// //                 <span className="text-green-400 font-medium mb-3">
// //                   Paid ✓
// //                 </span>
// //               )}
// //             </div>

// //             <div className="text-sm">
// //               <p>
// //                 <span className="text-gray-400">Total Tickets:</span>{" "}
// //                 {item.bookedSeats.length}
// //               </p>
// //               <p>
// //                 <span className="text-gray-400">Seat Number:</span>{" "}
// //                 {item.bookedSeats.join(", ")}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MyBookings;
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

//   const getMyBookings = async () => {
//     try {
//       const { data } = await axios.get("/api/user/bookings", {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//       });

//       if (data.success) {
//         setBookings(data.bookings);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     if (user) getMyBookings();
//   }, [user]);

//   if (isLoading) return <Loading />;

//   return (
//     <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
//       <BlurCircle top="100px" left="100px" />

//       <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

//       {bookings.map((item) => {
//         const movie = item.show?.movie;

//         return (
//           <div
//             key={item._id}
//             className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl"
//           >
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

//             <div className="flex flex-col md:items-end md:text-right justify-between p-4">
//               <div className="flex items-center gap-4">
//                 <p className="text-2xl font-semibold mb-3">
//                   {currency}
//                   {item.amount}
//                 </p>

//                 {/* ✅ SHOW PAY NOW ONLY IF NOT PAID */}
//                 {!item.isPaid && item.paymentLink && (
//                   <a
//                     href={item.paymentLink}
//                     className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium"
//                   >
//                     Pay Now
//                   </a>
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

  const getMyBookings = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/user/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("MY BOOKINGS ERROR:", error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) getMyBookings();
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

                {!item.isPaid && item.paymentLink && (
                  <a
                    href={item.paymentLink}
                    className="bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium"
                  >
                    Pay Now
                  </a>
                )}

                {item.isPaid && (
                  <span className="text-green-400 text-sm font-medium mb-3">
                    Paid
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
