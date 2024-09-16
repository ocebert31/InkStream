import React, { useState, useEffect } from 'react';
import { getUsers, updateUserRole } from '../API/admin'; 
import { useAuth } from "../AuthContext";
import ErrorAlert from '../Alert/error';

function UsersList() {
    const [users, setUsers] = useState(null);
    const { token } = useAuth(); 
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [page, setPage] = useState(1); 
    const [limit] = useState(20);

    useEffect(() => {
        if (token) {
            const loadUsers = async () => {
                try {
                    const fetchedUsers = await getUsers(searchQuery, page, limit, token);
                    setUsers(fetchedUsers.users);
                } catch (error) {
                    setShowErrorAlert(true);
                }
            };
            loadUsers();
        }
    }, [searchQuery, page, limit, token]);

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

    if (!users) {
        return <div className="flex justify-center items-center h-screen text-gray-500">Chargement...</div>;
    }

    return (
        <div className='bg-gray-100 min-h-screen font-montserrat'>
            <div className="container mx-auto px-4 py-8">
                <input type="text" placeholder="Rechercher un utilisateur" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-300 p-2 mb-4 rounded-md w-full max-w-md"/>
                <div>
                    {users.length > 0 ? (
                        users.map(user => (
                            <div key={user._id} className="border border-gray-300 p-4 mb-4 flex justify-between items-center bg-white rounded-md shadow-md">
                                <p className="text-gray-800">{user.email}</p>
                                {user.role !== 'admin' &&
                                <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)} className="border border-gray-300 p-2 rounded-md bg-gray-50">
                                    <option value="author">Auteur</option>
                                    <option value="reader">Lecteur</option>
                                </select>}
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-10 text-gray-600">Aucun utilisateur trouvé.</p>
                    )}
                </div>
                <div className="flex justify-between mt-8">
                    <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1} className="px-4 py-2 bg-primary text-white rounded-md disabled:bg-gray-300">
                        Précédent
                    </button>
                    <button onClick={() => setPage(page + 1)} disabled={users.length < limit} className="px-4 py-2 bg-primary text-white rounded-md disabled:bg-gray-300">
                        Suivant
                    </button>
                </div>
            </div>
            {showErrorAlert && (
                <ErrorAlert message="Erreur lors de la récupération des utilisateurs." onClose={() => setShowErrorAlert(false)} />
            )}
        </div>
    );
}

export default UsersList;
