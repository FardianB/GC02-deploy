import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function BaseLayout() {
  // kalau belum login, lempar ke halaman login
  if (!localStorage.access_token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
