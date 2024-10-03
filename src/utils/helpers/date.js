import { format } from 'date-fns';

export const formatLongDate = (article) => {
    return format(new Date(article.createdAt), 'd MMMM yyyy')
} 

export const formatNumericDate = (date) => {
    return date.toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit', year: 'numeric',});
}