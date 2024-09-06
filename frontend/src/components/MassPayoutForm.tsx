import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

interface MassPayoutFormProps {
  onPayoutComplete: () => void;
}

const MassPayoutForm: React.FC<MassPayoutFormProps> = ({ onPayoutComplete }) => {
  const { control, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const addresses = data.addresses.split('\n').filter((address: string) => address.trim() !== '');
    const amount = Number(data.amount);

    if (addresses.length === 0 || isNaN(amount)) return;

    setLoading(true);
    try {
      const result = await backend.sendMassPayout(addresses, amount);
      if ('ok' in result) {
        onPayoutComplete();
        reset();
      } else {
        console.error('Error sending mass payout:', result.err);
      }
    } catch (error) {
      console.error('Error sending mass payout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Mass Payout
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Controller
            name="addresses"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Recipient Addresses"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                placeholder="Enter one address per line"
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount per Address"
                type="number"
                fullWidth
                margin="normal"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Sending Payout...' : 'Send Mass Payout'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MassPayoutForm;
