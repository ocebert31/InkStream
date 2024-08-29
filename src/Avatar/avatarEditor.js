import React, { useState, useEffect } from 'react';
import Avatar from 'avataaars';
import {updateAvatarOptions} from '../API/authentification';
import { useAuth } from '../AuthContext';

const AvatarEditor = ({ avatarOptions, onAvatarChange }) => {
    const [localAvatarOptions, setLocalAvatarOptions] = useState(avatarOptions);
    const {token} = useAuth();

    useEffect(() => {
      setLocalAvatarOptions(avatarOptions);
    }, [avatarOptions]);
 
    const handleChange = (key, value) => {
      setLocalAvatarOptions(prevOptions => ({
        ...prevOptions,
        [key]: value
      }));
    };
  
    const handleSubmit = async () => {
      const response = await updateAvatarOptions(token, localAvatarOptions);
      if (response.user) {
        onAvatarChange(response.user);
      }
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md w-96">
            <div className="flex items-center justify-center mb-4">
                <Avatar {...localAvatarOptions} />
            </div>
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700"> Arrière Plan :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.avatarStyle} onChange={(e) => handleChange('avatarStyle', e.target.value)}>
                        <option value="Circle">Cercle</option>
                        <option value="Transparent">Transparent</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Coiffure :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.topType} onChange={(e) => handleChange('topType', e.target.value)}>
                        <option value="ShortHairShortFlat">Courte Plate</option>
                        <option value="LongHairStraight">Longue Lisse</option>
                        <option value="LongHairCurly">Longue Bouclée</option>
                        <option value="ShortHairDreads01">Courtes Dreadlocks</option>
                        <option value="ShortHairDreads02">Courtes Dreadlocks 02</option>
                        <option value="LongHairBun">Chignon Long</option>
                        <option value="Hat">Chapeau</option>
                        <option value="Hijab">Hijab</option>
                        <option value="Turban">Turban</option>
                        <option value="ShortHairThemed">Courte Thème</option>
                        <option value="LongHairMiaWallace">Longue Mia Wallace</option>
                        <option value="ShortHairFrizzle">Frisée Courte</option>
                        <option value="LongHairStraight2">Longue Lisse 2</option>
                        <option value="ShortHairShortRound">Courte Ronde</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Accessoires :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.accessoriesType} onChange={(e) => handleChange('accessoriesType', e.target.value)}>
                        <option value="Prescription02">Lunettes de Prescription 02</option>
                        <option value="Sunglasses">Lunettes de Soleil</option>
                        <option value="Blank">Aucun</option>
                        <option value="Prescription01">Lunettes de Prescription 01</option>
                        <option value="Round">Lunettes Rondes</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Couleur des Cheveux :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.hairColor} onChange={(e) => handleChange('hairColor', e.target.value)}>
                        <option value="BrownDark">Brun Foncé</option>
                        <option value="Blonde">Blond</option>
                        <option value="Black">Noir</option>
                        <option value="Red">Rouge</option>
                        <option value="Blue">Bleu</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Type de Barbe :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.facialHairType} onChange={(e) => handleChange('facialHairType', e.target.value)}>
                        <option value="BeardLight">Barbe Légère</option>
                        <option value="MoustacheFancy">Moustache</option>
                        <option value="BeardMedium">Barbe Moyenne</option>
                        <option value="Blank">Aucune</option>
                        <option value="BeardLight">Barbe Light</option>
                        <option value="BeardMajestic">Barbe Majestic</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Type de Vêtement :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.clotheType} onChange={(e) => handleChange('clotheType', e.target.value)}>
                        <option value="Hoodie">Hoodie</option>
                        <option value="BlazerShirt">Blazer</option>
                        <option value="ShirtCrewNeck">T-Shirt Col Rond</option>
                        <option value="ShirtVNeck">T-Shirt Col V</option>
                        <option value="Overall">Salopette</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Couleur des Vêtements :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.clotheColor} onChange={(e) => handleChange('clotheColor', e.target.value)}>
                        <option value="PastelBlue">Bleu Pastel</option>
                        <option value="Gray01">Gris</option>
                        <option value="Heather">Gris Foncé</option>
                        <option value="Red">Rouge</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Yeux :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.eyeType} onChange={(e) => handleChange('eyeType', e.target.value)}>
                        <option value="Happy">Heureux</option>
                        <option value="Surprised">Surpris</option>
                        <option value="Wink">Clin d'œil</option>
                        <option value="Default">Par Défaut</option>
                        <option value="Squint">Plisser</option>
                        <option value="EyeRoll">Roulade des Yeux</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Sourcils :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.eyebrowType} onChange={(e) => handleChange('eyebrowType', e.target.value)}>
                        <option value="Default">Normal</option>
                        <option value="RaisedExcited">Excité</option>
                        <option value="SadConcerned">Préoccupé</option>
                        <option value="Angry">En Colère</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Bouche :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.mouthType} onChange={(e) => handleChange('mouthType', e.target.value)}>
                        <option value="Smile">Sourire</option>
                        <option value="Serious">Sérieux</option>
                        <option value="Disbelief">Incrédule</option>
                        <option value="Twinkle">Éclat</option>
                        <option value="Grimace">Grimace</option>
                        <option value="Sad">Triste</option>
                    </select>
                </label>
                <label className="block text-sm font-medium text-gray-700"> Couleur de Peau :
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={localAvatarOptions.skinColor} onChange={(e) => handleChange('skinColor', e.target.value)}>
                        <option value="Light">Clair</option>
                        <option value="MediumLight">Moyen Clair</option>
                        <option value="DarkBrown">Foncé</option>
                        <option value="Black">Noir</option>
                        <option value="Pale">Pâle</option>
                </select>
                </label>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300" onClick={handleSubmit}>Valider</button>
            </div>
        </div>
    );
};

export default AvatarEditor;
