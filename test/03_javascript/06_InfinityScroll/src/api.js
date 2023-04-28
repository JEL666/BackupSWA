const API_END_POINT = 'https://mwu.roto-frontend.programmers.co.kr';

export const request = async (url) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`)

        if (!res.ok) {
            throw new Error("API 호출에 오류가 발생했습니다.");
        } 
        //console.log(res);
        return await res.json();

    } catch (e) {
        console.log(e.message);
    }
}