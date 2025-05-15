import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManagers } from '../../redux/adminManagerSlice';
import ZingChart from 'zingchart-react';
import 'zingchart';
import ManagerLineChart from '../components/manager/ManagerLineChart';

const COLORS = ['#ef4444', '#0ea5e9', '#f97316', '#6366f1', '#10b981', '#14b8a6'];

const Overview = () => {
  const dispatch = useDispatch();
  const managers = useSelector(state => state.adminManager.list || []);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    dispatch(fetchManagers());
  }, [dispatch]);

  useEffect(() => {
    const attendanceData = managers
      .filter(manager => !manager.isDeleted)
      .reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {});

    const data = Object.entries(attendanceData).map(([status, count], index) => ({
      text: status,
      values: [count],
      backgroundColor: COLORS[index % COLORS.length]
    }));

    setChartData(data);
  }, [managers]);

  const chartConfig = {
    type: 'pie3d',
    title: {
      text: 'Manager Distribution by Department',
      fontColor: '#0f766e',
      fontSize: 20,
    },
    plot: {
      animation: {
        effect: 5,
        method: 1,
        speed: 1500,
        sequence: 1
      },
      valueBox: {
        placement: 'out',
        text: `%t\n%npv%`,
        fontSize: 12
      }
    },
    series: chartData,
  };

  return (
    <div>
      <motion.div className="relative bg-white p-4 rounded-xl shadow-md mt-6">
        <motion.h2
          className="text-xl font-semibold mb-4 text-teal-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Manager Distribution by Department
        </motion.h2>

        <div className="h-[400px]">
          <ZingChart data={chartConfig} height="100%" width="100%" />
        </div>
      </motion.div>
      
      <ManagerLineChart />
    </div>
  );
};

export default Overview;
