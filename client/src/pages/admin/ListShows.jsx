import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

const ListShows = () => {
  const { getToken, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/admin/shows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setShows(data.shows);
      } else {
        setShows([]);
      }
    } catch (error) {
      console.error("LIST SHOWS ERROR:", error);
      setShows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAllShows();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <>
      <Title text1="List" text2="Shows" />

      <div className="max-w-5xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-3 font-medium pl-5">Movie Name</th>
              <th className="p-3 font-medium">Show Time</th>
              <th className="p-3 font-medium">Total Bookings</th>
              <th className="p-3 font-medium">Earnings</th>
            </tr>
          </thead>

          <tbody>
            {shows.length === 0 && (
              <tr>
                <td colSpan="4" className="p-5 text-center text-gray-400">
                  No shows found
                </td>
              </tr>
            )}

            {shows.map((show) => {
              const bookedSeats = show.occupiedSeats
                ? Object.keys(show.occupiedSeats).length
                : 0;

              return (
                <tr
                  key={show._id}
                  className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
                >
                  <td className="p-3 pl-5">
                    {show.movie?.title || "N/A"}
                  </td>
                  <td className="p-3">
                    {dateFormat(show.showDateTime)}
                  </td>
                  <td className="p-3">{bookedSeats}</td>
                  <td className="p-3">
                    {currency} {bookedSeats * show.showPrice}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListShows;
