import { useNavigate } from 'react-router-dom';
import { useCandidateLookup } from './useCandidateLookup';

export function useSignIn() {
  const navigate = useNavigate();
  const { findByEmail, loading } = useCandidateLookup();

  const signIn = async (email) => {
    const candidate = await findByEmail(email);
    localStorage.setItem('candidate', JSON.stringify(candidate));
    navigate('/jobs', { replace: true, state: { showWelcome: true } });
  };

  return { signIn, loading };
}