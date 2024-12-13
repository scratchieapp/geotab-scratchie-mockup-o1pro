// src/pages/Dashboard.jsx
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { dashboardMetrics, scratchieBudget } from '../data/fakeData';
import { Link } from 'react-router-dom';
import LineChartComponent from '../components/LineChartComponent';
import ConvoCardList from '../components/ConvoCardList';
import IssueRewardModal from '../components/IssueRewardModal';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('Week');
  const [modalData, setModalData] = useState(null); // {driver, type: 'scratchie'|'carrots'}

  const {
    topDriversShift,
    topDriversDay,
    topDriversWeek,
    topDriversMonth,
    topDriversYear,
    mostImproved,
    bottomDriver,
    totalCarrotsWeek,
    totalCarrotsMonth
  } = dashboardMetrics;

  const topDrivers = {
    Shift: topDriversShift,
    Day: topDriversDay,
    Week: topDriversWeek,
    Month: topDriversMonth,
    Year: topDriversYear
  }[timeframe];

  const totalCarrotsPeriod = timeframe === 'Week' ? totalCarrotsWeek : totalCarrotsMonth;

  // Mock chart data
  const top5 = getTop5Drivers(dashboardMetrics.topDriversWeek);
  const lineChartData = getLineChartDataForTopDrivers(top5, timeframe);

  // Mock ConvoCard data
  const convoCardsThisPeriod = [
    { id: 1, driverName: "Sarah Johnson", driverId: 2, cardsCreated: 3 },
    { id: 2, driverName: "Mike Williams", driverId: 3, cardsCreated: 4 }
  ];

  const issueReward = (driver) => {
    // Open modal
    setModalData({ driver });
  };

  // Add this before rendering ConvoCardList
  const sortedByConvo = [...convoCardsThisPeriod].sort((a, b) => b.cardsCreated - a.cardsCreated);
  const top3Convo = sortedByConvo.slice(0, 3);

  return (
    <DashboardLayout>
      <div style={styles.headerRow}>
        <h2 style={{ marginBottom: '0' }}>Dashboard</h2>
        <div style={styles.timeframeSelect}>
          <label style={{ marginRight: '10px' }}>Timeframe:</label>
          <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            <option>Shift</option>
            <option>Day</option>
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
        </div>
      </div>
      <p style={{ marginTop: '5px', color: '#555' }}>
        Instantly recognize top performance and encourage safe behavior.  
        Need more detail? Check the <Link to="/leaderboard">Supervisor Leaderboard</Link> or adjust <Link to="/rules">Rules</Link>.
      </p>

      {/* Key Stats Row */}
      <div style={styles.statsRow}>
        <StatCard label="Total Carrots" value={totalCarrotsPeriod} description={`Awarded this ${timeframe.toLowerCase()}`} />
        <StatCard label="Overall Safety" value="+2%" description={`Compared to last ${timeframe.toLowerCase()}`} highlightColor="#28a745" />
        <StatCard label="ConvoCards" value={convoCardsThisPeriod.reduce((sum, c) => sum + c.cardsCreated, 0)} description="Identified Hazards" />
        <StatCard label="Scratchies Left" value={scratchieBudget.monthlyScratchiesLeft} description="This Month" highlightColor="#0070f3" />
      </div>

      {/* Performance Over Time (Line Chart) */}
      <div style={styles.chartContainer}>
        <h3 style={{ marginBottom: '10px' }}>Top Driver Performance Over Time</h3>
        <LineChartComponent data={lineChartData} />
      </div>

      {/* Top 3 Performers */}
      <div style={styles.sectionHeader}>
        <h3 style={{ margin: '0' }}>Top 3 Performers this {timeframe}</h3>
      </div>
      <div style={styles.top3Row}>
        {topDrivers.map((driver, index) => (
          <div key={driver.id} style={styles.topDriverCard}>
            <div style={styles.rankBadge}>{index+1}</div>
            <img src={driver.photoUrl} alt={driver.name} style={styles.driverPhoto} />
            <h4 style={{ margin: '10px 0 5px 0' }}>{driver.name}</h4>
            <p style={{ margin: '0', fontSize: '0.9rem', color: '#555' }}>Score: {driver.safetyScore}</p>
            <p style={{ margin: '5px 0', fontSize: '0.8rem', color: '#777' }}>Trend: {driver.trend}</p>
            <button style={styles.issueButton} onClick={() => issueReward(driver)}>Issue Scratchie</button>
          </div>
        ))}
      </div>

      {/* Notable Drivers */}
      <div style={styles.sectionHeader}>
        <h3 style={{ margin: '30px 0 10px 0' }}>Notable Drivers</h3>
      </div>
      <div style={styles.highlightRow}>
        <div style={styles.highlightCard}>
          <h4 style={{ margin: '0 0 10px 0' }}>Most Improved</h4>
          {mostImproved ? (
            <>
              <p style={{ margin: '0', fontSize: '0.9rem' }}>
                {mostImproved.name}, Score: {mostImproved.safetyScore}, Trend: {mostImproved.trend}
              </p>
              <button style={{ ...styles.issueButton, marginTop: '10px' }} onClick={() => issueReward(mostImproved)}>Reward</button>
            </>
          ) : (
            <p style={{ margin: '0', fontSize: '0.9rem' }}>No data</p>
          )}
        </div>
        <div style={styles.highlightCard}>
          <h4 style={{ margin: '0 0 10px 0' }}>Needs Attention</h4>
          {bottomDriver ? (
            <p style={{ margin: '0', fontSize: '0.9rem' }}>
              {bottomDriver.name}, Score: {bottomDriver.safetyScore}, Trend: {bottomDriver.trend}
            </p>
          ) : (
            <p style={{ margin: '0', fontSize: '0.9rem' }}>No data</p>
          )}
        </div>
      </div>

      {/* ConvoCards Section */}
      <div style={styles.sectionHeader}>
        <h3 style={{ margin: '30px 0 10px 0' }}>ConvoCards (Hazard Identifications)</h3>
        <p style={{ margin: '0', color: '#555', fontSize: '0.9rem' }}>
          Drivers taking initiative this {timeframe.toLowerCase()}
        </p>
      </div>

      {/* Add the new mini leaderboard here */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: '10px 0' }}>Top ConvoCard Creators this {timeframe}</h4>
        <div style={{ display: 'flex', gap: '20px' }}>
          {top3Convo.map((c, i) => {
            const d = findDriverById(c.driverId, dashboardMetrics.topDriversWeek);
            const photo = d ? d.photoUrl : 'https://i.pravatar.cc/150';
            return (
              <div key={c.driverId} style={{ textAlign: 'center', background: '#fff', padding: '10px', borderRadius:'8px', border:'1px solid #ddd', flex:'1' }}>
                <div style={{ fontSize:'1.2rem', fontWeight:'bold', color:'#0070f3' }}>{i+1}</div>
                <img src={photo} alt={c.driverName} style={{ width:'50px', height:'50px', borderRadius:'50%', objectFit:'cover', marginBottom:'5px' }} />
                <div style={{ fontSize:'0.9rem', fontWeight:'bold' }}>{c.driverName}</div>
                <div style={{ fontSize:'0.8rem', color:'#555' }}>{c.cardsCreated} ConvoCards</div>
              </div>
            );
          })}
        </div>
      </div>

      <ConvoCardList 
        convoCards={convoCardsThisPeriod} 
        timeframe={timeframe} 
        onRewardDriver={(driverName, driverId) => setModalData({ driver: {name: driverName, id: driverId} })}
      />

      {modalData && (
        <IssueRewardModal 
          driver={modalData.driver}
          onClose={() => setModalData(null)} 
          scratchieBudget={scratchieBudget}
          timeframe={timeframe}
        />
      )}
    </DashboardLayout>
  );
}

