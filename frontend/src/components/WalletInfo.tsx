import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { backend } from 'declarations/backend';

interface WalletInfoProps {
  walletInfo: any;
  onCreateWallet: () => void;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ walletInfo, onCreateWallet }) => {
  const handleCreateWallet = async () => {
    try {
      const result = await backend.createWallet();
      if ('ok' in result) {
        onCreateWallet();
      } else {
        console.error('Error creating wallet:', result.err);
      }
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Wallet Information
        </Typography>
        {walletInfo ? (
          <Box>
            <Typography variant="body1">ID: {walletInfo.id}</Typography>
            <Typography variant="body1">Balance: {walletInfo.balance.toFixed(2)}</Typography>
            <Typography variant="body1">
              Created: {new Date(Number(walletInfo.createdAt) / 1000000).toLocaleString()}
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" gutterBottom>
              No wallet found.
            </Typography>
            <Button variant="contained" onClick={handleCreateWallet}>
              Create Wallet
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletInfo;
