const Home = () => {
    return (
        <div className="relative p-10 h-screen flex flex-col">
          <img
          src="src/assets/bubbles.webp"
          alt="Bubbles Overlay"
          className=" z-0 absolute left-0 w-full object-cover opacity-5 pointer-events-none select-none"
        />
        <div className="z-10 flex flex-col h-full justify-center mx-auto">
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
    )
}

export default Home;