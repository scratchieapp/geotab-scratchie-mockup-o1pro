// src/components/DriverDetailsModal.jsx
import { useState } from 'react';

export default function DriverDetailsModal({ driver, onClose, timeframe }) {
  // Mock data
  const { name, photoUrl } = driver;
  
  // Example performance data (in reality, this comes from logic or APIs)
  const shiftData = { carrots: 25, scratchies: 1, safetyScore: 96 };
  const monthData = { carrots: 200, scratchies: 4, safetyScore: 94 };
  const yearData = { carrots: 2200, scratchies: 25, safetyScore: 92 };

  // Placeholder narrative from LLM: In production, you'd fetch or generate this dynamically.
  const narrative = "According to recent analysis, this driver has shown consistent improvement in safety metrics and hazard identification. They have maintained a high safety score and have proactively engaged in ConvoCards. Their month-over-month performance suggests a steady upward trend.";

  // Recommendation: Could be "Hold" or "Reward"
  const recommendation = "Reward";

  const [editableName, setEditableName] = useState(name);
  const [editablePhotoUrl, setEditablePhotoUrl] = useState(photoUrl);

  const handleSave = () => {
    // Implement save logic if needed
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>Driver Details</h3>

        {/* Header Section */}
        <div style={styles.headerSection}>
          <div style={styles.imageContainer}>
            <img src={editablePhotoUrl} alt={editableName} style={styles.photo} />
          </div>
          <div style={{ flex: '1' }}>
            <label style={styles.label}>Name:</label>
            <input 
              type="text" 
              value={editableName} 
              onChange={e => setEditableName(e.target.value)} 
              style={styles.input} 
            />
            <label style={styles.label}>Photo URL:</label>
            <input 
              type="text"
              value={editablePhotoUrl}
              onChange={e => setEditablePhotoUrl(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <hr style={styles.divider} />

        {/* Performance Metrics Section */}
        <h4 style={styles.sectionTitle}>Performance Metrics</h4>
        <div style={styles.metricsGrid}>
          <MetricCard timeframe="Shift" data={shiftData} />
          <MetricCard timeframe="Month" data={monthData} />
          <MetricCard timeframe="Year" data={yearData} />
        </div>

        {/* Narrative Section */}
        <div style={styles.narrativeSection}>
          <h4 style={styles.sectionTitle}>Narrative</h4>
          <p style={styles.narrativeText}>{narrative}</p>
        </div>

        {/* Recommendation Section */}
        <div style={styles.recommendationSection}>
          <h4 style={styles.sectionTitle}>Recommendation</h4>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'10px' }}>
            <span style={{
              padding:'6px 12px',
              borderRadius:'20px',
              background: recommendation === 'Reward' ? '#28a745' : '#ccc',
              color: '#fff',
              fontWeight:'bold',
              fontSize:'0.9rem'
            }}>
              {recommendation}
            </span>
            <span style={{ fontSize:'0.9rem', color:'#555' }}>
              Based on current performance metrics, this driver is recommended for {recommendation === 'Reward' ? 'a reward' : 'no action'}.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonRow}>
          <button style={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button style={styles.saveButton} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ timeframe, data }) {
  return (
    <div style={styles.metricCard}>
      <h5 style={styles.metricTimeframe}>{timeframe}</h5>
      <p style={styles.metricText}><strong>Carrots:</strong> {data.carrots}</p>
      <p style={styles.metricText}><strong>Scratchies:</strong> {data.scratchies}</p>
      <p style={styles.metricText}><strong>Safety Score:</strong> {data.safetyScore}</p>
    </div>
  );
}

const styles = {
  overlay: {
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    background:'rgba(0,0,0,0.5)',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:999,
    fontFamily:'sans-serif'
  },
  modal: {
    background:'#fff',
    padding:'20px',
    borderRadius:'8px',
    maxWidth:'500px',
    width:'100%',
    boxSizing:'border-box'
  },
  title: {
    margin:'0 0 15px 0',
    fontSize:'1.4rem',
    fontWeight:'bold',
    color:'#333'
  },
  headerSection: {
    display:'flex',
    gap:'20px',
    marginBottom:'15px'
  },
  imageContainer: {
    flex:'0 0 auto'
  },
  photo: {
    width:'80px',
    height:'80px',
    borderRadius:'50%',
    objectFit:'cover',
    border:'2px solid #0070f3'
  },
  label: {
    display:'block',
    fontSize:'0.85rem',
    fontWeight:'bold',
    margin:'10px 0 5px 0',
    color:'#333'
  },
  input: {
    width:'100%',
    padding:'8px',
    fontSize:'0.9rem',
    borderRadius:'4px',
    border:'1px solid #ccc',
    marginBottom:'5px'
  },
  divider: {
    border:'none',
    borderTop:'1px solid #ddd',
    margin:'15px 0'
  },
  sectionTitle: {
    fontSize:'1rem',
    fontWeight:'bold',
    color:'#333',
    margin:'0 0 10px 0'
  },
  metricsGrid: {
    display:'flex',
    gap:'10px',
    marginBottom:'20px'
  },
  metricCard: {
    background:'#f9f9f9',
    borderRadius:'8px',
    padding:'10px',
    flex:'1',
    border:'1px solid #ddd',
    textAlign:'center'
  },
  metricTimeframe: {
    margin:'0 0 10px 0',
    fontSize:'0.95rem',
    fontWeight:'bold',
    color:'#0070f3'
  },
  metricText: {
    margin:'5px 0',
    fontSize:'0.9rem',
    color:'#333'
  },
  narrativeSection: {
    marginBottom:'20px'
  },
  narrativeText: {
    fontSize:'0.9rem',
    color:'#555',
    lineHeight:'1.4',
    margin:'0'
  },
  recommendationSection: {
    marginBottom:'20px'
  },
  buttonRow: {
    display:'flex',
    justifyContent:'flex-end',
    gap:'10px'
  },
  cancelButton: {
    background:'#999',
    color:'#fff',
    border:'none',
    borderRadius:'4px',
    padding:'8px 12px',
    cursor:'pointer',
    fontSize:'0.9rem'
  },
  saveButton: {
    background:'#0070f3',
    color:'#fff',
    border:'none',
    borderRadius:'4px',
    padding:'8px 12px',
    cursor:'pointer',
    fontSize:'0.9rem'
  }
};