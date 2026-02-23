import { useEffect, useState } from 'react';
import { getJobs, submitApplication } from '../services/applicationService';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyToJob = async (jobId, repoUrl, candidateId, uuid, applicationId) => {
    try {
      return await submitApplication({
        jobId,
        repoUrl,
        candidateId,
        uuid,
        applicationId
      });
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  return {
    jobs,
    loading,
    error,
    applyToJob,
  };
};