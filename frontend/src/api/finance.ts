import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;

export async function getAccounts() {
  const res = await axios.get(`${API_BASE}/accounts`, { withCredentials: true });
  return res.data;
}

export async function getTransactions(accountId: string) {
  const res = await axios.get(
    `${API_BASE}/accounts/${accountId}/transactions`,
    { withCredentials: true }
  );
  return res.data;
}
