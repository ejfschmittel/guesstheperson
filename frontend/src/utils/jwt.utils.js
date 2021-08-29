

const JWT_TOKEN_KEY = "JWT_TOKEN";


export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const getUserData = (token) => {
    const parsedToken = parseJwt(token)
    return parsedToken.user;
}

export const setAuthToken = (token) => {
    localStorage.setItem(JWT_TOKEN_KEY, token)
}

export const getAuthToken = () => {
    return localStorage.getItem(JWT_TOKEN_KEY)
}

export const removeAuthToken = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
}