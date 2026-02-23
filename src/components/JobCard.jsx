
import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';

function JobCard({
  job,
  repoUrl,
  isSubmitting,
  onRepoUrlChange,
  onSubmit,
}) {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6">{job.title}</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {job.description}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Repo URL"
          placeholder="https://github.com/..."
          fullWidth
          value={repoUrl}
          onChange={(e) => onRepoUrlChange(e.target.value)}
          disabled={isSubmitting}
        />

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={isSubmitting || !repoUrl?.trim()}
        >
          {isSubmitting ? <LoadingSpinner size={20} /> : 'Submit'}
        </Button>
      </Box>
    </Paper>
  );
}

export default JobCard;