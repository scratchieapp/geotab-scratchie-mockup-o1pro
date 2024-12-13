import { useParams } from 'react-router-dom';
import { drivers } from '../data/fakeData';

export default function DriverProfile() {
  const { id } = useParams();
  const driver = drivers.find(d => d.id === Number(id));

  if (!driver) return <div style={{ padding: '20px' }}>Driver not found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{driver.name}’s Profile</h1>
      <p>Safety Score: {driver.safetyScore}</p>
      <p>Perfect Streak: {driver.perfectStreak} days</p>
      <p>Fuel Efficiency: {driver.fuelEfficiency}</p>
      <p>Last Scratchie Awarded: {driver.lastScratchie}</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Badges & Achievements</h2>
        <p>Coming soon: Highlight badges earned for safe driving, consistent improvement, and meeting milestones.</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Motivational Prompts</h2>
        <p>Great job this week! You’re on track for a reward if you maintain this streak for 3 more days.</p>
      </div>
    </div>
  );
}