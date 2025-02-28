const Home = () => {
    return (
        <div className="relative p-10 h-screen overflow-y-auto flex flex-col">
          <img
          src="src/assets/bubbles.webp"
          alt="Bubbles Overlay"
          className=" z-0 absolute left-0 w-full h-full md:h-auto object-cover opacity-5 pointer-events-none select-none"
        />
        <div className="z-10 flex flex-col h-full justify-center mx-auto">
            <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl xl:text-8xl text-white">
            The Ultimate Portal For
          </h1>
          <h2 className="font-bold text-3xl md:text-5xl lg:text-7xl xl:text-8xl text-blue-200">
            Customer Service Representatives
          </h2>
          <h4 className="text-white text-sm md:text-base lg:text-lg xl:text-xl my-6 max-w-2xl">
            Elevate customer experience now with this easy to navigate
            dashboard! View all users, find specific users in a flash, edit
            account information and update vehicle subscriptions. A one-stop-shop for all your customer service needs.
          </h4>

          <div className="space-y-4 md:space-y-0 space-x-4">
            <button className="bg-blue-800 text-white py-4 px-6 rounded hover:bg-blue-900 cursor-pointer">
              <a href="https://ampmemberships.com/">Visit AMP</a>
            </button>
            <button className="bg-green-600 text-white py-4 px-6 rounded hover:bg-green-700 cursor-pointer">
              <a href="https://insiten.com/">Visit Insiten</a>
            </button>
          </div>
          </div>
        </div>
    )
}

export default Home;