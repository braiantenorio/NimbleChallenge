import { Box, TextField, Button, Typography } from '@mui/material';
import { getCandidateByEmail } from '../services/applicationService.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const [email, setEmail] = useState('');
    const navigate = useNavigate();


  const handleSubmit = async () => {
    try {
      const response = await getCandidateByEmail(email);
      navigate('/opportunities'); 

      console.log(response);
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
          columnGap: 15,
          rowGap: 2,
          alignItems: 'center'
        }}
      >
  


          <Typography variant="h4">Ingresar</Typography>

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
            disabled={!email}
          >
          Submit</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;