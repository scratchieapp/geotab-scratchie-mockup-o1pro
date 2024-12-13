import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Supervisor Dashboard</Link>
      <Link to="/leaderboard" style={{ marginRight: '15px' }}>Driver Leaderboard</Link>
      <Link to="/driver-profile/1">Example Driver Profile</Link>
    </nav>
  );
}