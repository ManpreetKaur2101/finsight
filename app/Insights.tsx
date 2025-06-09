'use client';

export default function Insights({ transactions, budgets }: { transactions: any[]; budgets: any[] }) {
  const currentMonth = new Date().toISOString().slice(0, 7);

  const totals: Record<string, number> = {};
  transactions.forEach((tx) => {
    const month = new Date(tx.date).toISOString().slice(0, 7);
    if (month === currentMonth) {
      totals[tx.category] = (totals[tx.category] || 0) + tx.amount;
    }
  });

  const insights = budgets
    .filter((b) => b.month === currentMonth)
    .map((b) => {
      const spent = totals[b.category] || 0;
      const overBudget = spent > b.amount;
      return { ...b, spent, overBudget };
    });

  const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="bg-white p-4 mt-6 rounded shadow space-y-2">
      <h2 className="text-lg font-semibold">Spending Insights</h2>
      {insights.map((insight) => (
        <div key={insight.id} className={insight.overBudget ? 'text-red-600' : 'text-green-600'}>
          {insight.category}: Spent ₹{insight.spent.toFixed(2)} / ₹{insight.amount} {insight.overBudget && '⚠ Over Budget'}
        </div>
      ))}
      {top && (
        <p className="text-blue-600 font-medium">
          📌 Top Spending: {top[0]} ₹{top[1].toFixed(2)}
        </p>
      )}
    </div>
  );
}
