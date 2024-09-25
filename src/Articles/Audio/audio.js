import  useSpeechSynthesis  from '.././Hooks/useSpeechSynthesis';
import { faVolumeUp, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Audio({ article }) {
    const { isSpeaking, isGlobalSpeaking, readAloud, stopSpeaking } = useSpeechSynthesis();

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