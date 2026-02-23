import axios from 'axios';
import { getErrorMessage } from '../utils/errorHandler';

const API_BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const getCandidateByEmail = async (email) => {
  if (!email || !email.includes('@')) {
    throw new Error('El email debe ser válido');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/candidate/get-by-email`, {
      params: { email }
    });

    if (!response.data) {
      throw new Error('Respuesta vacía del servidor');
    }

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'buscar candidato'));
  }
};

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/jobs/get-list`);

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Formato de respuesta inválido');
    }

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'obtener empleos'));
  }
};

export const submitApplication = async (applicationData) => {
  if (!applicationData || !applicationData.jobId) {
    throw new Error('Datos de aplicación incompletos');
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/candidate/apply-to-job`, applicationData);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'enviar aplicación'));
  }
};
