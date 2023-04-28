const API_ENDPOINT = 'https://todo-api.roto.codes/roto';

export const request = async (url, options) => {
    try {
        const res = await fetch(`${API_ENDPOINT}${url}`, options);
        if (!res.ok) {
            throw new Error('API 호출 오류');
        }
        return await res.json();
    } catch (e) {
        console.log(e.message);
    }
}