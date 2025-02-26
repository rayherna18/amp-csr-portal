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
            <a href="#" className="block">
              Home
            </a>
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <a href="#" className="block">
              View Users
            </a>
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <a href="#" className="block">
              View Subscriptions
            </a>
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded">
            <a href="#" className="block">
              Technologies
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="relative flex-1  bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900 p-10 flex items-center justify-center">
        <img
          src="src/assets/bubbles.webp"
          alt="Bubbles Overlay"
          className="absolute left-0 w-full object-cover opacity-5 z-0"
        />
        <div className="z-10 relative">
          <h1 className="font-bold text-8xl text-white">
            The Ultimate Portal For
          </h1>
          <h2 className="font-bold text-8xl text-blue-200">
            Customer Service Representatives
          </h2>
          <h4 className="text-white text-xl my-6 max-w-2xl">
            Elevate customer experience now with this easy to navigate
            dashboard! View all users, find specific users in a flash, edit
            account information and update vehicle subscriptions. A one stop
            shop for AMP CSRs.
          </h4>

          <div className="space-x-4">
            <button className="bg-blue-600 text-white py-4 px-6 rounded hover:bg-blue-700">
              <a href="https://ampmemberships.com/">Visit AMP</a>
            </button>
            <button className="bg-green-600 text-white py-4 px-6 rounded hover:bg-green-700">
              <a href="https://insiten.com/">Visit Insiten</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
