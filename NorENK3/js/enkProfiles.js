import api from './api.js';

export const getENKProfiles = async () => {
  const response = await api.get('/enkprofiles');
  return response.data;
};

export const searchENKProfiles = async (query) => {
  const response = await api.get(`/enkprofiles/search?query=${query}`);
  return response.data;
};

export const filterENKProfiles = async (filters) => {
  const response = await api.get('/enkprofiles/filter', { params: filters });
  return response.data;
};

// Keep the sample data for fallback or development purposes
export const sampleProfiles = [
  // ... existing sample profile data ...
];
