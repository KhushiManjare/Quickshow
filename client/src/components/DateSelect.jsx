// // // // // // import { useState } from "react";
// // // // // // import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// // // // // // import BlurCircle from "./BlurCircle";
// // // // // // import toast from "react-hot-toast";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // const DateSelect = ({ dateTime = [], id }) => {
// // // // // //   const navigate = useNavigate();
// // // // // //   const [selected, setSelected] = useState(null);

// // // // // //   // ✅ SAFELY EXTRACT UNIQUE DATES
// // // // // //   const dates = Array.isArray(dateTime)
// // // // // //     ? [...new Set(
// // // // // //         dateTime
// // // // // //           .map((s) => s?.showDateTime)
// // // // // //           .filter(Boolean)
// // // // // //           .map((d) => new Date(d).toISOString().split("T")[0])
// // // // // //       )]
// // // // // //     : [];

// // // // // //   const onBookHandler = () => {
// // // // // //     if (!selected) {
// // // // // //       return toast.error("Please select a date");
// // // // // //     }
// // // // // //     navigate(`/movies/${id}/${selected}`);
// // // // // //     scrollTo(0, 0);
// // // // // //   };

// // // // // //   if (dates.length === 0) {
// // // // // //     return (
// // // // // //       <div className="pt-20 text-center text-gray-400">
// // // // // //         No shows available for booking
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div id="dateSelect" className="pt-30">
// // // // // //       <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
// // // // // //         <BlurCircle top="-100px" left="-100px" />
// // // // // //         <BlurCircle top="100px" right="0" />

// // // // // //         <div>
// // // // // //           <p className="text-lg font-semibold">Choose Date</p>

// // // // // //           <div className="flex items-center gap-6 text-sm mt-5">
// // // // // //             <ChevronLeftIcon width={28} />

// // // // // //             <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
// // // // // //               {dates.map((date) => {
// // // // // //                 const d = new Date(date);

// // // // // //                 return (
// // // // // //                   <button
// // // // // //                     key={date}
// // // // // //                     onClick={() => setSelected(date)}
// // // // // //                     className={`flex flex-col items-center justify-center h-14 w-14 rounded cursor-pointer ${
// // // // // //                       selected === date
// // // // // //                         ? "bg-primary text-white"
// // // // // //                         : "border border-primary/70"
// // // // // //                     }`}
// // // // // //                   >
// // // // // //                     <span>{d.getDate()}</span>
// // // // // //                     <span>
// // // // // //                       {d.toLocaleString("en-US", { month: "short" })}
// // // // // //                     </span>
// // // // // //                   </button>
// // // // // //                 );
// // // // // //               })}
// // // // // //             </span>

// // // // // //             <ChevronRightIcon width={28} />
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <button
// // // // // //           onClick={onBookHandler}
// // // // // //           className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
// // // // // //         >
// // // // // //           Book Now
// // // // // //         </button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default DateSelect;
// // // // // import { useState } from "react";
// // // // // import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// // // // // import BlurCircle from "./BlurCircle";
// // // // // import toast from "react-hot-toast";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const DateSelect = ({ dateTime = [], id }) => {
// // // // //   const navigate = useNavigate();
// // // // //   const [selected, setSelected] = useState(null);

// // // // //   // ✅ Extract valid unique dates
// // // // //   const dates = Array.isArray(dateTime)
// // // // //     ? [...new Set(
// // // // //         dateTime
// // // // //           .map((s) => s?.showDateTime)
// // // // //           .filter(Boolean)
// // // // //           .map((d) => new Date(d).toISOString().split("T")[0])
// // // // //       )]
// // // // //     : [];

// // // // //   const onBookHandler = () => {
// // // // //     if (!selected) {
// // // // //       return toast.error("Please select a date");
// // // // //     }
// // // // //     navigate(`/movies/${id}/${selected}`);
// // // // //     scrollTo(0, 0);
// // // // //   };

// // // // //   return (
// // // // //     <div id="dateSelect" className="pt-30">
// // // // //       <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
// // // // //         <BlurCircle top="-100px" left="-100px" />
// // // // //         <BlurCircle top="100px" right="0" />

