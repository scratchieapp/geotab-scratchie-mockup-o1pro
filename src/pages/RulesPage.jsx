// src/pages/RulesPage.jsx
import { useState } from 'react';
import { initialAutoAwardRules } from '../data/fakeData';
import DashboardLayout from '../components/DashboardLayout';

export default function RulesPage() {
  const [autoAwardRules, setAutoAwardRules] = useState(initialAutoAwardRules);

  const updateAutoAwardRules = (event) => {
    const { name, type, value, checked } = event.target;
    setAutoAwardRules(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <DashboardLayout>
      <h2 style={{ marginBottom: '20px' }}>Rules & Auto-Awards</h2>
      <p style={{ marginBottom: '30px', color: '#555' }}>
        Configure how Scratchies are automatically awarded to encourage safe driving and hazard identification.
      </p>

      <form style={{ maxWidth: '400px', marginBottom: '40px' }}>
        <label style={{ display: 'block', marginBottom: '15px' }}>
          <input
            type="checkbox"
            name="weeklyTopDriver"
            checked={autoAwardRules.weeklyTopDriver}
            onChange={updateAutoAwardRules}
          />
          Automatically award top driver each week
        </label>

        <label style={{ display: 'block', marginBottom: '15px' }}>
          Max auto-awards per week:
          <input
            type="number"
            name="maxAutoAwardsPerWeek"
            min="0"
            value={autoAwardRules.maxAutoAwardsPerWeek}
            onChange={updateAutoAwardRules}
            style={{ marginLeft: '10px', width: '60px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '15px' }}>
          <input
            type="checkbox"
            name="perShiftAward"
            checked={autoAwardRules.perShiftAward}
            onChange={updateAutoAwardRules}
          />
          Automatically award top driver each shift (up to max per week)
        </label>
      </form>
    </DashboardLayout>
  );
}