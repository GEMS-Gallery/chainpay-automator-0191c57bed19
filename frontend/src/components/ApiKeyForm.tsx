import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { backend } from 'declarations/backend';

const ApiKeyForm: React.FC = () => {
  const [apiKeyName, setApiKeyName] = useState('');
  const [apiKeyPrivateKey, setApiKeyPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyName || !apiKeyPrivateKey) return;

    setLoading(true);
    try {
      await backend.setApiKeys(apiKeyName, apiKeyPrivateKey);
      setApiKeyName('');
      setApiKeyPrivateKey('');
      alert('API keys set successfully');
    } catch (error) {
      console.error('Error setting API keys:', error);
      alert('Failed to set API keys');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Set API Keys
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            label="API Key Name"
            value={apiKeyName}
            onChange={(e) => setApiKeyName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="API Key Private Key"
            type="password"
            value={apiKeyPrivateKey}
            onChange={(e) => setApiKeyPrivateKey(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !apiKeyName || !apiKeyPrivateKey}
          >
            {loading ? 'Setting...' : 'Set API Keys'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ApiKeyForm;