// // // // //         <div>
// // // // //           <p className="text-lg font-semibold">Choose Date</p>

// // // // //           <div className="flex items-center gap-6 text-sm mt-5">
// // // // //             <ChevronLeftIcon width={28} />

// // // // //             <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
// // // // //               {dates.length > 0 ? (
// // // // //                 dates.map((date) => {
// // // // //                   const d = new Date(date);
// // // // //                   return (
// // // // //                     <button
// // // // //                       key={date}
// // // // //                       onClick={() => setSelected(date)}
// // // // //                       className={`flex flex-col items-center justify-center h-14 w-14 rounded cursor-pointer ${
// // // // //                         selected === date
// // // // //                           ? "bg-primary text-white"
// // // // //                           : "border border-primary/70"
// // // // //                       }`}
// // // // //                     >
// // // // //                       <span>{d.getDate()}</span>
// // // // //                       <span>
// // // // //                         {d.toLocaleString("en-US", { month: "short" })}
// // // // //                       </span>
// // // // //                     </button>
// // // // //                   );
// // // // //                 })
// // // // //               ) : (
// // // // //                 <p className="text-gray-400 col-span-3">
// // // // //                   No shows available yet
// // // // //                 </p>
// // // // //               )}
// // // // //             </span>

// // // // //             <ChevronRightIcon width={28} />
// // // // //           </div>
// // // // //         </div>

// // // // //         <button
// // // // //           onClick={onBookHandler}
// // // // //           disabled={dates.length === 0}
// // // // //           className={`px-8 py-2 mt-6 rounded cursor-pointer ${
// // // // //             dates.length === 0
// // // // //               ? "bg-gray-500 cursor-not-allowed"
// // // // //               : "bg-primary hover:bg-primary/90 text-white"
// // // // //           }`}
// // // // //         >
// // // // //           Book Now
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default DateSelect;
// // // //    import { useState } from "react";
// // // // import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// // // // import BlurCircle from "./BlurCircle";
// // // // import toast from "react-hot-toast";
// // // // import { useNavigate } from "react-router-dom";

// // // // const DateSelect = ({ dateTime = [], id }) => {
// // // //   const navigate = useNavigate();
// // // //   const [selected, setSelected] = useState(null);

// // // //   const dates = Array.isArray(dateTime)
// // // //     ? [
// // // //         ...new Set(
// // // //           dateTime
// // // //             .map((s) => s?.showDateTime)
// // // //             .filter(Boolean)
// // // //             .map((d) => new Date(d).toISOString().split("T")[0])
// // // //         ),
// // // //       ]
// // // //     : [];
// // // // console.log("🔥 DateSelect props:", dateTime);

// // // //   const onBookHandler = () => {
// // // //     if (!selected) {
// // // //       return toast.error("Please select a date");
// // // //     }
// // // //     navigate(`/movies/${id}/${selected}`);
// // // //     scrollTo(0, 0);
// // // //   };

// // // //   return (
// // // //     <div id="dateSelect" className="pt-30">
// // // //       <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
// // // //         <BlurCircle top="-100px" left="-100px" />
// // // //         <BlurCircle top="100px" right="0" />

// // // //         <div>
// // // //           <p className="text-lg font-semibold">Choose Date</p>

// // // //           <div className="flex items-center gap-6 text-sm mt-5">
// // // //             <ChevronLeftIcon width={28} />

// // // //             <span className="grid grid-cols-3 md:flex flex-wrap gap-4">
// // // //               {dates.length > 0 ? (
// // // //                 dates.map((date) => {
// // // //                   const d = new Date(date);
// // // //                   return (
// // // //                     <button
// // // //                       key={date}
// // // //                       onClick={() => setSelected(date)}
// // // //                       className={`flex flex-col items-center justify-center h-14 w-14 rounded ${
// // // //                         selected === date
// // // //                           ? "bg-primary text-white"
// // // //                           : "border border-primary/70"
// // // //                       }`}
// // // //                     >
// // // //                       <span>{d.getDate()}</span>
// // // //                       <span>
// // // //                         {d.toLocaleString("en-US", { month: "short" })}
// // // //                       </span>
// // // //                     </button>
// // // //                   );
// // // //                 })
// // // //               ) : (
// // // //                 <p className="text-gray-400">No shows available</p>
// // // //               )}
// // // //             </span>

