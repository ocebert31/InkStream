import { faVolumeUp, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useCallback, useEffect } from 'react';

function Audio({ article }) {
    const [isPaused] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isGlobalSpeaking, setGlobalSpeaking] = useState(false);
    const utteranceRef = useRef(null);

    const readAloud = useCallback((htmlContent) => {
        if (!isSpeechSynthesisSupported()) return;
        cancelGlobalSpeaking();
        const cleanText = extractTextFromHtml(htmlContent);
        utteranceRef.current = configureUtterance(cleanText);
        window.speechSynthesis.speak(utteranceRef.current);
    }, [isPaused]);

    const isSpeechSynthesisSupported = () => {
        const supported = 'speechSynthesis' in window;
        if (!supported) {
            console.warn("La synthèse vocale n'est pas supportée par ce navigateur.");
        }
        return supported;
    };

    const cancelGlobalSpeaking = () => {
        if (isGlobalSpeaking) {
            window.speechSynthesis.cancel();
            setGlobalSpeaking(false);
        }
    };

    const extractTextFromHtml = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        tempDiv.querySelectorAll('a').forEach(link => link.outerHTML = link.innerHTML);
        tempDiv.querySelectorAll('img, script, style').forEach(el => el.remove());
        return (tempDiv.textContent || tempDiv.innerText || '').replace(/\./g, '.<break time="500ms"/>');
    };

    const configureUtterance = (cleanText) => {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'fr-FR';

        utterance.onstart = () => {
            setIsSpeaking(true);
            setGlobalSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setGlobalSpeaking(false);
        };
        return utterance;
    };

    const stopSpeaking = useCallback(() => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setGlobalSpeaking(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('beforeunload', stopSpeaking);
        return () => window.removeEventListener('beforeunload', stopSpeaking);
    }, [stopSpeaking]);

    return(
        <div className='flex items-center'>
            <button onClick={() => readAloud(`${article.title} ${article.pseudo} ${article.content}`)} className="flex items-center justify-center w-32 px-4 py-2 text-xs md:text-sm font-medium text-white bg-secondary rounded-lg focus:ring-4 focus:ring-primary-300" disabled={isGlobalSpeaking && !isSpeaking}>
                <FontAwesomeIcon icon={faVolumeUp} className="w-4 h-4" />
                <span className="ml-2">Lire</span>
            </button>
            {isSpeaking && (
                <button onClick={stopSpeaking} className="flex items-center justify-center w-32 px-4 py-2 ml-3 text-xs md:text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300">
                    <FontAwesomeIcon icon={faStop} className="w-4 h-4" />
                    <span className="ml-2">Arrêter</span>
                </button>
            )}
        </div>
    )
}

export default Audio;