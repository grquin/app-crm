// src/routes/search/index.tsx
import React, { useEffect, useState } from 'react';
import Search from './search';
import { authenticate } from '../../providers/th/th-auth';

const SearchContainer = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authData = await authenticate();
                setData(authData); // Set the retrieved data
                console.log('Authenticated:', authData);
            } catch (error) {
                console.error('Auth error:', error);
            }
        };

        fetchData();
    }, []);

    return <Search data={data} />;
};

export default SearchContainer;
