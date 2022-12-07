export const fetchAPI = ({endpoint, data, method, signal, params }) => {

    
    const heroku = `https://encuestas-back-end.herokuapp.com`;
    
    const local = 'http://localhost:3009';
    
    const url = `${heroku}/api/${endpoint}`;

    if (method === 'GET') {

        if(params){
            let URI = `${url}?${new URLSearchParams(params)} `;

            return fetch(URI)
        }

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