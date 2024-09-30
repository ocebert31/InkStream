import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postConfirmation } from '../API/authentification';
import { useAuth } from '../AuthContext';
import './confirmationEmail.css';
import ErrorAlert from '../Alert/error';

function ConfirmationEmail ({ isEmailUpdate = false }) {
    const { token } = useParams();
    const { updateUser } = useAuth();
    const [isConfirmed, setIsConfirmed] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const { user } = await postConfirmation(token);
                if (isEmailUpdate) {
                    updateUser(user);
                }
                setIsConfirmed(true);
            } catch (error) {
                setIsConfirmed(false);
                setShowErrorAlert(true)
            }
        };
        confirmEmail();
    }, [token]);

    const renderContent = () => {
        if (isConfirmed === null) {
            return (
                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary border-solid"></div>
                        <p className="mt-4 text-xl text-gray-700 font-semibold">Chargement...</p>
                    </div>
                </div>
            );
        }
        if (isConfirmed === true) {
            return (
                <div>
                    <p className="text-2xl font-bold text-primary mb-4">
                        {isEmailUpdate ? 'Votre adresse mail a été mise à jour' : 'Votre compte est validé !'}
                    </p>
                    <Link to={isEmailUpdate ? '/' : '/login'} className="mt-4 inline-block px-6 py-2 text-white bg-secondary rounded-full hover:bg-[#e97a47] transition duration-300">
                        {isEmailUpdate ? "Cliquez ici pour retourner à l'accueil" : 'Cliquez ici pour vous connecter'}
                    </Link>
                </div>
            );
        }
        return (
            <p className="text-lg text-red-600 font-medium">
                {isEmailUpdate ? "Erreur lors de la confirmation du changement d'email" : "Erreur lors de la confirmation de création de votre compte"}
            </p>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className={`${isConfirmed === null ? '' : 'bg-white shadow-lg'} p-8 rounded-lg text-center max-w-md style-p`}>
                {renderContent()}
            </div>
            {showErrorAlert && (<ErrorAlert message="Erreur lors de la confirmation d'email" onClose={() => setShowErrorAlert(false)}/>)}
        </div>
    );
};

export default ConfirmationEmail;

