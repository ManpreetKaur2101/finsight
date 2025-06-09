'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BudgetChart({ transactions, budgets }: { transactions: any[]; budgets: any[] }) {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const actuals: Record<string, number> = {};
  transactions.forEach((tx) => {
    const month = new Date(tx.date).toISOString().slice(0, 7);
    if (month === currentMonth) {
      actuals[tx.category] = (actuals[tx.category] || 0) + tx.amount;
    }
  });

  const chartData = budgets
    .filter((b: any) => b.month === currentMonth)
    .map((b: any) => ({
      category: b.category,
      budget: b.amount,
      actual: actuals[b.category] || 0,
    }));

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#60a5fa" name="Budget" />
          <Bar dataKey="actual" fill="#f87171" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
