// src/pages/Leaderboard.jsx
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { drivers, scratchieBudget } from '../data/fakeData';
import IssueRewardModal from '../components/IssueRewardModal';
import DriverDetailsModal from '../components/DriverDetailsModal';
import { Link } from 'react-router-dom';

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState('Week');
  const [rewardModalData, setRewardModalData] = useState(null);
  const [driverModalData, setDriverModalData] = useState(null);

  const filteredDrivers = getDriversDataForTimeframe(drivers, timeframe); 
  // This function would compute the values for Carrots, ConvoCards, etc. for the chosen timeframe.

  const openRewardModal = (driver) => setRewardModalData(driver);
  const closeRewardModal = () => setRewardModalData(null);

  const openDriverModal = (driver) => setDriverModalData(driver);
  const closeDriverModal = () => setDriverModalData(null);

  return (
    <DashboardLayout>
      <h2>Leaderboard</h2>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <label style={{ marginRight: '10px' }}>Timeframe:</label>
          <select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
            <option>Shift</option>
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
        </div>
        <Link 
          to="/driver-leaderboard" 
          style={{
            background: '#0070f3',
            color: '#fff',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}
        >
          View Driver Hall of Fame
        </Link>
      </div>

      <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff', borderRadius:'8px' }}>
        <thead>
          <tr style={{ backgroundColor:'#f8f8f8' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Safety Score</th>
            <th style={thStyle}>Trend</th>
            <th style={thStyle}>Perfect Streak</th>
            <th style={thStyle}>On-Time</th>
            <th style={thStyle}>Fuel Efficiency</th>
            <th style={thStyle}>ConvoCards</th>
            <th style={thStyle}>Carrots</th>
            <th style={thStyle}>Scratchies</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map(driver => (
            <tr key={driver.id} style={{ borderBottom:'1px solid #ddd' }}>
              <td style={tdStyle} onClick={() => openDriverModal(driver)}>
                <img src={driver.photoUrl} alt={driver.name} style={{ width:'30px', height:'30px', borderRadius:'50%', objectFit:'cover', marginRight:'10px', verticalAlign:'middle' }} />
                <span style={{ cursor:'pointer', textDecoration:'underline' }}>{driver.name}</span>
              </td>
              <td style={tdStyle}>{driver.safetyScore}</td>
              <td style={tdStyle}>{driver.trend}</td>
              <td style={tdStyle}>{driver.perfectStreak} days</td>
              <td style={tdStyle}>{driver.onTime}</td>
              <td style={tdStyle}>{driver.fuelEfficiency}</td>
              <td style={tdStyle}>{driver.convoCards}</td>
              <td style={tdStyle}>{driver.carrots}</td>
              <td style={tdStyle}>{driver.scratchies}</td>
              <td style={tdStyle}>
                <button 
                  style={rewardButtonStyle}
                  onClick={() => openRewardModal(driver)}
                >
                  Reward
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {rewardModalData && (
        <IssueRewardModal
          driver={rewardModalData}
          onClose={closeRewardModal}
          scratchieBudget={scratchieBudget}
          timeframe={timeframe}
        />
      )}

      {driverModalData && (
        <DriverDetailsModal
          driver={driverModalData}
          onClose={closeDriverModal}
          timeframe={timeframe}
        />
      )}
    </DashboardLayout>
  );
}

const thStyle = { padding:'10px', textAlign:'left', fontWeight:'bold' };
const tdStyle = { padding:'10px', fontSize:'0.9rem', verticalAlign:'middle' };
const rewardButtonStyle = {
  background: '#0070f3',
  color:'#fff',
  border:'none',
  borderRadius:'4px',
  padding:'5px 10px',
  cursor:'pointer',
  fontSize:'0.9rem'
};

// Mock function
function getDriversDataForTimeframe(drivers, timeframe) {
  // Here you’d compute carrots, scratchies, convoCards, etc. based on timeframe.
  // Returning drivers as is for demonstration.
  return drivers.map(d => ({
    ...d,
    trend: '+2%', // mock
    perfectStreak: 14,
    onTime: '98%',
    fuelEfficiency: '93%',
    convoCards: 3,
    carrots: 120,
    scratchies: 2
  }));
}