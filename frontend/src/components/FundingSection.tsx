import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { backend } from 'declarations/backend';

interface FundingSectionProps {
  onFundWallet: () => void;
}

const FundingSection: React.FC<FundingSectionProps> = ({ onFundWallet }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFundWallet = async () => {
    if (!amount || isNaN(Number(amount))) return;

    setLoading(true);
    try {
      const result = await backend.fundWallet(Number(amount));
      if ('ok' in result) {
        onFundWallet();
        setAmount('');
      } else {
        console.error('Error funding wallet:', result.err);
      }
    } catch (error) {
      console.error('Error funding wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Fund Wallet
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Amount (ETH)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={handleFundWallet}
            disabled={loading || !amount}
          >
            {loading ? 'Funding...' : 'Fund Wallet'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FundingSection;
