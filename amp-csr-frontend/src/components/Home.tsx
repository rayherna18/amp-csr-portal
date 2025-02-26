const Home = () => {
    return (
        <div>
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
    )
}

export default Home;