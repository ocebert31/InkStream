import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postConfirmation } from '../API/authentification';
import { useAuth } from '../AuthContext';
import './confirmationRegistration.css';

function EmailConfirmationPage() {
    const { token } = useParams()
    const { updateUser } = useAuth();
    const [isConfirmed, setIsConfirmed] = useState(null);

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const { user } = await postConfirmation(token);
                updateUser(user);
                setIsConfirmed(true)
            } catch (error) {
                setIsConfirmed(false)
            }
        };

        confirmEmail();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 rounded-lg shadow-lg text-center max-w-md style-p">
                {isConfirmed === null && (
                    <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary border-solid"></div>
                        <p className="mt-4 text-xl text-gray-700 font-semibold">Chargement...</p>
                    </div>
                </div>
                )}
                {isConfirmed === true && (
                    <div>
                        <p className="text-2xl font-bold text-primary mb-4">Votre adresse mail a été mise à jour</p>
                        <Link to="/" className="mt-4 inline-block px-6 py-2 text-white bg-secondary rounded-full hover:bg-[#e97a47] transition duration-300">
                            Cliquez ici pour retourner à l'accueil
                        </Link>
                    </div>
                )}
                {isConfirmed === false && (
                        <p className="text-lg text-red-600 font-medium">
                            Erreur lors de la confirmation du changement d'email
                        </p>
                )}
            </div>
        </div>
    );
}

export default EmailConfirmationPage;
