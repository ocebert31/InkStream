export const formDataBuilder = (data) => {
    const dataForm = new FormData();
    Object.entries(data).forEach(([key, value]) => dataForm.append(key, value));
    return dataForm
}