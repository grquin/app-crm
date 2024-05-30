// src/routes/search/search.tsx
import React, { useEffect, useState } from 'react';
import { Table, Input, Spin } from 'antd';
import { useDataProvider } from '@refinedev/core';

const Search = () => {
    const dataProvider = useDataProvider();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const handleSearch = async (value: string) => {
        setLoading(true);
        try {
            const response = await dataProvider.getSearchResults(value);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Provider', dataIndex: 'provider', key: 'provider' },
        { title: 'Cost', dataIndex: 'cost', key: 'cost' },
        // Add more columns as needed
    ];

    return (
        <div>
            <Input.Search
                placeholder="Search Turquoise Health"
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
            />
            {loading ? (
                <Spin size="large" />
            ) : (
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                />
            )}
        </div>
    );
};

export default Search;
