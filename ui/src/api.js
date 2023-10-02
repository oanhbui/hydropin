import { API_URL } from "./config";
import * as config from "./config"

export async function signUp(signUpData) {
    const response = await fetch(`${API_URL}/auth/signup`,
        {
            method: "POST",
            credentials: "include",
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

export async function stations(centerPoint) {
    let param_string = '';
    if (centerPoint) {
        const [long, lat] = centerPoint;
        param_string = `?lat=${lat}&long=${long}`
    }
    const response = await fetch(`${API_URL}/api/stations${param_string}`,
        {
            credential: "include"
        }
    );
    const data = await response.json();
    return data
}

export async function reviews(stationId) {
    const response = await fetch(`${API_URL}/api/stations/${stationId}/reviews`,
        {
            credential: "include"
        }
    );
    const data = await response.json();
    return data
};

export async function reviewSubmit(stationId, reviewData) {
    const response = await fetch(`${API_URL}/api/stations/${stationId}/reviews`,
        {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewData)
        }
    );
    const data = await response.json();
    return data
};

export async function geoCodingApi(keyword) {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=${config.MAPBOX_TOKEN}&country=US`);
    const data = await response.json();
    return data.features
};

export async function priceHistory(stationId) {
    const response = await fetch(`${API_URL}/api/stations/${stationId}/prices`,
        {
            credential: "include"
        }
    );
    const data = await response.json();
    return data
}

export async function queueHistory(stationId) {
    const response = await fetch(`${API_URL}/api/stations/${stationId}/queue`,
        {
            credential: "include"
        }
    );
    const data = await response.json();
    return data
}

export async function newsApi() {
    const search_keyword = encodeURIComponent('hydrogen fuel cell vehicles');
    const response = await fetch(`${API_URL}/api/news?q=${search_keyword}&excludeDomains=sciencedaily.com`);
    const data = await response.json();
    return data
}