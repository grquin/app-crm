// src/providers/th/apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.turquoise.health/v1';

const apiService = axios.create({
    baseURL: API_BASE_URL,
    auth: {
        username: 'your_username',
        password: 'your_password'
    }
});

export const getMedicareCMSData = async () => {
    try {
        const response = await apiService.get('/medicare-cms-data');
        return response.data;
    } catch (error) {
        console.error('Error fetching Medicare CMS data', error);
        throw error;
    }
};

export const searchTurquoiseHealth = async (query) => {
    try {
        const response = await apiService.get(`/search`, { params: { query } });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Turquoise Health API:', error);
        throw error;
    }
};
