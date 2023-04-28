const API_ENDPOINT = 'https://cat-search.edu-api.programmers.co.kr';
export const request = async (url) => {
    try {
        const startTime = new Date();
        const res = await fetch(`${API_ENDPOINT}${url}`);
        console.log(`${url} fetch 시간: ${(new Date() - startTime)/10**3}`)
        if (!res.ok) {
            throw new Error('API Error');
        }
        return await res.json();
    } catch (e) {
        console.log(e.message);
    }
}