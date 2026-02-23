import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCandidateLookup } from '../hooks/useCandidateLookup';

function Home() {
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const navigate = useNavigate();
  const { findByEmail, loading } = useCandidateLookup();

  const handleSubmit = async () => {
    try {
      const candidate = await findByEmail(email);
      localStorage.setItem('candidate', JSON.stringify(candidate));

      setSnackbarMessage('¡Bienvenido! Redirigiendo...');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate('/jobs', { replace: true });
      }, 1200);

    } catch (error) {
      setSnackbarMessage(error.message || 'Error al buscar candidato');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 500px',
          columnGap: 40,
          rowGap: 2,
          alignItems: 'center'
        }}
      >
        <Typography variant="h3">
          Sign in
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading && email) {
              handleSubmit();
            }
          }}
          disabled={loading}
          fullWidth
        />

        <Box />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !email.trim()}
          >
            {loading ? <LoadingSpinner size={20} /> : 'Submit'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={snackbarSeverity === 'error' ? null : 4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;