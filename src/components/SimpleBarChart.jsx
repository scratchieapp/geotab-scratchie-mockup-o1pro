// src/components/SimpleBarChart.jsx
export default function SimpleBarChart({ title, data }) {
    // data is an array of { label: string, value: number }
    return (
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3 style={{ marginBottom: '10px' }}>{title}</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '100px' }}>
          {data.map((item, i) => (
            <div key={i} style={{ textAlign: 'center', flex: '1' }}>
              <div style={{ background: '#0070f3', height: `${item.value}%`, width: '100%', borderRadius: '4px' }}></div>
              <div style={{ marginTop: '5px', fontSize: '0.8rem', color: '#333' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }