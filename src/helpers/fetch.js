export const fetchAPI = ({endpoint, data, method, signal }) => {

    const url = `https://encuestas-app-6ec15.web.app/api/${endpoint}`;

    if (method === 'GET') {
        return fetch(url)
    } else {

        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',

            },
            signal,
            body: JSON.stringify(data)
        })

    }



}