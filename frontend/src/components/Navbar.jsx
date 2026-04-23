import { NavLink } from "react-router-dom";

const navLink = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium ${
    isActive ? "bg-turf-300 text-turf-900 shadow-soft" : "text-turf-100 hover:bg-white/10"
  }`;

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-turf-900/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <p className="text-lg font-bold text-turf-100">TurfCricket</p>
        <div className="flex gap-2">
          <NavLink to="/" className={navLink}>
            Home
          </NavLink>
          <NavLink to="/book" className={navLink}>
            Book
          </NavLink>
          <NavLink to="/admin" className={navLink}>
            Admin
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
