// src/components/IssueRewardModal.jsx
import { useState } from 'react';

export default function IssueRewardModal({ driver, onClose, scratchieBudget, timeframe }) {
  const [addScratchie, setAddScratchie] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [sent, setSent] = useState(false);
  const prewrittenMessages = [
    "Great job on your safety checks! Keep it up.",
    "Excellent hazard identification this shift. Thanks for keeping us safe!",
    "Your performance this week has been outstanding!"
  ];
  const [selectedPrewritten, setSelectedPrewritten] = useState('');

  // Mock data for this timeframe
  const scratchiesThisTimeframe = 2; 
  const carrotsThisTimeframe = 100;

  const handleSend = () => {
    // In real code, send via API
    setSent(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {!sent ? (
          <>
            <h3 style={styles.modalTitle}>Reward {driver.name}</h3>
            <p style={styles.infoText}>
              {driver.name} has received <strong>{scratchiesThisTimeframe} Scratchies</strong> and <strong>{carrotsThisTimeframe} Carrots</strong> this {timeframe.toLowerCase()}.
            </p>

            <hr style={styles.divider} />

            <p style={styles.sectionText}>
              You’re about to issue Carrots. Give it a boost by adding a Surprise Scratchie (a random $10, $20, or $50 reward)?
            </p>
            <div style={styles.toggleContainer}>
              <button 
                onClick={() => setAddScratchie(false)} 
                style={addScratchie ? styles.toggleOffButton : styles.toggleOnButton}
              >
                Just Carrots
              </button>
              <button 
                onClick={() => setAddScratchie(true)} 
                style={addScratchie ? styles.toggleOnButton : styles.toggleOffButton}
              >
                Carrots + Scratchie
              </button>
            </div>
            {addScratchie && (
              <p style={styles.scratchieInfo}>
                {scratchieBudget.monthlyScratchiesLeft} Scratchies left this month.
              </p>
            )}

            <hr style={styles.divider} />

            <p style={styles.sectionLabel}>Add a personal touch:</p>
            <div style={styles.messageChips}>
              {prewrittenMessages.map(msg => (
                <button
                  key={msg}
                  onClick={() => setSelectedPrewritten(msg)}
                  style={{
                    ...styles.messageChip,
                    background: selectedPrewritten === msg ? '#0070f3' : '#f5f5f5',
                    color: selectedPrewritten === msg ? '#fff' : '#333'
                  }}
                >
                  {msg}
                </button>
              ))}
            </div>
            <textarea
              style={styles.textarea}
              value={customMessage}
              onChange={e => setCustomMessage(e.target.value)}
              placeholder="Write your own note..."
            />

            <div style={styles.buttonRow}>
              <button style={styles.cancelButton} onClick={onClose}>Cancel</button>
              <button style={styles.sendButton} onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h3 style={styles.modalTitle}>Reward sent!</h3>
            <p style={styles.infoText}>Your recognition has been issued successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top:0, left:0, right:0, bottom:0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 999,
    fontFamily: 'sans-serif'
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif'
  },
  modalTitle: {
    marginTop: '0',
    marginBottom: '10px',
    fontSize: '1.3rem',
    fontWeight: 'bold'
  },
  infoText: {
    fontSize: '0.95rem',
    color: '#333',
    lineHeight: '1.4',
    margin: '0 0 10px 0'
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #ddd',
    margin: '15px 0'
  },
  sectionText: {
    fontSize: '0.9rem',
    color: '#333',
    margin: '0 0 10px 0',
    lineHeight: '1.4'
  },
  toggleContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px'
  },
  toggleOnButton: {
    background: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  toggleOffButton: {
    background: '#f0f0f0',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  scratchieInfo: {
    fontSize: '0.8rem',
    color: '#555',
    margin: '0 0 5px 0'
  },
  sectionLabel: {
    margin: '0 0 8px 0',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#333'
  },
  messageChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '10px'
  },
  messageChip: {
    border: 'none',
    borderRadius: '20px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.8rem'
  },
  textarea: {
    width: '100%',
    height: '60px',
    fontSize: '0.9rem',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
    marginBottom: '15px'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  cancelButton: {
    background: '#999',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  sendButton: {
    background: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
};