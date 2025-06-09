'use client';

import { format } from 'date-fns';

export default function DashboardStats({ transactions }: { transactions: any[] }) {
  const thisMonth = new Date().getMonth();

  const currentTx = transactions.filter(
    (tx) => new Date(tx.date).getMonth() === thisMonth
  );

  const total = currentTx.reduce((sum, tx) => sum + tx.amount, 0);
  const recent = currentTx.slice(0, 5);

  return (
    <div className="bg-white mt-6 p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Dashboard Summary</h2>
      <p>Total This Month: <strong>${total.toFixed(2)}</strong></p>
      <h3 className="font-medium text-sm">Recent Transactions:</h3>
      <ul className="list-disc pl-5 text-sm">
        {recent.map((tx) => (
          <li key={tx.id}>
            {tx.description} – ${tx.amount.toFixed(2)} on {format(new Date(tx.date), 'MMM dd')}
          </li>
        ))}
      </ul>
    </div>
  );
}
