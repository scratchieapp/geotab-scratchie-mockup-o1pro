// src/components/DriverCard.jsx
import React from 'react';

export default function DriverCard({ driver, showIssueScratchie }) {
  // In a real scenario, driver objects might include `photoUrl`.
  const photoUrl = `https://api.example.com/drivers/${driver.id}/photo`; // Mock

  const issueScratchie = () => {
    alert(`Scratchie issued to ${driver.name}!`);
  };

  return (
    <div style={styles.card}>
      <img src={photoUrl} alt={driver.name} style={styles.photo} />
      <h4 style={{ margin: '10px 0 5px 0' }}>{driver.name}</h4>
      <p style={{ margin: '0', fontSize: '0.9rem', color: '#555' }}>Score: {driver.safetyScore}</p>
      <p style={{ margin: '5px 0', fontSize: '0.8rem', color: '#777' }}>Trend: {driver.trend}</p>
      {showIssueScratchie && (
        <button style={styles.button} onClick={issueScratchie}>Issue Scratchie</button>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    width: '200px',
    textAlign: 'center'
  },
  photo: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #0070f3',
    marginBottom: '10px'
  },
  button: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};