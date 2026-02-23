export const getErrorMessage = (error, context = 'realizar la acción') => {
  if (!error.response && error.message === 'Network Error') {
    return 'Error de conexión. Verifica tu internet e intenta de nuevo';
  }

  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return data?.message || `Datos inválidos al ${context}`;
      case 404:
        return data?.message || `No se encontró el recurso al ${context}`;
      case 409:
        return data?.message || `Conflicto al ${context}. Intenta de nuevo`;
      case 500:
        return 'Error del servidor. Por favor intenta más tarde';
      case 503:
        return 'Servicio no disponible. Intenta más tarde';
      default:
        return data?.message || `Error al ${context} (${status})`;
    }
  }

  if (error.code === 'ECONNABORTED') {
    return 'La solicitud tardó demasiado. Intenta de nuevo';
  }

  if (error.message) {
    return error.message;
  }

  return `Error desconocido al ${context}`;
};
