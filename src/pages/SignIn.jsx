import { Box, TextField, Button, Typography, Snackbar, Alert, Stack } from '@mui/material';
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSignIn } from '../hooks/useSignIn';

const INITIAL_NOTIFICATION = { open: false, message: '', severity: 'error' };

function SignInPage() {
  const [email, setEmail] = useState('tenoriovidalbraian@gmail.com');
  const [notification, setNotification] = useState(INITIAL_NOTIFICATION);
  const { signIn, loading } = useSignIn();

  const canSubmit = !loading && email.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    try {
      await signIn(email);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || 'Error al buscar candidato',
        severity: 'error',
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={2} sx={{ width: 500 }}>
        <Typography variant="h3">Sign in</Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          fullWidth
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {loading ? <LoadingSpinner size={20} /> : 'Submit'}
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={notification.open}
        autoHideDuration={notification.severity === 'error' ? null : 4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SignInPage;