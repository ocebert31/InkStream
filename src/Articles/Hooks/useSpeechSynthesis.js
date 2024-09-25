import { useState, useRef, useCallback, useEffect } from 'react';

function useSpeechSynthesis() {
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

    return { isSpeaking, isGlobalSpeaking, readAloud, stopSpeaking };
}

export default useSpeechSynthesis;
