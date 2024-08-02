import { useState, useRef, useCallback, useEffect } from 'react';

export const useSpeechSynthesis = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isGlobalSpeaking, setGlobalSpeaking] = useState(false);
    const utteranceRef = useRef(null);

    const extractTextFromHtml = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        tempDiv.querySelectorAll('a').forEach(link => {
            link.outerHTML = link.innerHTML;
        });
        tempDiv.querySelectorAll('img, script, style').forEach(el => el.remove());
        let textContent = tempDiv.textContent || tempDiv.innerText || '';
        textContent = textContent.replace(/\./g, '.<break time="500ms"/>'); 
        return textContent;
    };

    const readAloud = useCallback((htmlContent) => {
        if ('speechSynthesis' in window) {
            if (isGlobalSpeaking) {
                window.speechSynthesis.cancel();
                setGlobalSpeaking(false);
            }
            if (utteranceRef.current && isPaused) {
                window.speechSynthesis.resume();
                setIsPaused(false);
                return;
            }
            const cleanText = extractTextFromHtml(htmlContent);
            utteranceRef.current = new SpeechSynthesisUtterance(cleanText);
            utteranceRef.current.lang = 'fr-FR';
            utteranceRef.current.onstart = () => {
                setIsSpeaking(true);
                setGlobalSpeaking(true);
            };
            utteranceRef.current.onend = () => {
                setIsSpeaking(false);
                setGlobalSpeaking(false);
            };
            window.speechSynthesis.speak(utteranceRef.current);
        } else {
            alert("La synthèse vocale n'est pas supportée par ce navigateur.");
        }
    }, [isPaused, isGlobalSpeaking, setGlobalSpeaking]);

    const stopSpeaking = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setGlobalSpeaking(false);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            stopSpeaking();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    return { isSpeaking, isGlobalSpeaking, readAloud, stopSpeaking };
};
