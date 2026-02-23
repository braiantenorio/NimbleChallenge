import {
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from '@mui/material';
import { useState } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import LoadingSpinner from '../components/LoadingSpinner';
import { getStoredCandidate } from '../utils/auth';

function Jobs() {
  const { jobs, loading, applyToJob } = useJobs();
  const [reposUrls, setReposUrls] = useState({});
  const [submittingId, setSubmittingId] = useState(null);
  const navigate = useNavigate();

  const candidate = getStoredCandidate();


  useEffect(() => {
    if (!candidate) {
      navigate('/');
    }
  }, [candidate, navigate]);

  const handleSubmit = async (jobId) => {
    try {
      setSubmittingId(jobId);
      await applyToJob(jobId, reposUrls[jobId], candidate.candidateId, candidate.uuid, candidate.applicationId);

      alert('Postulación enviada');
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
      <Typography variant="h4" mb={4}>
        Available Jobs
      </Typography>

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
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Logged in as
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {candidate.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Application ID: {candidate.applicationId}
          </Typography>
        </Box>

        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
        >
          Logout
        </Button>
      </Paper>
      {jobs.map((job) => (
        <Paper elevation={2} key={job.id} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">{job.title}</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {job.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Repo URL"
              fullWidth
              value={reposUrls[job.id] || ''}
              onChange={(e) =>
                setReposUrls({
                  ...reposUrls,
                  [job.id]: e.target.value,
                })
              }
            />

            <Button
              variant="contained"
              onClick={() => handleSubmit(job.id)}
              disabled={
                submittingId === job.id ||
                !reposUrls[job.id]
              }
            >
              {submittingId === job.id ? (
                <LoadingSpinner size={20} />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

export default Jobs;