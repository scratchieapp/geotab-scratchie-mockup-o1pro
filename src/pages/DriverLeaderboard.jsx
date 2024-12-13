// src/pages/DriverLeaderboard.jsx

import DashboardLayout from '../components/DashboardLayout'; // or a simpler layout since this might not need the supervisor nav
import { drivers } from '../data/fakeData';

export default function DriverLeaderboard() {
  // Assume we have functions to get top performers by different metrics.
  const topOverall = getTopOverall(drivers); // top 3 by safety score or combined metrics
  const mostImproved = getMostImproved(drivers); 
  const topConvoCards = getTopConvoCards(drivers);

  return (
    <DashboardLayout>
      <h2 style={{ textAlign:'center', marginBottom:'30px', fontSize:'2rem' }}>Driver Hall of Fame</h2>

      <section style={{ marginBottom:'40px' }}>
        <h3 style={sectionTitleStyle}>Top 3 Overall</h3>
        <div style={{ display:'flex', gap:'20px', justifyContent:'center', marginTop:'20px' }}>
          {topOverall.slice(0,3).map((d, i) => (
            <div key={d.id} style={champCardStyle}>
              <div style={medalBadgeStyle(i)}>{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
              <img src={d.photoUrl} alt={d.name} style={champImageStyle} />
              <h4 style={champNameStyle}>{d.name}</h4>
              <p style={champScoreStyle}>Score: {d.safetyScore}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom:'40px' }}>
        <h3 style={sectionTitleStyle}>Most Improved</h3>
        <div style={{ display:'flex', justifyContent:'center', marginTop:'20px' }}>
          <div style={champCardStyle}>
            <div style={{ fontSize:'2rem' }}>🔼</div>
            <img src={mostImproved.photoUrl} alt={mostImproved.name} style={champImageStyle} />
            <h4 style={champNameStyle}>{mostImproved.name}</h4>
            <p style={champScoreStyle}>Trend: {mostImproved.trend}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 style={sectionTitleStyle}>ConvoCard Heroes</h3>
        <div style={{ display:'flex', gap:'20px', justifyContent:'center', marginTop:'20px' }}>
          {topConvoCards.slice(0,3).map((d,i) => (
            <div key={d.id} style={champCardStyle}>
              <div style={{ fontSize:'2rem' }}>⚠️</div>
              <img src={d.photoUrl} alt={d.name} style={champImageStyle} />
              <h4 style={champNameStyle}>{d.name}</h4>
              <p style={champScoreStyle}>ConvoCards: {d.convoCards}</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

function getTopOverall(drivers) {
  return [...drivers].sort((a,b) => b.safetyScore - a.safetyScore);
}
function getMostImproved(drivers) {
  return drivers.reduce((best,d) => parseTrend(d.trend) > parseTrend(best.trend) ? d : best, drivers[0]);
}
function getTopConvoCards(drivers) {
  return [...drivers].sort((a,b) => b.convoCards - a.convoCards);
}
function parseTrend(trend) {
  return parseFloat(trend.replace('%',''));
}

const sectionTitleStyle = { textAlign:'center', fontSize:'1.5rem', color:'#333' };
const champCardStyle = {
  background:'#fff',
  border:'1px solid #ddd',
  borderRadius:'8px',
  padding:'20px',
  textAlign:'center',
  width:'180px'
};
const medalBadgeStyle = (i) => ({
  fontSize:'2rem',
  marginBottom:'10px'
});
const champImageStyle = {
  width:'80px',
  height:'80px',
  borderRadius:'50%',
  objectFit:'cover',
  margin:'0 auto 10px auto',
  border:'2px solid #0070f3'
};
const champNameStyle = {
  margin:'0 0 5px 0',
  fontSize:'1rem',
  fontWeight:'bold'
};
const champScoreStyle = {
  margin:'0',
  fontSize:'0.9rem',
  color:'#555'
};