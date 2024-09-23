import React, { useState, useEffect } from 'react';
import { getUsers, updateUserRole } from '../API/admin'; 
import { useAuth } from "../AuthContext";
import InfiniteScrollComponent from '../Components/infiniteScroll';
import Search from '../Articles/Search/search';
import CategoryList from '../Categories/categoryList';
import Stat from '../Stat/stat';

function UsersList() {
    const [users, setUsers] = useState([]);
    const { token } = useAuth(); 
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [page, setPage] = useState(1); 
    const [limit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [activeTab, setActiveTab] = useState('users');

    useEffect(() => {
        if (token && activeTab === 'users') {
            const loadUsers = async () => {
                try {
                    const fetchedUsers = await getUsers(searchQuery, page, limit, token);
                    setUsers(prevUsers => page === 1 ? fetchedUsers.users : [...prevUsers, ...fetchedUsers.users]);

                    if (fetchedUsers.users.length < limit) {
                        setHasMore(false);
                    }
                } catch (error) {
                    setShowErrorAlert(true);
                }
            };
            loadUsers();
        }
    }, [searchQuery, page, limit, token, activeTab]);

    useEffect(() => {        
        setUsers([]); 
        setPage(1);
        setHasMore(true);
    }, [searchQuery]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole, token);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour du rôle", error);
            setShowErrorAlert(true);
        }
    };

    if (showErrorAlert) {
        return <div className="flex justify-center items-center h-screen text-red-500">Erreur lors du chargement des utilisateurs.</div>;
    }

    const handleSearchQueryChange = (search) => {
        setSearchQuery(search);
        setPage(1);
    };

    return (
        <div className='bg-gray-100 min-h-screen font-montserrat'>
            <div className="container mx-auto px-4 py-8">
                <Search handleSearchQueryChange={handleSearchQueryChange} />
                <div className="flex space-x-4 mb-4">
                    <button onClick={() => setActiveTab('users')} className={`px-4 py-2 ${activeTab === 'users' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
                        Utilisateurs
                    </button>
                    <button onClick={() => setActiveTab('category')} className={`px-4 py-2 ${activeTab === 'category' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
                        Categories
                    </button>
                    <button onClick={() => setActiveTab('stat')} className={`px-4 py-2 ${activeTab === 'stat' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
                        Statistiques
                    </button>
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
                {activeTab === 'category' && (
                    <CategoryList></CategoryList>
                )}
                {activeTab === 'stat' && (
                    <div>
                        <Stat></Stat>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UsersList;
