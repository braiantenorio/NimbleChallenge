import {
  Box,
  Typography,
} from '@mui/material';
import { useState,useEffect } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useNavigate } from 'react-router-dom';
import { getStoredCandidate } from '../utils/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import CandidateHeader from '../components/CandidateHeader';
import FeedbackSnackbar from '../components/FeedbackSnackbar';
import JobCard from '../components/JobCard';

function Jobs() {
  const { jobs, loading, applyToJob } = useJobs();
  const [repoUrlsByJobId, setRepoUrlsByJobId] = useState({});
  const [submittingJobId, setSubmittingJobId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const navigate = useNavigate();
  const candidate = getStoredCandidate();

  useEffect(() => {
    if (!candidate) navigate('/');
  }, [candidate, navigate]);

  const handleApplyToJob = async (jobId) => {
    const repoUrl = repoUrlsByJobId[jobId];

    if (!repoUrl?.trim()) {
      return setSnackbar({ open: true, message: 'Repo URL inválida', severity: 'error' });
    }

    try {
      setSubmittingJobId(jobId);
      await applyToJob(jobId, repoUrl, candidate);
      setSnackbar({ open: true, message: 'Postulación enviada', severity: 'success' });
      setRepoUrlsByJobId(prev => ({ ...prev, [jobId]: '' }));
    } catch (e) {
      setSnackbar({ open: true, message: e.message || 'Error de red', severity: 'error' });
    } finally {
      setSubmittingJobId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6 }}>
      <CandidateHeader
        candidate={candidate}
        onLogout={() => {
          localStorage.clear();
          navigate('/');
        }}
      />

      {jobs.length === 0 ? (
        <Typography color="text.secondary">
          No jobs Available.
        </Typography>
      ) : (
        jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            repoUrl={repoUrlsByJobId[job.id] || ''}
            isSubmitting={submittingJobId === job.id}
            onRepoUrlChange={(value) =>
              setRepoUrlsByJobId(prev => ({ ...prev, [job.id]: value }))
            }
            onSubmit={() => handleApplyToJob(job.id)}
          />
        ))
      )}

      <FeedbackSnackbar
        {...snackbar}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
      />
    </Box>
  );
}

export default Jobs;