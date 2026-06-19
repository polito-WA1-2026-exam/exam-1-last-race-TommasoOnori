const serverURL = 'http://localhost:3001';

async function logIn(credentials) {
    const response = await fetch(`${serverURL}/api/sessions`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
    })

    if (response.ok) {
        const user = await response.json();
        return user;
    } else {
        const errMessage = await response.text();
        throw new Error(errMessage);
    }
}

async function logOut() {
    const response = await fetch(`${serverURL}/api/sessions/current`, {
        method: 'DELETE',
        credentials: 'include'
    })
}

const API = { logIn, logOut }
export default API;