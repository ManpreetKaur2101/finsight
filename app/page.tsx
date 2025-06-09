'use client';

import { useEffect, useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import ChartBar from './ChartBar';
import ChartPie from './ChartPie';
import DashboardStats from './DashboardStats';
import BudgetForm from './BudgetForm';
import BudgetChart from './BudgetChart';
import Insights from './Insights';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await fetch('/api/budgets');
      const data = await res.json();
      setBudgets(data);
    } catch (error) {
      console.error('Failed to load budgets:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">FinSight – Personal Finance Tracker</h1>

      <TransactionForm onSuccess={fetchTransactions} />
      <BudgetForm onSuccess={fetchBudgets} />

      <DashboardStats transactions={transactions} />
      <ChartBar transactions={transactions} />
      <ChartPie transactions={transactions} />

      <BudgetChart transactions={transactions} budgets={budgets} />
      <Insights transactions={transactions} budgets={budgets} />

      <TransactionList
        transactions={transactions}
        onDelete={async (id: string) => {
          await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
          fetchTransactions();
        }}
      />
    </main>
  );
}
