// client.js

import { create } from "apisauce";

const api = create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 10000, // Optional: set a timeout (10 seconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
