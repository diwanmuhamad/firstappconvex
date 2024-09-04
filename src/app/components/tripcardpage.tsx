import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export const LocationCard: React.FC = () => {
  return (
    <div className='text-center w-full p-4'>
        <h2 className='text-3xl'>Where is your trip destination?</h2>
        <Input size="large" placeholder="Search your destination" prefix={<SearchOutlined />} style={{width: "60%", marginTop: "50px", borderRadius: "50px"}} />
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; 2024 My Website</p>
    </footer>
  );
};