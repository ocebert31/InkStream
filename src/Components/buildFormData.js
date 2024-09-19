export const buildArticleFormData = (dataForm) => {
    const data = new FormData();
    data.append('title', dataForm.title);
    data.append('content', dataForm.content);
    data.append('tags', dataForm.tags);
    data.append('image', dataForm.image);
    return data;
}