import { Paper, Typography, Box, Button } from '@mui/material';

function CandidateHeader({ candidate, onLogout }) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">
        Available Jobs
      </Typography>

      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Logged in as
        </Typography>
        <Typography fontWeight="bold">
          {candidate.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Application ID: {candidate.applicationId}
        </Typography>
      </Box>

      <Button size="small" variant="outlined" onClick={onLogout}>
        Logout
      </Button>
    </Paper>
  );
}

export default CandidateHeader;