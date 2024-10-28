import api from './api';

const ApplicationService = {
  // Obtener solicitudes del usuario
  getUserApplications: async () => {
    return await api.get('/applications/user');
  },

  // Obtener una solicitud específica
  getApplicationById: async (id) => {
    return await api.get(`/applications/${id}`);
  },

  // Subir documentos
  uploadDocuments: async (applicationId, documents) => {
    const formData = new FormData();
    for (const [key, file] of Object.entries(documents)) {
      formData.append(key, file);
    }
    return await api.post(`/applications/${applicationId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Obtener estado de la solicitud
  getApplicationStatus: async (id) => {
    return await api.get(`/applications/${id}/status`);
  }
};

export default ApplicationService;