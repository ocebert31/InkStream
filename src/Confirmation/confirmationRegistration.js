import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postConfirmation } from '../API/authentification';
import './confirmationRegistration.css';

const ConfirmationRegistration = () => {
    const { token } = useParams();
    const [isConfirmed, setIsConfirmed] = useState(null);

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                if (token) {
                    await postConfirmation(token);
                    setIsConfirmed(true);
                }
            } catch (error) {
                setIsConfirmed(false);
            }
        };
        confirmAccount();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md style-p">
                {isConfirmed === null && (
                    <p className="text-lg text-gray-700 font-medium">En cours de chargement...</p>
                )}
                {isConfirmed === true && (
                    <div>
                        <p className="text-2xl font-bold text-primary mb-4">Votre compte est validé !</p>
                        <Link to="/login" className="mt-4 inline-block px-6 py-2 text-white bg-secondary rounded-full hover:bg-[#e97a47] transition duration-300">
                            Cliquez ici pour vous connecter
                        </Link>
                    </div>
                )}
                {isConfirmed === false && (
                    <p className="text-lg text-red-600 font-medium">
                        Erreur lors de la confirmation de création de votre compte
                    </p>
                )}
            </div>
        </div>
    );
};

export default ConfirmationRegistration;
