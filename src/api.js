const BASE_URL = "http://localhost:8080";

export const API = {
  login: `${BASE_URL}/login`,
  signup: `${BASE_URL}/signup`,
  saveResult: `${BASE_URL}/saveResult`,
  getResults: (email) => `${BASE_URL}/results/${email}`
};