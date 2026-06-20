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
        const errMessage = await response.json();
        throw new Error(errMessage.error);
    }
}

async function logOut() {
    const response = await fetch(`${serverURL}/api/sessions/current`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error("Error during logout.")
    }
}

async function getCurrentUser() {
    const response = await fetch(`${serverURL}/api/sessions/current`, {
        method: 'GET',
        credentials: 'include'
    });

    if (response.ok) {
        const currentUser = await response.json();
        if (currentUser) {
            return currentUser;
        } else {
            throw new Error("No active session.");
        }
    } else {
        const errMessage = await response.json();
        throw new Error(errMessage);
    }
}

const API = { logIn, logOut, getCurrentUser };
export default API;