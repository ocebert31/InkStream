import React, { useState, useEffect } from 'react';
import { getUsers, updateUserRole } from '../API/admin'; 
import { useAuth } from "../AuthContext";
import InfiniteScrollComponent from '../Components/infiniteScroll';

function UsersList() {
    const [users, setUsers] = useState([]);
    const { token } = useAuth(); 
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [page, setPage] = useState(1); 
    const [limit] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (token) {
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
    }, [searchQuery, page, limit, token]);

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

    if (users.length === 0) {
        return <div className="flex justify-center items-center h-screen text-gray-500">Chargement...</div>;
    }

    return (
        <div className='bg-gray-100 min-h-screen font-montserrat'>
            <div className="container mx-auto px-4 py-8">
                <input type="text" placeholder="Rechercher un utilisateur" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-300 p-2 mb-4 rounded-md w-full max-w-md"/>
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
            </div>
        </div>
    );
}

export default UsersList;
