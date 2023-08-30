import { API_URL } from "./config";

export async function signUp(signUpData) {
    const response = await fetch(`${API_URL}/auth/signup`,
        {
            method: "POST",
            credentials: "includete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpData)
        }
    );
    const data = await response.json();
    return data
};

export async function logIn(logInData) {
    const response = await fetch(`${API_URL}/auth/login`,
        {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logInData)
        }
    );
    const data = await response.json();
    return data
};

export async function currentSession() {
    const response = await fetch(`${API_URL}/auth/session`,
        {
            credentials: "include"
        }
    );
    const data = await response.json();
    return data
}

export async function logOut() {
    const response = await fetch(`${API_URL}/auth/logout`,
        {
            credential: "include"
        }
    );
    const data = await response.json();
    return data
}