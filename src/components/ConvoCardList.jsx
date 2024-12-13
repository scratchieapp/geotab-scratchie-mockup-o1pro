// src/components/ConvoCardList.jsx
import React from 'react';

export default function ConvoCardList({ convoCards, timeframe, onRewardDriver }) {
  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      {convoCards.length === 0 ? (
        <p style={{ margin: '0', color: '#555' }}>No ConvoCards this {timeframe.toLowerCase()}.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f8f8' }}>
              <th style={{ textAlign: 'left', padding: '10px' }}>Driver</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Cards Created</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {convoCards.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{c.driverName}</td>
                <td style={{ padding: '10px' }}>{c.cardsCreated}</td>
                <td style={{ padding: '10px' }}>
                  <button 
                    onClick={() => onRewardDriver(c.driverName, c.driverId)} 
                    style={{
                      background: '#28a745',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Reward
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}