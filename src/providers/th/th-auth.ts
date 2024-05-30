import axios from 'axios';

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

if (!USERNAME || !PASSWORD) {
    throw new Error("Environment variables USERNAME and PASSWORD must be defined");
}

const thClient = axios.create({
    baseURL: 'https://api.turquoise.health',
    auth: {
        username: USERNAME,
        password: PASSWORD
    }
});

export const authenticate = async () => {
    try {
        const response = await thClient.get('/auth');
        return response.data;
    } catch (error) {
        console.error('Authentication failed:', error);
        throw error;
    }
};
