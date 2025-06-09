'use client';

export default function TransactionList({ transactions, onDelete }: any) {
  return (
    <div className="mt-6 space-y-3">
      <h2 className="text-lg font-semibold">All Transactions</h2>
      {transactions.map((tx: any) => (
        <div key={tx.id} className="flex justify-between items-center bg-gray-100 p-3 rounded shadow">
          <div>
            <p className="font-medium">{tx.description}</p>
            <p className="text-sm text-gray-500">{new Date(tx.date).toDateString()}</p>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-green-600 font-semibold">${tx.amount.toFixed(2)}</span>
            <button onClick={() => onDelete(tx.id)} className="text-red-500 hover:underline text-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