// // // //             <ChevronRightIcon width={28} />
// // // //           </div>
// // // //         </div>

// // // //         <button
// // // //           onClick={onBookHandler}
// // // //           disabled={dates.length === 0}
// // // //           className={`px-8 py-2 mt-6 rounded ${
// // // //             dates.length === 0
// // // //               ? "bg-gray-500 cursor-not-allowed"
// // // //               : "bg-primary text-white"
// // // //           }`}
// // // //         >
// // // //           Book Now
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DateSelect;
// // // import { useState } from "react";
// // // import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// // // import BlurCircle from "./BlurCircle";
// // // import toast from "react-hot-toast";
// // // import { useNavigate } from "react-router-dom";

// // // const DateSelect = ({ dateTime = [], id }) => {
// // //   const navigate = useNavigate();
// // //   const [selected, setSelected] = useState(null);

// // //   const dates = Array.isArray(dateTime)
// // //     ? [
// // //         ...new Set(
// // //           dateTime
// // //             .map((s) => s?.showDateTime)
// // //             .filter(Boolean)
// // //             .map((d) => new Date(d).toISOString().split("T")[0])
// // //         ),
// // //       ]
// // //     : [];

// // //   const onBookHandler = () => {
// // //     if (!selected) {
// // //       return toast.error("Please select a date");
// // //     }
// // //     navigate(`/movies/${id}/${selected}`);
// // //     scrollTo(0, 0);
// // //   };

// // //   /* ===== NO SHOWS LOGIC ===== */
// // //   if (dates.length === 0) {
// // //     return (
// // //       <div
// // //         id="dateSelect"
// // //         className="mt-16 text-center text-gray-400"
// // //       >
// // //         <p className="text-lg font-medium">
// // //           No shows available for this movie yet
// // //         </p>
// // //         <p className="text-sm mt-2">
// // //           Please check back later.
// // //         </p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div id="dateSelect" className="pt-30">
// // //       <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
// // //         <BlurCircle top="-100px" left="-100px" />
// // //         <BlurCircle top="100px" right="0" />

// // //         <div>
// // //           <p className="text-lg font-semibold">Choose Date</p>

// // //           <div className="flex items-center gap-6 text-sm mt-5">
// // //             <ChevronLeftIcon width={28} />

// // //             <span className="grid grid-cols-3 md:flex flex-wrap gap-4">
// // //               {dates.map((date) => {
// // //                 const d = new Date(date);
// // //                 return (
// // //                   <button
// // //                     key={date}
// // //                     onClick={() => setSelected(date)}
// // //                     className={`flex flex-col items-center justify-center h-14 w-14 rounded ${
// // //                       selected === date
// // //                         ? "bg-primary text-white"
// // //                         : "border border-primary/70"
// // //                     }`}
// // //                   >
// // //                     <span>{d.getDate()}</span>
// // //                     <span>
// // //                       {d.toLocaleString("en-US", {
// // //                         month: "short",
// // //                       })}
// // //                     </span>
// // //                   </button>
// // //                 );
// // //               })}
// // //             </span>

// // //             <ChevronRightIcon width={28} />
// // //           </div>
// // //         </div>

// // //         <button
// // //           onClick={onBookHandler}
// // //           className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90"
// // //         >
// // //           Book Now
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DateSelect;
// // import { useState, useMemo } from "react";
// // import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// // import BlurCircle from "./BlurCircle";
// // import toast from "react-hot-toast";
// // import { useNavigate } from "react-router-dom";

// // const DateSelect = ({ dateTime = [], id }) => {
// //   const navigate = useNavigate();
// //   const [selected, setSelected] = useState(null);

// //   // ✅ Extract unique dates from MongoDB shows
// //   const dates = useMemo(() => {
// //     if (!Array.isArray(dateTime)) return [];

