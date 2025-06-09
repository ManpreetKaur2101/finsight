'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function TransactionForm({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({ ...data, amount: parseFloat(data.amount) }),
    });
    reset();
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Add Transaction</h2>
      <input {...register('description')} placeholder="Description" className="w-full border p-2 rounded" />
      <input type="number" step="0.01" {...register('amount')} placeholder="Amount" className="w-full border p-2 rounded" />
      <input type="date" {...register('date')} className="w-full border p-2 rounded" />
      <select {...register('category')} className="w-full border p-2 rounded">
        <option value="FOOD">Food</option>
        <option value="RENT">Rent</option>
        <option value="TRAVEL">Travel</option>
        <option value="ENTERTAINMENT">Entertainment</option>
        <option value="UTILITIES">Utilities</option>
        <option value="OTHER">Other</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        {loading ? 'Saving...' : 'Add Transaction'}
      </button>
    </form>
  );
}
