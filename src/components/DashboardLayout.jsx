// src/components/DashboardLayout.jsx
import { Link, useLocation } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Rules', path: '/rules' }
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.branding}>
          <h1 style={{ margin: '0', fontSize: '1.8rem', fontWeight: '600' }}>Toll Global</h1>
          <p style={{ margin: '0', fontSize: '1rem', color: '#555' }}>BOC Gases Division</p>
        </div>
        <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
          Driver Performance & Safety Dashboard
        </div>
      </header>
      <nav style={styles.nav}>
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <Link
              key={tab.name}
              to={tab.path}
              style={{
                ...styles.tabLink,
                borderBottom: active ? '3px solid #0070f3' : '3px solid transparent',
                fontWeight: active ? 'bold' : 'normal'
              }}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
      <main style={styles.content}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'sans-serif',
    background: '#fafafa',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: '#fff',
    padding: '20px',
    borderBottom: '1px solid #ddd'
  },
  branding: {
    marginBottom: '5px'
  },
  nav: {
    background: '#fff',
    display: 'flex',
    borderBottom: '1px solid #ddd'
  },
  tabLink: {
    textDecoration: 'none',
    padding: '10px 20px',
    color: '#333',
    transition: 'color 0.2s',
    marginRight: '10px'
  },
  content: {
    padding: '20px',
    flex: '1'
  }
};