// //     return [
// //       ...new Set(
// //         dateTime
// //           .map((show) => show.showDateTime)
// //           .filter(Boolean)
// //           .map((dt) => new Date(dt).toISOString().split("T")[0])
// //       ),
// //     ];
// //   }, [dateTime]);

// //   const onBookHandler = () => {
// //     if (!selected) {
// //       return toast.error("Please select a date");
// //     }
// //     navigate(`/movies/${id}/${selected}`);
// //     scrollTo(0, 0);
// //   };

// //   if (dates.length === 0) {
// //     return (
// //       <div className="pt-20 text-center text-gray-400">
// //         No shows available for booking
// //       </div>
// //     );
// //   }

// //   return (
// //     <div id="dateSelect" className="pt-30">
// //       <div className="relative p-8 bg-primary/10 border border-primary/20 rounded-lg">
// //         <BlurCircle top="-80px" left="-80px" />
// //         <BlurCircle top="80px" right="0" />

// //         <p className="text-lg font-semibold mb-6">Choose Date</p>

// //         <div className="flex items-center gap-6">
// //           <ChevronLeftIcon />

// //           <div className="flex gap-4 flex-wrap">
// //             {dates.map((date) => {
// //               const d = new Date(date);
// //               return (
// //                 <button
// //                   key={date}
// //                   onClick={() => setSelected(date)}
// //                   className={`h-14 w-14 rounded flex flex-col items-center justify-center ${
// //                     selected === date
// //                       ? "bg-primary text-white"
// //                       : "border border-primary/60"
// //                   }`}
// //                 >
// //                   <span className="text-sm">{d.getDate()}</span>
// //                   <span className="text-xs">
// //                     {d.toLocaleString("en-US", { month: "short" })}
// //                   </span>
// //                 </button>
// //               );
// //             })}
// //           </div>

// //           <ChevronRightIcon />
// //         </div>

// //         <button
// //           onClick={onBookHandler}
// //           className="mt-6 px-8 py-2 bg-primary text-white rounded hover:bg-primary/90"
// //         >
// //           Book Now
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DateSelect;


// // import { useState } from "react";
// // import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// // import BlurCircle from "./BlurCircle";
// // import toast from "react-hot-toast";
// // import { useNavigate } from "react-router-dom";

// // const DateSelect = ({ dateTime = [], id }) => {
// //   const navigate = useNavigate();
// //   const [selected, setSelected] = useState(null);

// //   // ✅ UNIQUE VALID DATES
// //   const dates = [...new Set(
// //     dateTime
// //       .map((s) => s.showDateTime)
// //       .filter(Boolean)
// //       .map((d) => new Date(d).toISOString().split("T")[0])
// //   )];

// //   const onBookHandler = () => {
// //     if (!selected) return toast.error("Please select a date");
// //     navigate(`/movies/${id}/${selected}`);
// //   };

// //   return (
// //     <div id="dateSelect" className="pt-30">
// //       <div className="flex items-center justify-between p-8 bg-primary/10 border border-primary/20 rounded-lg relative">
// //         <BlurCircle top="-100px" left="-100px" />

// //         <div>
// //           <p className="text-lg font-semibold">Choose Date</p>

// //           <div className="flex items-center gap-6 mt-5">
// //             <ChevronLeftIcon />

// //             <div className="flex gap-4">
// //               {dates.length > 0 ? (
// //                 dates.map((date) => {
// //                   const d = new Date(date);
// //                   return (
// //                     <button
// //                       key={date}
// //                       onClick={() => setSelected(date)}
// //                       className={`h-14 w-14 rounded ${
// //                         selected === date
// //                           ? "bg-primary text-white"
// //                           : "border border-primary"
// //                       }`}
// //                     >
// //                       <div>{d.getDate()}</div>
// //                       <div className="text-xs">
// //                         {d.toLocaleString("en-US", { month: "short" })}
// //                       </div>
// //                     </button>
// //                   );
// //                 })
// //               ) : (
// //                 <p className="text-gray-400">No shows available yet</p>
// //               )}
// //             </div>

// //             <ChevronRightIcon />
// //           </div>
// //         </div>

// //         <button
// //           onClick={onBookHandler}
// //           disabled={!dates.length}
// //           className="bg-primary px-8 py-2 rounded text-white"
// //         >
// //           Book Now
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DateSelect;




// import { useState } from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import BlurCircle from "./BlurCircle";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// /**
//  * dateTime format expected:
//  * [
//  *   {
//  *     date: "2025-12-19",
//  *     shows: [
//  *       { time: "06:30 PM", price: 250 }
//  *     ]
//  *   }
//  * ]
//  */

// const DateSelect = ({ dateTime = [], id }) => {
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState(null);

//   // ✅ EXTRACT DATES CORRECTLY
//   const dates = Array.isArray(dateTime)
//     ? dateTime.map((d) => d.date).filter(Boolean)
//     : [];

//   const onBookHandler = () => {
//     if (!selected) return toast.error("Please select a date");
//     navigate(`/movies/${id}/${selected}`);
//   };

//   return (
//     <div id="dateSelect" className="pt-30">
//       <div className="flex items-center justify-between p-8 bg-primary/10 border border-primary/20 rounded-lg relative">
//         <BlurCircle top="-100px" left="-100px" />

//         <div>
//           <p className="text-lg font-semibold">Choose Date</p>

//           <div className="flex items-center gap-6 mt-5">
//             <ChevronLeftIcon />

//             <div className="flex gap-4">
//               {dates.length > 0 ? (
//                 dates.map((date) => {
//                   const d = new Date(date);
//                   return (
//                     <button
//                       key={date}
//                       onClick={() => setSelected(date)}
//                       className={`h-14 w-14 rounded ${
//                         selected === date
//                           ? "bg-primary text-white"
//                           : "border border-primary"
//                       }`}
//                     >
//                       <div>{d.getDate()}</div>
//                       <div className="text-xs">
//                         {d.toLocaleString("en-US", { month: "short" })}
//                       </div>
//                     </button>
//                   );
//                 })
//               ) : (
//                 <p className="text-gray-400">No shows available yet</p>
//               )}
//             </div>

//             <ChevronRightIcon />
//           </div>
//         </div>

//         <button
//           onClick={onBookHandler}
//           disabled={!dates.length}
//           className="bg-primary px-8 py-2 rounded text-white disabled:opacity-50"
//         >
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DateSelect;
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import BlurCircle from "./BlurCircle";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime = [], id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  /* ================= DUMMY DATES ================= */
  const dummyDates = [
    "2025-12-19",
    "2025-12-20",
    "2025-12-21",
    "2025-12-22",
  ];

  // 🔥 USE REAL DATES IF PRESENT, ELSE DUMMY
  const dates =
    Array.isArray(dateTime) && dateTime.length > 0
      ? dateTime.map((d) => d.date)
      : dummyDates;

  const onBookHandler = () => {
    if (!selected) return toast.error("Please select a date");
    navigate(`/movies/${id}/${selected}`);
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex items-center justify-between p-8 bg-primary/10 border border-primary/20 rounded-lg relative">
        <BlurCircle top="-100px" left="-100px" />

        <div>
          <p className="text-lg font-semibold">Choose Date</p>

          <div className="flex items-center gap-6 mt-5">
            <ChevronLeftIcon />

            <div className="flex gap-4">
              {dates.map((date) => {
                const d = new Date(date);
                return (
                  <button
                    key={date}
                    onClick={() => setSelected(date)}
                    className={`h-14 w-14 rounded ${
                      selected === date
                        ? "bg-primary text-white"
                        : "border border-primary"
                    }`}
                  >
                    <div>{d.getDate()}</div>
                    <div className="text-xs">
                      {d.toLocaleString("en-US", { month: "short" })}
                    </div>
                  </button>
                );
              })}
            </div>

            <ChevronRightIcon />
          </div>
        </div>

        <button
          onClick={onBookHandler}
          className="bg-primary px-8 py-2 rounded text-white"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
