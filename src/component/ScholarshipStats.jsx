import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ScholarshipStats = ({ stats }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (stats) {
      setChartData([
        { name: "Scholarships", value: stats.scholarships },
        { name: "Applications", value: stats.applications },
        { name: "Approved", value: stats.approved },
      ]);
    }
  }, [stats]);

  return (
    <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-purple-800 text-white py-12 px-6 rounded-xl shadow-2xl my-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">🎓 Scholarship Statistics</h2>

      {/* Animated Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-12">
        <div className="p-6 bg-white/10 rounded-lg shadow-md hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-2">Total Scholarships</h3>
          <p className="text-4xl font-bold">
            <CountUp end={stats.scholarships} duration={2.5} separator="," />
          </p>
        </div>

        <div className="p-6 bg-white/10 rounded-lg shadow-md hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-2">Total Applications</h3>
          <p className="text-4xl font-bold">
            <CountUp end={stats.applications} duration={2.5} separator="," />
          </p>
        </div>

        <div className="p-6 bg-white/10 rounded-lg shadow-md hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-2">Approved Applications</h3>
          <p className="text-4xl font-bold">
            <CountUp end={stats.approved} duration={2.5} separator="," />
          </p>
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScholarshipStats;
