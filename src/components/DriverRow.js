export default function DriverRow({ driver, onIssueScratchie }) {
  const tdStyle = { padding: '10px', fontSize: '0.9rem', verticalAlign: 'middle' };
  const nameColStyle = { 
    ...tdStyle, 
    width: '200px',
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px'
  };

  return (
    <tr style={{ borderBottom: '1px solid #ccc' }}>
      <td style={nameColStyle}>
        <img 
          src={driver.photoUrl} 
          alt={driver.name} 
          style={{ width:'30px', height:'30px', borderRadius:'50%', objectFit:'cover' }} 
        />
        {driver.name}
      </td>
      <td style={tdStyle}>{driver.safetyScore}</td>
      <td style={tdStyle}>{driver.trend}</td>
      <td style={tdStyle}>{driver.perfectStreak} days</td>
      <td style={tdStyle}>{driver.fuelEfficiency}</td>
      <td style={tdStyle}>{driver.onTime}</td>
      <td style={tdStyle}>{driver.lastScratchie}</td>
      <td style={tdStyle}>{driver.incidents === 0 ? "No incidents" : `${driver.incidents} incident(s)`}</td>
      <td style={tdStyle}>
        <button style={{ padding: '5px 10px', background: '#28a745', color: '#fff', border: 'none' }}
          onClick={() => onIssueScratchie(driver.id)}
        >
          Issue Scratchie
        </button>
      </td>
    </tr>
  );
}