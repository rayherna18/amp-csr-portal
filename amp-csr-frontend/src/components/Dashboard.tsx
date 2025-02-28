import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
const Dashboard = () => {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);


  // Resets isNavOpen when the location changes
  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);


  return (
    <div className="flex h-screen">

      {/* Mobile Nav Button */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="fixed top-4 left-2 z-50 text-gray-800 bg-white p-2 rounded-lg md:hidden"
      >
        {isNavOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white shadow-xl transform ${
          isNavOpen ? "translate-x-0 z-40" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:w-64`}
      >
      <div className="p-4">
        <div className="mb-8 flex justify-center">
          <img src="../assets/amp-logo.webp" alt="AMP Logo" className="w-56" />
        </div>

        <ul>
          {[
            { path: "/", label: "Home", disabled: false },
            { path: "/all-users", label: "View Users", disabled: false },
            { path: "/subscriptions", label: "Subscription Tiers", disabled: true },
            { path: "/technologies", label: "Technologies", disabled: true },
          ].map(({ path, label, disabled }) => (
            <li key={path} className="mb-4">
              {disabled ? (
                <span className="block p-2 rounded text-gray-500 cursor-not-allowed">{label}</span>)
                : (
              <Link
                to={path}
                className={`block p-2 rounded ${
                  location.pathname === path
                    ? "bg-gray-700 font-bold"
                    : "hover:bg-gray-700"
                }`}
              >
                {label}
              </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900 p-2 md:p-0">
        {/* The Outlet renders the matching route components */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
