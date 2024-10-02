import React, { useEffect, useState } from 'react';
import { getAllStat } from '../../../services/statisticService'; 
import { useAuth } from "../../../context/AuthContext"; 
import ErrorAlert from '../../Notifications/ErrorAlert';

function Statistiques() {
    const [stats, setStats] = useState(null);
    const { token } = useAuth();
    const [showErrorAlert, setShowErrorAlert] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsData = await getAllStat(token);
                setStats(statsData); 
            } catch {
                setShowErrorAlert("Erreur lors de la mise à jour des statistiques");
            }
        };
        fetchStats();
    }, [token]); 

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Statistiques</h1>
            {stats ? (
                <div className="bg-white p-4 shadow rounded">
                    <p><strong>Total Users:</strong> {stats.usersCount}</p>
                    <p><strong>Total Articles:</strong> {stats.articlesCount}</p>
                    <p><strong>Total Comments:</strong> {stats.commentsCount}</p>
                </div>
            ) : (
                <div>Pas de statistiques.</div>
            )}
            {showErrorAlert && (<ErrorAlert message={showErrorAlert} onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
}

export default Statistiques;
