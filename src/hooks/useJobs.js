import { useEffect, useState } from 'react';
import { getJobs, submitApplication } from '../services/applicationService';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await getJobs();
        setJobs(data);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyToJob = async (jobId, repoUrl, candidateId, uuid, applicationId) => {
    return submitApplication({
      jobId,
      repoUrl,
      candidateId,
      uuid,
      applicationId
    });
  };

  return {
    jobs,
    loading,
    applyToJob,
  };
};