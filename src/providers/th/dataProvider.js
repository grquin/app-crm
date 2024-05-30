// src/providers/th/dataProvider.js
import { DataProvider } from '@pankod/refine-core';
import { getMedicareCMSData, searchTurquoiseHealth } from './apiService';

const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const data = await getMedicareCMSData();
        return {
            data,
            total: data.length,
        };
    },
    getSearchResults: async (query) => {
        const data = await searchTurquoiseHealth(query);
        return {
            data,
            total: data.length,
        };
    },
    // Implement other methods as needed
};

export default dataProvider;
