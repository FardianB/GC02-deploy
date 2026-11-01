import { Link } from "react-router";

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-neutral text-neutral-content px-8">
        <Link to="/" className="text-xl font-bold uppercase">
          Warung Gadgetin
        </Link>
      </div>
    </>
  );
}