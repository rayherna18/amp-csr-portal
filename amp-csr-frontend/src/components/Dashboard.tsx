import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4 shadow-xl">
        <div className="mb-8 flex justify-center">
          <img src="src/assets/amp-logo.webp" alt="AMP Logo" className="w-56" />
        </div>
        <ul>
          {[
            { path: "/", label: "Home" },
            { path: "/users", label: "View Users" },
            { path: "/subscriptions", label: "View Subscriptions" },
            { path: "/technologies", label: "Technologies" },
          ].map(({ path, label }) => (
            <li key={path} className="mb-4">
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
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900">
        {/* The Outlet renders the matching route components */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
