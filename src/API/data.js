async function createArticles(data) {
    return new Promise(() => console.log(`create article done with data : ${parseFormData(data)}`));
}

function parseFormData(formData) {
    const obj = {};
    formData.forEach((value, key) => { obj[key] = value });
    return JSON.stringify(obj);
}

export {createArticles}