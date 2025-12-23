import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminSidebar from "./components/admin/AdminSidebar";

import Loading from "./components/Loading";

import { useAppContext } from "./context/AppContext";


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
