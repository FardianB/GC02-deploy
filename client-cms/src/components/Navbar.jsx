import { Link, NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content px-5">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold uppercase">
            Warung Gadgetin
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-user"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                Add User
              </NavLink>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
