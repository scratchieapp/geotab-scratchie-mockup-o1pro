// src/components/LineChartComponent.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function LineChartComponent({ data }) {
  if (!data || data.length === 0) {
    return <p style={{ color: '#555', fontSize: '0.9rem' }}>No data available</p>;
  }

  // Extract driver names from the data keys (all keys except 'date')
  const allKeys = Object.keys(data[0]);
  const driverKeys = allKeys.filter(key => key !== 'date');

  // Determine line colors, just cycle through a few colors or use a predefined list
  const colors = ['#0070f3', '#28a745', '#dc3545', '#f39c12', '#9b59b6'];

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <LineChart data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '0.9rem' }} />
          {driverKeys.map((driver, index) => {
            const isTop3 = index < 3;
            return (
              <Line
                key={driver}
                type="monotone"
                dataKey={driver}
                stroke={isTop3 ? colors[index % colors.length] : '#bbb'}
                strokeDasharray={isTop3 ? '0' : '3 3'}
                strokeWidth={isTop3 ? 2 : 1.5}
                dot={false}
                activeDot={{ r: 8 }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}