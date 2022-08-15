import { AppConfig } from "@/config/AppConfig";
import api from "../config/api";
import TokenService from "./token.service";
export default class AuthService {
  register(data: any): any {
    return api.post(AppConfig.endPoints.signup, data).then((response) => {
      if (response.data.data.token) {
        TokenService.setUser(response.data.data);
      }
      return response.data.data;
    });
  }
  login(data: any): any {
    return api.post(AppConfig.endPoints.login, data).then((response) => {
      if (response.data.data.token) {
        TokenService.setUser(response.data.data);
      }
      return response.data.data;
    });
  }
  logout() {
    return api.post(AppConfig.endPoints.logout).then((response: any) => {
      if (response.data.message === "Logged out") {
        TokenService.removeUser();
      }
      return response.status;
    });
  }
  checkIsLoggedIn() {
    if (TokenService.getLocalAccessToken()) {
      return true;
    }
    return false;
  }
  checkIsAdmin() {
    if (TokenService.getRole().includes("admin")) {
      return true;
    }
    return false;
  }
}
