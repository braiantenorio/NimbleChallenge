export const getStoredCandidate = () => {
  const data = localStorage.getItem('candidate');
  return data ? JSON.parse(data) : null;
};

export const clearCandidate = () => {
  localStorage.removeItem('candidate');
};