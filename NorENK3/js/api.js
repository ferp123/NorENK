import 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';

const api = axios.create({
  baseURL: 'http://localhost:5001/api'
});

export const searchENKProfiles = async (query) => {
  const response = await api.get(`/enkprofiles/search?query=${query}`);
  return response.data;
};

export default api;
