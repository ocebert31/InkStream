import React, { useState, useEffect } from 'react';
import InfiniteScrollComponent from '../../../common/UI/InfiniteScroll';
import { useAuth } from '../../../context/AuthContext';
import { getUsers, updateUserRole } from '../../../services/adminService'; 
import SearchBar from '../../../common/Articles/SearchBar.js';
import { checkHasMore } from "../../../utils/helpers/checkHasMore.js";
import ErrorAlert from '../../Notifications/ErrorAlert.js';

function UserList() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true);
    const [showErrorAlert, setShowErrorAlert] = useState("");
    const { token } = useAuth(); 
    const [limit] = useState(10);

    useEffect(() => {        
        setUsers([]); 
        setPage(1);
        setHasMore(true);
    }, [searchQuery]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const result = await getUsers(searchQuery, page, limit, token);
                setUsers(prevUsers => page === 1 ? result.users : [...prevUsers, ...result.users]);
                checkHasMore(result, limit, setHasMore);
            } catch {
                setShowErrorAlert("Erreur lors du chargement des utilisateurs");
            }
        };
        loadUsers();
    }, [searchQuery, page, limit, token]);  

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole, token);
            handleUserUpdated(userId, newRole)
        } catch {
            setShowErrorAlert("Erreur lors du chargement de rôle de l'utilisateur");
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

    return(
        <div>
            <SearchBar handleSearchQueryChange={handleSearchQueryChange} />
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
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    )
}

export default UserList;