// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SupervisorDashboard from './pages/SupervisorDashboard';
import SupervisorLeaderboard from './pages/SupervisorLeaderboard';
import RulesPage from './pages/RulesPage';
import DriverLeaderboard from './pages/DriverLeaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SupervisorDashboard />} />
        <Route path="/leaderboard" element={<SupervisorLeaderboard />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/driver-leaderboard" element={<DriverLeaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;