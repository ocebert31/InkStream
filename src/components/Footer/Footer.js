import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialMediaLinks } from '../../utils/constants/socialMediaLinks';

function Footer() {
    const handleContactClick = () => {
        window.location.href = 'mailto:inkstream.app@gmail.com';
    };

    return (
        <footer className='background text-white p-4 text-center'>
            <div className='flex justify-center space-x-4 mb-4'>
                {socialMediaLinks().map((link) => 
                    <a href={link.href} target='_blank' rel='noopener noreferrer' className='text-white hover:text-secondary transition-colors duration-300'>
                        <FontAwesomeIcon icon={link.icon} />
                    </a>
                )}
            </div>
            <p className='text-sm'>
                &copy; {new Date().getFullYear()} Inkstream. Tous droits réservés.
            </p>
            <button onClick={handleContactClick} className='mt-2 p-2 bg-secondary text-white rounded hover:bg-primary hover:text-white transition-colors duration-300'>
                Contactez-nous
            </button>
        </footer>
    );
}

export default Footer;
