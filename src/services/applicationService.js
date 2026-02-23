import axios from 'axios';

const API_BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const getCandidateByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/candidate/get-by-email`, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/jobs/get-list`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const submitApplication = async (applicationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/candidate/apply-to-job`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
