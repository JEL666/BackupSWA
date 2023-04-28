const API_END_POINT = 'https://cat-photos.edu-api.programmers.co.kr';
export default class Requestor {
    constructor() {}

    async request ( url ) {
        let retry = true;
        while(retry) {
            try {
                const startTime = new Date();
                const res = await fetch(`${API_END_POINT}${url}`);

                if (res.ok) {
                    const endTime = new Date();
                    console.log('fetch 시간: ', (endTime-startTime)/10**3)
                    retry = false;
                    return await res.json();
                }
                throw new Error("API 호출 실패");
            } catch (e) {
                console.log(e.message);
            }
        }
    }
}