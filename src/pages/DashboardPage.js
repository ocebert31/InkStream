import React, { useState } from 'react';
import ListCategory from '../components/Dashboard/Category/ListCategory.js';
import Statistic from '../components/Dashboard/Statistic/Statistic.js';
import tabs from '../utils/constants/tabs';
import UserList from '../components/Dashboard/UserList/UserList.js';

function DashboardPage() {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className='bg-gray-100 min-h-screen font-montserrat'>
            <div className="container mx-auto px-4 py-8">
                
                <div className="flex space-x-4 mb-4">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 ${activeTab === tab.id ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                {activeTab === 'users' && (<UserList/>)}
                {activeTab === 'category' && (<ListCategory/>)}
                {activeTab === 'stat' && (<Statistic/>)}
            </div>
            
        </div>
    );
}

export default DashboardPage;
