import { Login } from "../models/login";

class AuthService {
  loginData?: Login;

  setToken(token: string) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("token", token);
  }

  get token() {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem("token");
    } catch (error) {
      return null;
    }
  }
}

export default new AuthService();
