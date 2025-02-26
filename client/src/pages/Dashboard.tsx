import React, { useEffect, useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import axios from 'axios';
import { useState } from 'react';

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadUser();
    // Fetch bank data
    const fetchBankData = async () => {
      try {
        const res = await axios.get('/api/bank/12345');
        setTransactions(res.data.transactions);
        setBalance(res.data.balance);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBankData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Balance: ${balance}</p>
          <h2>Transactions</h2>
          <ul>
            {transactions.map((transaction: any) => (
              <li key={transaction.id}>
                {transaction.date} - {transaction.description} - ${transaction.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;