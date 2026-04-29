const BASE_URL = "https://fullstackprojectbackend-production-7ce7.up.railway.app";

export const API = {
  login: `${BASE_URL}/login`,
  signup: `${BASE_URL}/signup`,
  saveResult: `${BASE_URL}/saveResult`,
  getResults: (email) => `${BASE_URL}/results/${email}`
};