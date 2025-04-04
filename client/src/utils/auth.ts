import { JwtPayload, jwtDecode } from "jwt-decode";
import type { UserData } from "../interfaces/UserData";

class AuthService {
  getProfile() {
    // DONE: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // DONE: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // DONE: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    // DONE: return the token
    const loggedUser = localStorage.getItem("id_token") || "";
    return loggedUser;
  }

  login(idToken: string) {
    // DONE: set the token to localStorage
    // DONE: redirect to the home page
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // DONE: remove the token from localStorage
    // DONE: redirect to the login page
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
