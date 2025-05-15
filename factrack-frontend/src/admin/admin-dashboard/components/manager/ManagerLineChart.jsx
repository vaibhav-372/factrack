// src/components/admin/ManagerLineChart.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ZingChart from 'zingchart-react';
import 'zingchart';

const ManagerLineChart = () => {
  const managers = useSelector(state => state.adminManager.list || []);
  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    // Group managers by creation date (e.g., '2025-05-01')
    const dateCounts = managers
      .filter(m => !m.isDeleted)
      .reduce((acc, curr) => {
        const date = new Date(curr.createdAt).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

    const sortedDates = Object.keys(dateCounts).sort();
    const counts = sortedDates.map(date => dateCounts[date]);

    setChartConfig({
      type: 'line',
      title: {
        text: 'Managers Added Per Day',
        fontColor: '#0f766e',
        fontSize: 18,
      },
      scaleX: {
        label: { text: 'Date' },
        labels: sortedDates,
      },
      scaleY: {
        label: { text: 'Count' },
        minValue: 0,
      },
      series: [{
        values: counts,
        lineColor: '#14b8a6',
        backgroundColor: '#14b8a6',
      }],
      plot: {
        animation: {
          effect: 'ANIMATION_SLIDE_LEFT',
          method: 'ANIMATION_BOUNCE_EASE_OUT',
          speed: 1200
        }
      }
    });
  }, [managers]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-lg font-semibold text-teal-700 mb-4">
        Managers Added Per Day
      </h2>
      <ZingChart data={chartConfig} height="300px" width="100%" />
    </div>
  );
};

export default ManagerLineChart;
