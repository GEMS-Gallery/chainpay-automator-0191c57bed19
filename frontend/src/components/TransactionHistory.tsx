import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import DataTable from 'react-data-table-component';
import { backend } from 'declarations/backend';

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const fetchTransactionHistory = async () => {
    try {
      const result = await backend.getTransactionHistory();
      setTransactions(result);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row: any) => row.amount.toFixed(2),
      sortable: true,
    },
    {
      name: 'Recipient',
      selector: (row: any) => row.recipient,
      sortable: true,
    },
    {
      name: 'Timestamp',
      selector: (row: any) => new Date(Number(row.timestamp) / 1000000).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Transaction History
        </Typography>
        <Box sx={{ height: '400px' }}>
          <DataTable
            columns={columns}
            data={transactions}
            pagination
            progressPending={loading}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
