import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCandidateLookup } from '../hooks/useCandidateLookup';

function Home() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { findByEmail, loading } = useCandidateLookup();

  const handleSubmit = async () => {
    try {
      const candidate = await findByEmail(email);

      localStorage.setItem(
      'candidate',
      JSON.stringify(candidate)
    );
      navigate('/jobs');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 350px',
          columnGap: 40,
          rowGap: 2,
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Ingresar
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Box />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !email}
          >
            {loading ? <LoadingSpinner size={20} /> : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;