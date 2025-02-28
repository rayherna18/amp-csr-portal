import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Import Dashboard as the layout
import Home from './components/Home';
import ViewUsers from './components/ViewUsers';
import ViewSubscriptions from './components/ViewSubscriptions';
import Technologies from './components/Technologies';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main route that renders the Dashboard layout */}
        <Route path="/" element={<Dashboard />}>
          {/* Nested routes for Dashboard */}
          <Route path="/" element={<Home />} />
          <Route path="all-users" element={<ViewUsers />} />
          <Route path="subscriptions" element={<ViewSubscriptions />} />
          <Route path="technologies" element={<Technologies />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
