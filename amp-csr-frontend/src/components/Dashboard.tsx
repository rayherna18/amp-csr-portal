import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4 shadow-xl">
        <div className="mb-8 flex justify-center">
          <img src="src/assets/amp-logo.webp" alt="AMP Logo" className="w-56" />
        </div>
        <ul>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <Link to="/" className="block">
              Home
            </Link>
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <Link to="/users" className="block">
              View Users
            </Link>
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <Link to="/subscriptions" className="block">
              View Subscriptions
            </Link>
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <Link to="/technologies" className="block">
              Technologies
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900 p-10 flex items-center justify-center">
        <img
          src="src/assets/bubbles.webp"
          alt="Bubbles Overlay"
          className="absolute left-0 w-full object-cover opacity-5 z-0"
        />
        <div className="z-10 relative">
          {/* The Outlet renders the matching route components */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
