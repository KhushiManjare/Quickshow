import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";

import { useAppContext } from "./context/AppContext";
import { SignIn } from "@clerk/clerk-react";
import Loading from "./components/Loading";

const Layout = () => {
  const { isAdmin, fetchIsAdmin } = useAppContext();

  // 🔥 IMPORTANT: always verify admin on layout mount
  useEffect(() => {
    fetchIsAdmin();
  }, []);

  // ⏳ While admin status is being checked
  if (isAdmin === undefined) {
    return <Loading />;
  }

  // 🚫 Not an admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-medium">
          You are not authorized to access admin panel
        </p>
      </div>
    );
  }

  // ✅ Authorized admin
  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
