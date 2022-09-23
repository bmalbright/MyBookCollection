// decodes token to get user's info
import decode from 'jwt-decode';

//  class to create a new user
class AuthService {
    // gets new user data
    getProfile() {
        return decode(this.getToken());
    }

    // checks to see if the user is logged in
    loggenIn() {
        //checks for a valid token
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    // is the token expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp <Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // gets user token from local storage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // saves user token to local storage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        // clears token and user data from localstorage
        localStorage.removeItem('id_token');
        //reloads page to original state
        window.location.assign('/'); 
    }
}

export default new AuthService();