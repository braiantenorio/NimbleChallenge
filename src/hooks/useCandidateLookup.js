import { useState } from 'react';
import { getCandidateByEmail } from '../services/applicationService.js';

export const useCandidateLookup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const findByEmail = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const candidate = await getCandidateByEmail(email);
      return candidate;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    findByEmail,
    loading,
    error,
  };
};