function StatCard({ label, value, description, highlightColor }) {
  return (
    <div style={{ ...styles.statCard, borderLeft: highlightColor ? `5px solid ${highlightColor}` : '5px solid #ddd' }}>
      <h4 style={{ margin: '0', fontSize: '1.2rem' }}>{value}</h4>
      <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#555' }}>{label}</p>
      <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#777' }}>{description}</p>
    </div>
  );
}

function getLineChartDataForTopDrivers(top5, timeframe) {
  const dates = ['2024-12-01', '2024-12-02', '2024-12-03', '2024-12-04', '2024-12-05'];
  return dates.map(date => {
    const entry = { date };
    top5.forEach(d => { entry[d.name] = d.safetyScore + Math.floor(Math.random()*3)-1; });
    return entry;
  });
}

function getTop5Drivers(drivers) {
  return [...drivers]
    .sort((a, b) => b.safetyScore - a.safetyScore)
    .slice(0, 5);
}

function findDriverById(driverId, drivers) {
  return drivers.find(d => d.id === driverId);
}

const styles = {
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  timeframeSelect: {
    display: 'flex',
    alignItems: 'center'
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    margin: '20px 0'
  },
  statCard: {
    background: '#fff',
    flex: '1',
    minWidth: '150px',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd'
  },
  chartContainer: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '30px'
  },
  sectionHeader: {
    marginBottom: '10px'
  },
  top3Row: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    width: '100%'
  },
  topDriverCard: {
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    flex: '1',
    position: 'relative',
    textAlign: 'center'
  },
  rankBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#0070f3',
    color: '#fff',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  },
  driverPhoto: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #0070f3',
    marginBottom: '10px'
  },
  issueButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  highlightRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '30px'
  },
  highlightCard: {
    flex: '1',
    minWidth: '250px',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd'
  }
};