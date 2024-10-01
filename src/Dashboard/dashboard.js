import React, { useState, useEffect } from 'react';
import { getUsers, updateUserRole } from '../services/adminService'; 
import { useAuth } from "../AuthContext";
import InfiniteScrollComponent from '../Components/infiniteScroll';
import Search from '../Articles/Search/search';
import CategoryList from '../Categories/categoryList';
import Stat from '../Stat/stat';
import ErrorAlert from '../Alert/error';
import tabs from './tabs';

function UsersList() {
    const [users, setUsers] = useState([]);
    const { token } = useAuth(); 
    const [showErrorAlert, setShowErrorAlert] = useState("");
    const [searchQuery, setSearchQuery] = useState(''); 
    const [page, setPage] = useState(1); 
    const [limit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [activeTab, setActiveTab] = useState('users');

    useEffect(() => {        
        setUsers([]); 
        setPage(1);
        setHasMore(true);
    }, [searchQuery]);

    useEffect(() => {
        if (token && activeTab === 'users') {
            const loadUsers = async () => {
                try {
                    const fetchedUsers = await getUsers(searchQuery, page, limit, token);
                    setUsers(prevUsers => page === 1 ? fetchedUsers.users : [...prevUsers, ...fetchedUsers.users]);
                    checkHasMoreUsers(fetchedUsers);
                } catch {
                    setShowErrorAlert("Erreur lors du chargement des utilisateurs");
                }
            };
            loadUsers();
        }
    }, [searchQuery, page, limit, token, activeTab]);

    const checkHasMoreUsers = (fetchedUsers) => {
        if (fetchedUsers.users.length < limit) {
            setHasMore(false);
        } else setHasMore(true);
    }

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole, token);
            handleUserUpdated(userId, newRole)
        } catch {
            setShowErrorAlert(true);
        }
    };

    const handleUserUpdated = (userId, newRole) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId ? { ...user, role: newRole } : user
            )
        );
    };      

    const handleSearchQueryChange = (search) => {
        setSearchQuery(search);
        setPage(1);
    };

    return (
        <div className='bg-gray-100 min-h-screen font-montserrat'>
            <div className="container mx-auto px-4 py-8">
                <Search handleSearchQueryChange={handleSearchQueryChange} />
                <div className="flex space-x-4 mb-4">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 ${activeTab === tab.id ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                {activeTab === 'users' && (
                    <InfiniteScrollComponent loadMore={() => setPage(page + 1)} dataLength={users.length} hasMore={hasMore}>
                        <ul>
                            {users.map(user => (
                                <div key={user._id} className="border border-gray-300 p-4 mb-4 flex justify-between items-center bg-white rounded-md shadow-md">
                                    <p className="text-gray-800">{user.email}</p>
                                    {user.role !== 'admin' && (
                                        <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)} className="border border-gray-300 p-2 rounded-md bg-gray-50">
                                            <option value="author">Auteur</option>
                                            <option value="reader">Lecteur</option>
                                        </select>
                                    )}
                                </div>
                            ))}
                        </ul>
                    </InfiniteScrollComponent>
                )}
                {activeTab === 'category' && (<CategoryList></CategoryList>)}
                {activeTab === 'stat' && (<Stat></Stat>)}
            </div>
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default UsersList;
