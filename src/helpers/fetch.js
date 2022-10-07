export const fetchAPI = ({endpoint, data, method }) => {

    const url = `http://localhost:3000/api/${endpoint}`;

    if (method === 'GET') {
        return fetch(url)
    } else {

        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',

            },
            body: JSON.stringify(data)
        })

    }



}