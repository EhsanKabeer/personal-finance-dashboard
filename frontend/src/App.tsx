import React, { useEffect, useState } from 'react';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import { getAccounts, getTransactions } from './api/finance';
import { ChartData } from 'chart.js';

interface Transaction {
  amount: number;
  category: string;
  transactionDate: string;
}

const App: React.FC = () => {
  const [pieData, setPieData] = useState<ChartData<'pie'>>();
  const [lineData, setLineData] = useState<ChartData<'line'>>();

  useEffect(() => {
    async function fetchData() {
      const { accounts } = await getAccounts();
      const accountId = accounts[0].accountId;
      const { transactions } = await getTransactions(accountId);

      const categorySum: Record<string, number> = {};
      const dateSum: Record<string, number> = {};

      transactions.forEach((tx: Transaction) => {
        const cat = tx.category || 'Other';
        categorySum[cat] = (categorySum[cat] || 0) + tx.amount;
        const date = tx.transactionDate.split('T')[0];
        dateSum[date] = (dateSum[date] || 0) + tx.amount;
      });

      setPieData({
        labels: Object.keys(categorySum),
        datasets: [{ data: Object.values(categorySum) }],
      });

      const sortedDates = Object.keys(dateSum).sort();
      setLineData({
        labels: sortedDates,
        datasets: [
          { label: 'Spending Over Time', data: sortedDates.map(d => dateSum[d]) }
        ],
      });
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Personal Finance Dashboard</h1>
      {pieData && <PieChart data={pieData} />}
      {lineData && <LineChart data={lineData} />}
    </div>
  );
};

export default App;
