import { isEmptyOrNull } from './common';

export const invalidExtention = (image) => {
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    return !validExtensions.some(ext => image.name.endsWith(ext));
}

export const validateForm = (dataForm, context = 'create') => {
    let isValid = true;
    let errors =  { title: null, content: null, image: null };;
    if (isEmptyOrNull(dataForm.title)) {
        isValid = false;
        errors.title = 'Titre requis';
    }
    if (isEmptyOrNull(dataForm.content)) {
        isValid = false;
        errors.content = 'Contenu requis';
    }
    if (context === 'create' && !dataForm.image) {
        isValid = false;
        errors.image = 'Image requise';
    }
    if (dataForm.image && invalidExtention(dataForm.image)) {
        isValid = false;
        errors.image = "L'image doit être au format JPEG ou PNG";
    }
    return {isValid, errors};
}


