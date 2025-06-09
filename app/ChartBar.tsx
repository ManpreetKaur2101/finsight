'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartBar({ transactions }: { transactions: any[] }) {
  const monthlyTotals: Record<string, number> = {};

  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + tx.amount;
  });

  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    name: month,
    total,
  }));

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Monthly Expense Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
