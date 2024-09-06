import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import WalletInfo from './components/WalletInfo';
import FundingSection from './components/FundingSection';
import MassPayoutForm from './components/MassPayoutForm';
import TransactionHistory from './components/TransactionHistory';
import ApiKeyForm from './components/ApiKeyForm';
import { backend } from 'declarations/backend';

function App() {
  const [loading, setLoading] = useState(true);
  const [walletInfo, setWalletInfo] = useState(null);

  useEffect(() => {
    fetchWalletInfo();
  }, []);

  const fetchWalletInfo = async () => {
    try {
      const result = await backend.getWalletInfo();
      if ('ok' in result) {
        setWalletInfo(result.ok);
      } else {
        console.error('Error fetching wallet info:', result.err);
      }
    } catch (error) {
      console.error('Error fetching wallet info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        Automated Onchain Payments
      </Typography>
      <ApiKeyForm />
      <WalletInfo walletInfo={walletInfo} onCreateWallet={fetchWalletInfo} />
      <FundingSection onFundWallet={fetchWalletInfo} />
      <MassPayoutForm onPayoutComplete={fetchWalletInfo} />
      <TransactionHistory />
    </Container>
  );
}

export default App;
