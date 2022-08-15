import AuthService from "../../services/auth.service";
const authService = new AuthService();
export default {
  async login(context: any, payload: any) {
    return new Promise((resolve, reject) => {
      context
        .dispatch("auth", {
          ...payload,
          mode: "login",
        })
        .then((res: any) => {
          context.commit("setUser", {
            token: res.token,
            user: res.user,
          });
          resolve(res);
        })
        .catch((error: any) => {
          reject(error.response.data.errors);
        });
    });
  },
  async signup(context: any, payload: any) {
    return new Promise((resolve, reject) => {
      context
        .dispatch("auth", {
          ...payload,
          mode: "signup",
        })
        .then((res: any) => {
          context.commit("setUser", {
            token: res.token,
            user: res.user,
          });
          resolve(res);
        })
        .catch((error: any) => {
          reject(error.response.data.data);
        });
    });
  },
  async logout(context: any, payload: any) {
    return new Promise((resolve, reject) => {
      context
        .dispatch("auth", {
          ...payload,
          mode: "logout",
        })
        .then((res: any) => {
          context.commit("removeUser");
          resolve(res);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  },
  async auth(context: any, payload: any) {
    const mode = payload.mode;
    let response;
    if (mode === "signup") {
      response = authService.register({
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
        name: payload.name,
      });
    } else if (mode === "login") {
      response = authService.login({
        login: payload.login,
        password: payload.password,
      });
    } else {
      response = authService.logout();
    }
    return response;
  },
};
